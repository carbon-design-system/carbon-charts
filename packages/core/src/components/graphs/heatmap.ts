import { min, select } from 'd3'
import { get } from 'lodash-es'
import { getProperty, getTransformOffsets } from '@/tools'
import { heatmap as heatmapConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { Events, RenderTypes, DividerStatus } from '@/interfaces/enums'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { HeatmapModel } from '@/model/heatmap'

export class Heatmap extends Component {
	type = 'heatmap'
	renderType = RenderTypes.SVG

	private matrix: any = {}
	private xBandwidth = 0
	private yBandwidth = 0
	private translationUnits = {
		x: 0,
		y: 0
	}

	init() {
		const eventsFragment = this.services.events

		// Highlight correct cells on Axis item hovers
		eventsFragment.addEventListener(Events.Axis.LABEL_MOUSEOVER, this.handleAxisOnHover)

		// Highlight correct cells on Axis item mouseouts
		eventsFragment.addEventListener(Events.Axis.LABEL_MOUSEOUT, this.handleAxisMouseOut)

		// Highlight correct cells on Axis item focus
		eventsFragment.addEventListener(Events.Axis.LABEL_FOCUS, this.handleAxisOnHover)

		// Highlight correct cells on Axis item  blur
		eventsFragment.addEventListener(Events.Axis.LABEL_BLUR, this.handleAxisMouseOut)
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		const svg = this.getComponentContainer({ withinChartClip: true })
		// Lower the chart so the axes are always visible
		svg.lower()

		const { cartesianScales } = this.services
		this.matrix = (this.model as HeatmapModel).getMatrix()

		svg.html('')

		if (getProperty(this.getOptions(), 'data', 'loading')) {
			return
		}

		// determine x and y axis scale
		const mainXScale = cartesianScales.getMainXScale()
		const mainYScale = cartesianScales.getMainYScale()
		const domainIdentifier = cartesianScales.getDomainIdentifier()
		const rangeIdentifier = cartesianScales.getRangeIdentifier()

		// Get unique axis values & create a matrix
		const uniqueDomain = (this.model as HeatmapModel).getUniqueDomain()
		const uniqueRange = (this.model as HeatmapModel).getUniqueRanges()

		// Get matrix in the form of an array to create a single heatmap group
		const matrixArray = (this.model as HeatmapModel).getMatrixAsArray()

		// Get available chart area
		const xRange = mainXScale.range()
		const yRange = mainYScale.range()

		// Determine rectangle dimensions based on the number of unique domain and range
		this.xBandwidth = Math.abs((xRange[1] - xRange[0]) / uniqueDomain.length)
		this.yBandwidth = Math.abs((yRange[1] - yRange[0]) / uniqueRange.length)

		const patternID = this.services.domUtils.generateElementIDString(`heatmap-pattern-stripes`)

		// Create a striped pattern for missing data
		svg
			.append('defs')
			.append('pattern')
			.attr('id', patternID)
			.attr('width', 3)
			.attr('height', 3)
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('patternTransform', 'rotate(45)')
			.append('rect')
			.classed('pattern-fill', true)
			.attr('width', 0.5)
			.attr('height', 8)

		const rectangles = svg
			.selectAll()
			.data(matrixArray)
			.enter()
			.append('g')
			.attr('class', (d: any) => `heat-${d.index}`)
			.classed('cell', true)
			.attr(
				'transform',
				(d: any) =>
					`translate(${mainXScale(d[domainIdentifier])}, ${mainYScale(d[rangeIdentifier])})`
			)
			.append('rect')
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					value: d.value,
					originalClassName: `heat-${d.index}`
				})
			)
			.classed('heat', true)
			.classed('null-state', (d: any) => (d.index === -1 || d.value === null ? true : false))
			.attr('width', this.xBandwidth)
			.attr('height', this.yBandwidth)
			.style('fill', (d: any) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d)
				// Check if a valid value exists
				if (d.index === -1 || d.value === null) {
					return `url(#${patternID})`
				}
				return this.model.getFillColor(Number(d.value), d[domainIdentifier], d)
			})
			.attr('aria-label', (d: any) => d.value)

		// Cell highlight box
		this.createOuterBox('g.cell-highlight', this.xBandwidth, this.yBandwidth)
		// Column highlight box
		this.createOuterBox(
			'g.multi-cell.column-highlight',
			this.xBandwidth,
			Math.abs(yRange[1] - yRange[0])
		)
		// Row highlight box
		this.createOuterBox(
			'g.multi-cell.row-highlight',
			Math.abs(xRange[1] - xRange[0]),
			this.yBandwidth
		)

		if (this.determineDividerStatus()) {
			rectangles.style('stroke-width', '1px')
			this.parent.select('g.cell-highlight').classed('cell-2', true)
		}

		this.addEventListener()
	}

	/**
	 * Generates a box using lines to create a hover effect
	 * The lines have drop shadow in their respective direction
	 * @param parentTag - tag name
	 * @param xBandwidth - X length
	 * @param yBandwidth - y length
	 */
	private createOuterBox(parentTag: string, xBandwidth: number, yBandwidth: number) {
		// Create a highlighter in the parent component so the shadow and the lines do not get clipped
		const highlight = DOMUtils.appendOrSelect(this.parent, parentTag)
			.classed('shadows', true)
			.classed('highlighter-hidden', true)

		DOMUtils.appendOrSelect(highlight, 'line.top')
			.attr('x1', -1)
			.attr('x2', xBandwidth + 1)

		DOMUtils.appendOrSelect(highlight, 'line.left')
			.attr('x1', 0)
			.attr('y1', -1)
			.attr('x2', 0)
			.attr('y2', yBandwidth + 1)

		DOMUtils.appendOrSelect(highlight, 'line.down')
			.attr('x1', -1)
			.attr('x2', xBandwidth + 1)
			.attr('y1', yBandwidth)
			.attr('y2', yBandwidth)

		DOMUtils.appendOrSelect(highlight, 'line.right')
			.attr('x1', xBandwidth)
			.attr('x2', xBandwidth)
			.attr('y1', -1)
			.attr('y2', yBandwidth + 1)
	}

	private determineDividerStatus(): boolean {
		// Add dividers if status is not off, will assume auto or on by default.
		const dividerStatus = getProperty(this.getOptions(), 'heatmap', 'divider', 'state')

		// Determine if cell divider should be displayed
		if (dividerStatus !== DividerStatus.OFF) {
			if (
				(dividerStatus === DividerStatus.AUTO &&
					heatmapConfigs.minCellDividerDimension <= this.xBandwidth &&
					heatmapConfigs.minCellDividerDimension <= this.yBandwidth) ||
				dividerStatus === DividerStatus.ON
			) {
				return true
			}
		}

		return false
	}

	addEventListener() {
		const self = this
		const { cartesianScales } = this.services
		const options = this.getOptions()
		const totalLabel =
			get(options, 'locale.translations.total') || get(options, 'tooltip.totalLabel') || 'Total'

		const domainIdentifier = cartesianScales.getDomainIdentifier()
		const rangeIdentifier = cartesianScales.getRangeIdentifier()

		const domainLabel = cartesianScales.getDomainLabel()
		const rangeLabel = cartesianScales.getRangeLabel()

		this.parent
			.selectAll('g.cell')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const cell = select(this)
				const hoveredElement = cell.select('rect.heat')
				const nullState = hoveredElement.classed('null-state')

				// Dispatch event and tooltip only if value exists
				if (!nullState) {
					// Get transformation value of node
					const transform = getTransformOffsets(cell.attr('transform'))

					self.parent
						.select('g.cell-highlight')
						.attr(
							'transform',
							`translate(${transform.x + self.translationUnits.x}, ${
								transform.y + self.translationUnits.y
							})`
						)
						.classed('highlighter-hidden', false)

					// Dispatch mouse over event
					self.services.events.dispatchEvent(Events.Heatmap.HEATMAP_MOUSEOVER, {
						event,
						element: hoveredElement,
						datum: datum
					})

					// Dispatch tooltip show event
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						items: [
							{
								label: domainLabel,
								value: datum[domainIdentifier]
							},
							{
								label: rangeLabel,
								value: datum[rangeIdentifier]
							},
							{
								label: totalLabel,
								value: datum['value'],
								color: hoveredElement.style('fill')
							}
						]
					})
				}
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(Events.Heatmap.HEATMAP_MOUSEMOVE, {
					event,
					element: select(this),
					datum: datum
				})
				// Dispatch tooltip move event
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse click event
				self.services.events.dispatchEvent(Events.Heatmap.HEATMAP_CLICK, {
					event,
					element: select(this),
					datum: datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const cell = select(this)
				const hoveredElement = cell.select('rect.heat')
				const nullState = hoveredElement.classed('null-state')

				self.parent.select('g.cell-highlight').classed('highlighter-hidden', true)

				// Dispatch event and tooltip only if value exists
				if (!nullState) {
					// Dispatch mouse out event
					self.services.events.dispatchEvent(Events.Heatmap.HEATMAP_MOUSEOUT, {
						event,
						element: hoveredElement,
						datum: datum
					})

					// Dispatch hide tooltip event
					self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
						event,
						hoveredElement
					})
				}
			})
	}

	// Highlight elements that match the hovered axis item
	handleAxisOnHover = (event: CustomEvent) => {
		const { detail } = event
		const { datum } = detail
		// Unique ranges and domains
		const ranges = (this.model as HeatmapModel).getUniqueRanges()
		const domains = (this.model as HeatmapModel).getUniqueDomain()
		// Labels
		const domainLabel = this.services.cartesianScales.getDomainLabel()
		const rangeLabel = this.services.cartesianScales.getRangeLabel()
		// Scales
		const mainXScale = this.services.cartesianScales.getMainXScale()
		const mainYScale = this.services.cartesianScales.getMainYScale()

		let label = '',
			sum: any = null,
			minimum: any = null,
			maximum: any = null

		// Check to see where datum belongs
		if (this.matrix[datum] !== undefined) {
			label = domainLabel
			// Iterate through Object and get sum, min, and max
			ranges.forEach((element: any) => {
				if (typeof this.matrix[datum][element].value === 'number') {
					const value = this.matrix[datum][element].value
					if (sum === null) {
						sum = value
						minimum = value
						maximum = value
						return
					}
					sum += value
					minimum = value < minimum ? value : minimum
					maximum = value > maximum ? value : maximum
				}
			})
		} else {
			label = rangeLabel
			domains.forEach((element: any) => {
				if (typeof this.matrix[element][datum].value === 'number') {
					const value = this.matrix[element][datum].value
					if (sum === null) {
						sum = value
						minimum = value
						maximum = value
						return
					}
					sum += value
					minimum = value < minimum ? value : minimum
					maximum = value > maximum ? value : maximum
				}
			})
		}

		if (mainXScale(datum) !== undefined) {
			this.parent
				.select('g.multi-cell.column-highlight')
				.classed('highlighter-hidden', false)
				.attr('transform', `translate(${mainXScale(datum)}, ${min(mainYScale.range())})`)
		} else if (mainYScale(datum) !== undefined) {
			this.parent
				.select('g.multi-cell.row-highlight')
				.classed('highlighter-hidden', false)
				.attr('transform', `translate(${min(mainXScale.range())},${mainYScale(datum)})`)
		}

		// Dispatch tooltip show event
		this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
			event: detail.event,
			hoveredElement: select(event.detail.element),
			items: [
				{
					label: label,
					value: datum,
					bold: true
				},
				{
					label: 'Min',
					value: minimum !== null ? minimum : '-'
				},
				{
					label: 'Max',
					value: maximum !== null ? maximum : '-'
				},
				{
					label: 'Average',
					value: sum !== null ? sum / domains.length : '-'
				}
			]
		})
	}

	// Un-highlight all elements
	handleAxisMouseOut = (event: CustomEvent) => {
		// Hide column/row
		this.parent.selectAll('g.multi-cell').classed('highlighter-hidden', true)

		// Dispatch hide tooltip event
		this.services.events.dispatchEvent(Events.Tooltip.HIDE, {
			event
		})
	}

	// Remove event listeners
	destroy() {
		this.parent
			.selectAll('rect.heat')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('click', null)
			.on('mouseout', null)

		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleAxisOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleAxisMouseOut)
	}
}
