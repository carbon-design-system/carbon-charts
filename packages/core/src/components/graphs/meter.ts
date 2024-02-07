import { scaleLinear, select } from 'd3'
import { getProperty } from '@/tools'
import { meter as meterConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { ColorClassNameTypes, Events, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import { MeterChartModel } from '@/model/meter'

export class Meter extends Component {
	type = 'meter'
	renderType = RenderTypes.SVG

	getStackedBounds(data: any, scale: any) {
		let prevX = 0
		const stackedData = data.map((d: any, i: number) => {
			if (i !== 0) {
				prevX += scale(d.value)
				return {
					...d,
					width: Math.abs(scale(d.value) - meterConfigs.dividerWidth),
					x: prevX - scale(d.value)
				}
			} else {
				prevX = scale(d.value)
				return {
					...d,
					width: Math.abs(scale(d.value) - meterConfigs.dividerWidth),
					x: 0
				}
			}
		})

		return stackedData
	}

	render(animate = true) {
		const self = this
		const svg = this.getComponentContainer()
		const options = this.getOptions()
		const proportional = getProperty(options, 'meter', 'proportional')
		const data = this.model.getDisplayData()
		const status = this.model.getStatus()

		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		const { groupMapsTo } = options.data

		let domainMax: number
		if (getProperty(options, 'meter', 'proportional') === null) {
			domainMax = 100
		} else {
			const total = getProperty(options, 'meter', 'proportional', 'total')
			domainMax = total
				? total
				: (this.model as MeterChartModel).getMaximumDomain(this.model.getDisplayData())
		}

		// each meter has a scale for the value but no visual axis
		const xScale = scaleLinear().domain([0, domainMax]).range([0, width])
		const stackedData = this.getStackedBounds(data, xScale)

		const userProvidedHeight = getProperty(options, 'meter', 'height')

		// draw the container to hold the value
		DOMUtils.appendOrSelect(svg, 'rect.container')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr(
				'height',
				userProvidedHeight
					? userProvidedHeight
					: proportional
						? meterConfigs.height.proportional
						: meterConfigs.height.default
			)

		// draw the container max range value indicator
		DOMUtils.appendOrSelect(svg, 'line.rangeIndicator')
			.attr('x1', width)
			.attr('x2', width)
			.attr('y1', 0)
			.attr(
				'y2',
				userProvidedHeight
					? userProvidedHeight
					: proportional
						? meterConfigs.height.proportional
						: meterConfigs.height.default
			)

		// rect with the value binded
		const valued = svg.selectAll('rect.value').data(stackedData)

		// if user provided a color for the bar, we dont want to attach a status class
		const className =
			status != null && !self.model.isUserProvidedColorScaleValid() && !proportional
				? `value status--${status}`
				: 'value'

		// draw the value bar
		valued
			.enter()
			.append('rect')
			.classed('value', true)
			.merge(valued as any)
			.attr('x', (d: any) => {
				return d.x
			})
			.attr('y', 0)
			.attr('height', () => {
				return userProvidedHeight
					? userProvidedHeight
					: proportional
						? meterConfigs.height.proportional
						: meterConfigs.height.default
			})
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d[groupMapsTo],
					originalClassName: className
				})
			)
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'meter-bar-update',
					animate
				})
			)
			.attr('width', (d: any) => {
				return d.value > domainMax ? xScale(domainMax) : d.width
			})
			.style('fill', (d: any) => self.model.getFillColor(d[groupMapsTo], null, d))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'value')
			.attr('aria-label', (d: any) => d.value)

		valued.exit().remove()

		// draw the peak
		const peakValue = getProperty(options, 'meter', 'peak')

		let peakData = peakValue
		if (peakValue !== null) {
			if (peakValue > domainMax) {
				peakData = domainMax
			} else if (peakValue < data[0].value) {
				peakData = data[0].value > domainMax ? domainMax : data[0].value
			}
		}

		// if a peak is supplied within the domain, we want to render it
		const peak = svg.selectAll('line.peak').data(peakData == null ? [] : [peakData])

		peak
			.enter()
			.append('line')
			.classed('peak', true)
			.merge(peak as any)
			.attr('y1', 0)
			.attr('y2', () => {
				return userProvidedHeight
					? userProvidedHeight
					: proportional
						? meterConfigs.height.proportional
						: meterConfigs.height.default
			})
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'peak-line-update',
					animate
				})
			)
			.attr('x1', (d: any) => xScale(d))
			.attr('x2', (d: any) => xScale(d))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'peak')
			.attr('aria-label', (d: any) => d)

		peak.exit().remove()

		// this forces the meter chart to only take up as much height as needed (if no height is provided)
		this.services.domUtils.setSVGMaxHeight()

		// Add event listeners to elements and legend
		this.addEventListeners()
	}

	// add event listeners for tooltips on proportional meter bars
	addEventListeners() {
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const self = this
		const proportional = getProperty(options, 'meter', 'proportional')

		this.parent
			.selectAll('rect.value')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Meter.METER_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})

				if (proportional) {
					hoveredElement.classed('hovered', true)

					// Show tooltip
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement,
						items: [
							{
								label: datum[groupMapsTo],
								value: datum.value
							}
						]
					})
				}
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Meter.METER_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				if (proportional) {
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event
					})
				}
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Meter.METER_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Meter.METER_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				if (proportional) {
					hoveredElement.classed('hovered', false)

					// Hide tooltip
					self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
						hoveredElement
					})
				}
			})
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('rect.value')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
			.on('click', null)
	}
}
