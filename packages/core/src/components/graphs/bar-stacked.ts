import { select } from 'd3'
import { generateSVGPathString, getProperty } from '@/tools'
import { Bar } from './bar'
import { Events, CartesianOrientations, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import { DOMUtils } from '@/services/essentials/dom-utils'

export class StackedBar extends Bar {
	type = 'stacked-bar'
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
		const svg = this.getComponentContainer({ withinChartClip: true })

		// Chart options mixed with the internal configurations
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		// Create the data and keys that'll be used by the stack layout
		const stackData = this.model.getStackedData({
			groups: this.configs.groups,
			divergent: true
		})

		const activeDataGroupNames = this.model.getActiveDataGroupNames()

		// Update data on all bar groups
		const barGroups = svg
			.selectAll('g.bars')
			.data(stackData, (d: any) => getProperty(d, 0, groupMapsTo))

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		barGroups.exit().attr('opacity', 0).remove()

		// Add bar groups that need to be introduced
		barGroups
			.enter()
			.append('g')
			.classed('bars', true)
			.attr('role', Roles.GROUP)
			.attr('data-name', 'bars')

		// Update data on all bars
		const bars = svg
			.selectAll('g.bars')
			.selectAll('path.bar')
			.data(
				(d: any) => d,
				(d: any) => d.data.sharedStackKey
			)

		// Remove bars that need to be removed
		bars.exit().remove()

		bars
			.enter()
			.append('path')
			.merge(bars as any)
			.classed('bar', true)
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
			.style('fill', (d: any) =>
				this.model.getFillColor(d[groupMapsTo], d.data.sharedStackKey, d.data)
			)
			.attr('d', (d: any) => {
				const key = d.data.sharedStackKey as string

				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const barWidth = this.getBarWidth()
				const x0 = this.services.cartesianScales.getDomainValue(key) - barWidth / 2
				const x1 = x0 + barWidth
				const y0 = this.services.cartesianScales.getRangeValue(d[0])
				let y1 = this.services.cartesianScales.getRangeValue(d[1])

				// don't show if part of bar is out of zoom domain
				if (this.isOutsideZoomedDomain(x0, x1)) {
					return
				}

				// Add the divider gap
				if (Math.abs(y1 - y0) > 0 && Math.abs(y1 - y0) > options.bars.dividerSize) {
					const barIsNegative = d[0] < 0 && d[1] <= 0
					if (barIsNegative && activeDataGroupNames.length > 1) {
						if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
							y1 += d[1] === 0 ? 2 : 1
						} else {
							y1 -= 1
						}
					} else if (!barIsNegative) {
						if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
							y1 += 1
						} else {
							y1 -= 1
						}
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
			.attr('aria-label', (d: any) => d[1] - d[0])

		// Add event listeners for the above elements
		this.addEventListeners()
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		const { groupMapsTo } = this.model.getOptions().data

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
		const options = this.getOptions()
		const { groupMapsTo } = options.data

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

				const displayData = self.model.getDisplayData(self.configs.groups)

				let matchingDataPoint = displayData.find((d: any) => {
					const domainIdentifier = self.services.cartesianScales.getDomainIdentifier(d)
					const rangeIdentifier = self.services.cartesianScales.getRangeIdentifier(d)
					return (
						d[rangeIdentifier] === datum.data[datum[groupMapsTo]] &&
						d[domainIdentifier].toString() === datum.data.sharedStackKey &&
						d[groupMapsTo] === datum[groupMapsTo]
					)
				})

				if (matchingDataPoint === undefined) {
					// use the primary range and domain ids
					const domainIdentifier = self.services.cartesianScales.getDomainIdentifier()
					const rangeIdentifier = self.services.cartesianScales.getRangeIdentifier()
					matchingDataPoint = {
						[domainIdentifier]: datum.data.sharedStackKey,
						[rangeIdentifier]: datum.data[datum[groupMapsTo]],
						[groupMapsTo]: datum[groupMapsTo]
					}
				}

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					data: [matchingDataPoint]
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEMOVE, {
					event,
					element: hoveredElement,
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

	protected getBarWidth() {
		const options = this.getOptions()
		if (getProperty(options, 'bars', 'width')) {
			return options.bars.width as number
		}
		const mainXScale = this.services.cartesianScales.getMainXScale()
		const chartWidth = DOMUtils.getSVGElementSize((this as any).parent, {
			useAttrs: true
		}).width

		const numberOfDomainValues = this.model.getStackKeys().length

		const spacingFactor = getProperty(options, 'bars', 'spacingFactor')

		if (!(mainXScale as any).step) {
			return Math.min(options.bars.maxWidth, (chartWidth * spacingFactor) / numberOfDomainValues)
		}
		return Math.min(options.bars.maxWidth, (mainXScale as any).step() / 2)
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
