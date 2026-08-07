import { bisectCenter, pointer, selectAll, type Selection } from 'd3'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { CartesianOrientations, Events, RenderTypes } from '@/interfaces/enums'
import type { ChartTabularData } from '@/interfaces/model'

export type GenericSvgSelection = Selection<SVGGraphicsElement, any, Element, any>

const THRESHOLD = 5

/** check if x is inside threshold area extents  */
function pointIsWithinThreshold(dx: number, x: number) {
	return dx > x - THRESHOLD && dx < x + THRESHOLD
}

export class Ruler extends Component {
	type = 'ruler'
	renderType = RenderTypes.SVG

	backdrop: GenericSvgSelection
	elementsToHighlight?: GenericSvgSelection
	private domainValues?: number[]
	private pointsByDomain?: Map<number, ChartTabularData>
	private elementsByDomain?: Map<number, SVGGraphicsElement[]>
	private activeDomainValue?: number
	private frame?: number
	private rulerEvent: CustomEvent
	private rulerPosition: [number, number]
	isXGridEnabled = getProperty(this.getOptions(), 'grid', 'x', 'enabled')
	isYGridEnabled = getProperty(this.getOptions(), 'grid', 'y', 'enabled')
	// flag for checking whether ruler event listener is added or not
	isEventListenerAdded = false

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const isRulerEnabled = getProperty(this.getOptions(), 'ruler', 'enabled')
		const alwaysShowRulerTooltip = getProperty(
			this.getOptions(),
			'tooltip',
			'alwaysShowRulerTooltip'
		)
		const shouldEnableRuler = isRulerEnabled || alwaysShowRulerTooltip
		this.domainValues = undefined
		this.pointsByDomain = undefined
		this.elementsByDomain = undefined
		this.activeDomainValue = undefined

		this.drawBackdrop()

		if (shouldEnableRuler && !this.isEventListenerAdded) {
			this.addBackdropEventListeners()
		} else if (!shouldEnableRuler && this.isEventListenerAdded) {
			this.removeBackdropEventListeners()
		}
	}

	removeBackdropEventListeners() {
		this.isEventListenerAdded = false
		this.backdrop.on('mousemove mouseover mouseout', null)
		if (this.frame !== undefined) {
			cancelAnimationFrame(this.frame)
			this.frame = undefined
		}
	}

	formatTooltipData(tooltipData: any) {
		return tooltipData
	}

	showRuler(event: CustomEvent, [x, y]: [number, number]) {
		const svg = this.parent

		const orientation: CartesianOrientations = this.services.cartesianScales.getOrientation()

		const rangeScale = this.services.cartesianScales.getRangeScale()
		const [yScaleEnd, yScaleStart] = rangeScale.range()

		const mouseCoordinate = orientation === CartesianOrientations.HORIZONTAL ? y : x
		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler').attr('aria-label', 'ruler')
		const rulerLine = DOMUtils.appendOrSelect(ruler, 'line.ruler-line')

		if (!this.pointsByDomain) {
			this.indexData()
		}

		const domainValue = this.domainValues[bisectCenter(this.domainValues, mouseCoordinate)]
		if (domainValue === undefined || !pointIsWithinThreshold(domainValue, mouseCoordinate)) {
			if (this.elementsToHighlight) this.hideRuler()
			return
		}

		if (domainValue === this.activeDomainValue) {
			return this.services.events.dispatchEvent(Events.Tooltip.MOVE, {
				mousePosition: [x, y]
			})
		}

		const dataPointsMatchingRulerLine = this.pointsByDomain.get(domainValue)
		const tooltipData = dataPointsMatchingRulerLine.filter(d => {
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(d)
			const value = d[rangeIdentifier]
			return value !== null && value !== undefined
		})

		if (!this.elementsByDomain) {
			this.indexElements()
		}
		const elementsToHighlight = selectAll(
			this.elementsByDomain.get(domainValue) ?? []
		) as GenericSvgSelection

		this.elementsToHighlight?.dispatch('mouseout')
		elementsToHighlight.dispatch('mouseover')
		this.elementsToHighlight = elementsToHighlight
		this.activeDomainValue = domainValue

		this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
			event,
			mousePosition: [x, y],
			hoveredElement: rulerLine,
			data: this.formatTooltipData(tooltipData)
		})

		ruler.attr('opacity', 1)

		if (orientation === 'horizontal') {
			rulerLine
				.attr('x1', yScaleStart)
				.attr('x2', yScaleEnd)
				.attr('y1', domainValue)
				.attr('y2', domainValue)
		} else {
			rulerLine
				.attr('y1', yScaleStart)
				.attr('y2', yScaleEnd)
				.attr('x1', domainValue)
				.attr('x2', domainValue)
		}
	}

	hideRuler() {
		const svg = this.parent
		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler')

		this.elementsToHighlight?.dispatch('mouseout')
		this.elementsToHighlight = undefined
		this.activeDomainValue = undefined
		this.services.events.dispatchEvent(Events.Tooltip.HIDE)
		ruler.attr('opacity', 0)
	}

	private indexData() {
		const pointsByDomain = new Map<number, ChartTabularData>()
		this.model.getDisplayData().forEach(originalData => {
			const domainValue = this.services.cartesianScales.getDomainValue(originalData) as number
			if (!Number.isFinite(domainValue)) return
			const points = pointsByDomain.get(domainValue)
			if (points) {
				points.push(originalData)
			} else {
				pointsByDomain.set(domainValue, [originalData])
			}
		})

		this.pointsByDomain = pointsByDomain
		this.domainValues = [...pointsByDomain.keys()].sort((a, b) => a - b)
	}

	private indexElements() {
		const elementsByDomain = new Map<number, SVGGraphicsElement[]>()
		this.parent
			.selectAll<SVGGraphicsElement, ChartTabularData[number]>('[role=graphics-symbol]')
			.each((d, i, nodes) => {
				const domainValue = this.services.cartesianScales.getDomainValue(d) as number
				const elements = elementsByDomain.get(domainValue)
				if (elements) {
					elements.push(nodes[i])
				} else {
					elementsByDomain.set(domainValue, [nodes[i]])
				}
			})
		this.elementsByDomain = elementsByDomain
	}

	/**
	 * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
	 */
	addBackdropEventListeners() {
		this.isEventListenerAdded = true
		this.backdrop
			.on('mousemove mouseover', (event: CustomEvent) => {
				this.rulerEvent = event
				this.rulerPosition = pointer(event, this.parent.node())
				if (this.frame === undefined) {
					this.frame = requestAnimationFrame(() => {
						this.frame = undefined
						this.showRuler(this.rulerEvent, this.rulerPosition)
					})
				}
			})
			.on('mouseout', () => {
				if (this.frame !== undefined) {
					cancelAnimationFrame(this.frame)
					this.frame = undefined
				}
				this.hideRuler()
			})
	}

	drawBackdrop() {
		const svg = this.parent

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, 'svg.chart-grid-backdrop')
	}
}
