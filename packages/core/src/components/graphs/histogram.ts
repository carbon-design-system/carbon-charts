import { select } from 'd3'
import { get } from 'lodash-es'
import { generateSVGPathString, getProperty } from '@/tools'
import { Events, CartesianOrientations, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import { Component } from '@/components/component'

export class Histogram extends Component {
	type = 'histogram'
	renderType = RenderTypes.SVG

	init() {
		const eventsFragment = this.services.events

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getComponentContainer()

		// Chart options mixed with the internal configurations
		const options = this.model.getOptions()
		const { groupIdentifier } = options
		const { groupMapsTo } = options.data

		const binnedStackedData = this.model.getBinnedStackedData()

		const x = this.services.cartesianScales.getMainXScale()

		// Update data on all bar groups
		const barGroups = svg
			.selectAll('g.bars')
			.data(binnedStackedData, (d: any) => get(d, `0.${groupMapsTo}`))

		barGroups.exit().attr('opacity', 0).remove()

		// Add bar groups that need to be introduced
		barGroups.enter().append('g').classed('bars', true).attr('role', Roles.GROUP)

		// Update data on all bars
		const bars = svg
			.selectAll('g.bars')
			.selectAll('path.bar')
			.data((data: any) => data)

		// Remove bars that need to be removed
		bars.exit().remove()

		bars
			.enter()
			.append('path')
			.merge(bars as any)
			.classed('bar', true)
			.attr(groupIdentifier, (_: any, i: number) => i)
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'histogram-bar-update-enter',
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
			.style('fill', (d: any) => this.model.getFillColor(d[groupMapsTo], null, d))
			.attr('d', (d: any) => {
				const bin = get(d, 'data')

				if (!bin) {
					return
				}

				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const barWidth = x(bin.x1) - x(bin.x0) - 1
				const x0 = this.services.cartesianScales.getDomainValue(bin.x0) as number
				const x1 = x0 + barWidth

				const y0 = this.services.cartesianScales.getRangeValue(d[0]) as number
				let y1 = this.services.cartesianScales.getRangeValue(d[1]) as number

				// Add the divider gap
				if (Math.abs(y1 - y0) > 0 && Math.abs(y1 - y0) > options.bars.dividerSize) {
					if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
						y1 += 1
					} else {
						y1 -= 1
					}
				}

				return generateSVGPathString(
					{ x0, x1, y0, y1 },
					this.services.cartesianScales.getOrientation()
				)
			})
			.attr('opacity', 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'bar')
			.attr('aria-label', (d: any) => getProperty(d, 'data', d[groupMapsTo]))

		// Add event listeners for the above elements
		this.addEventListeners()
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		const options = this.getOptions()
		const { groupMapsTo } = options.data

		this.parent
			.selectAll('path.bar')
			.transition('legend-hover-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-bar'
				})
			)
			.attr('opacity', (d: any) => (d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1))
	}

	// Un-highlight all elements
	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.bar')
			.transition('legend-mouseout-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-bar'
				})
			)
			.attr('opacity', 1)
	}

	addEventListeners() {
		const options = this.model.getOptions()
		const { groupMapsTo } = options.data
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		const self = this
		this.parent
			.selectAll('path.bar')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				hoveredElement.classed('hovered', true)

				const x0 = numberFormatter(parseFloat(get(datum, 'data.x0')), localeCode)
				const x1 = numberFormatter(parseFloat(get(datum, 'data.x1')), localeCode)

				const rangeAxisPosition = self.services.cartesianScales.getRangeAxisPosition()
				const rangeScaleLabel = self.services.cartesianScales.getScaleLabel(rangeAxisPosition)

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: get(options, 'bins.rangeLabel') || 'Range',
							value: `${x0} – ${x1}`
						},
						{
							label: options.tooltip.groupLabel || 'Group',
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo]
							})
						},
						{
							label: rangeScaleLabel,
							value: get(datum, `data.${datum[groupMapsTo]}`)
						}
					]
				})
			})
			.on('mousemove', function (event: MouseEvent) {
				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('mouseout', function () {
				const hoveredElement = select(this)

				// Select all same group elements
				hoveredElement.classed('hovered', false)

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE)
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
