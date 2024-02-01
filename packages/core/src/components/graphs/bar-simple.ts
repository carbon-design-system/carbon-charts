import { select } from 'd3'
import { generateSVGPathString } from '@/tools'
import { Bar } from './bar'
import { Events, RenderTypes, ColorClassNameTypes, CartesianOrientations } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

export class SimpleBar extends Bar {
	type = 'simple-bar'
	renderType = RenderTypes.SVG

	init() {
		const eventsFragment = this.services.events

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate: boolean) {
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true })

		const data = this.model.getDisplayData(this.configs.groups)

		const orientation = this.services.cartesianScales.getOrientation()

		// Update data on all bars
		const bars = svg.selectAll('path.bar').data(data, (datum: any) => datum[groupMapsTo])

		// Remove bars that are no longer needed
		bars.exit().attr('opacity', 0).remove()

		// Add the paths that need to be introduced
		const barsEnter = bars.enter().append('path').attr('opacity', 0)

		barsEnter
			.merge(bars as any)
			.classed('bar', true)
			.attr('width', this.getBarWidth.bind(this))
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'bar-update-enter',
					animate
				})
			)
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d[groupMapsTo],
					originalClassName: 'bar'
				})
			)
			.style('fill', (d: any) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d)
				return this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
			})
			.attr('d', (d: any) => {
				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()
				const barWidth = this.getBarWidth()
				const value = d[rangeIdentifier]

				const x0 = this.services.cartesianScales.getDomainValue(d) - barWidth / 2
				const x1 = x0 + barWidth
				let y0: number, y1: number
				if (Array.isArray(value) && value.length === 2) {
					y0 = this.services.cartesianScales.getRangeValue(value[0])
					y1 = this.services.cartesianScales.getRangeValue(value[1])
				} else {
					const rangeScale = this.services.cartesianScales.getRangeScale()
					const yScaleDomainStart = rangeScale.domain()[0] as number

					y0 = this.services.cartesianScales.getRangeValue(Math.max(0, yScaleDomainStart))
					y1 = this.services.cartesianScales.getRangeValue(d)
				}

				const difference = Math.abs(y1 - y0)
				// Set a min-2px size for the bar
				if (difference !== 0 && difference < 2) {
					if (
						(value > 0 && orientation === CartesianOrientations.VERTICAL) ||
						(value < 0 && orientation === CartesianOrientations.HORIZONTAL)
					) {
						y1 = y0 - 2
					} else {
						y1 = y0 + 2
					}
				}

				// don't show if part of bar is out of zoom domain
				if (this.isOutsideZoomedDomain(x0, x1)) {
					return
				}

				return generateSVGPathString({ x0, x1, y0, y1 }, orientation)
			})
			.attr('opacity', 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'bar')
			.attr('aria-label', (d: any) => d.value)

		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail
		const { groupMapsTo } = this.getOptions().data

		this.parent
			.selectAll('path.bar')
			.transition('legend-hover-simple-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-simple-bar'
				})
			)
			.attr('opacity', (d: any) => (d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1))
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.bar')
			.transition('legend-mouseout-simple-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-simple-bar'
				})
			)
			.attr('opacity', 1)
	}

	addEventListeners() {
		const self = this
		this.parent
			.selectAll('path.bar')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', true)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					data: [datum]
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEMOVE, {
					event,
					element: select(this),
					datum
				})

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', false)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				})
			})
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('path.bar')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)

		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}
}
