import { select, Selection } from 'd3'
import { flipDomainAndRangeBasedOnOrientation, getProperty } from '@/tools'
import { Component } from '@/components/component'
import { Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

export class Scatter extends Component {
	type = 'scatter'
	renderType = RenderTypes.SVG

	scatterData: any

	init() {
		const { events } = this.services
		if (!events) throw new Error('Services events are undefined.')

		// Highlight correct circle on legend item hovers
		events.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover as EventListenerOrEventListenerObject
		)
		// Un-highlight circles on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)

		const { fadeInOnChartHolderMouseover } = this.configs
		if (fadeInOnChartHolderMouseover) {
			// Fade-in scatter circles
			events.addEventListener(Events.Chart.MOUSEOVER, this.handleChartHolderOnHover)
			// Fade-out scatter circles
			events.addEventListener(Events.Chart.MOUSEOUT, this.handleChartHolderOnMouseOut)
		}
	}

	filterBasedOnZoomDomain(data: any) {
		const { cartesianScales } = this.services
		if (!cartesianScales) throw new Error('Services cartesianScales are undefined.')

		const domainIdentifier = cartesianScales.getDomainIdentifier(data)
		const zoomDomain = this.model.get('zoomDomain')
		if (zoomDomain !== undefined) {
			return data.filter(
				(d: any) =>
					d[domainIdentifier].getTime() >= zoomDomain[0].getTime() &&
					d[domainIdentifier].getTime() <= zoomDomain[1].getTime()
			)
		}
		return data
	}

	getScatterData() {
		const options = this.getOptions()

		const { stacked } = this.configs

		let scatterData
		if (stacked) {
			const percentage = Object.keys(options.axes).some(axis => options.axes[axis].percentage)
			scatterData = this.model.getStackedData({
				groups: this.configs.groups,
				percentage
			})
		} else {
			const { cartesianScales } = this.services
			if (!cartesianScales) throw new Error('Services cartesianScales are undefined.')
			scatterData = this.model.getDisplayData(this.configs.groups).filter((d: any) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(d)
				return d[rangeIdentifier] !== undefined && d[rangeIdentifier] !== null
			})
		}

		// filter out datapoints that aren't part of the zoomed domain
		return this.filterBasedOnZoomDomain(scatterData)
	}

	render(animate: boolean) {
		const isScatterEnabled =
			getProperty(this.getOptions(), 'points', 'enabled') ||
			getProperty(this.getOptions(), 'bubble', 'enabled')

		if (!isScatterEnabled) {
			return
		}

		// Grab container SVG
		const svg = this.getComponentContainer({ ariaLabel: 'scatter points', withinChartClip: true })

		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const { cartesianScales } = this.services
		if (!cartesianScales) throw new Error('Services cartesianScales are undefined.')
		const domainIdentifier = cartesianScales.getDomainIdentifier()

		// Update data on dot groups
		const circles = svg
			.selectAll('circle.dot')
			.data(
				this.getScatterData(),
				(datum: any) => `${datum[groupMapsTo]}-${datum[domainIdentifier]}`
			) as Selection<SVGCircleElement, any, HTMLElement, any>

		// Remove circles that need to be removed
		circles.exit().attr('opacity', 0).remove()

		// Add the dot groups that need to be introduced
		const enteringCircles = circles.enter().append('circle').classed('dot', true).attr('opacity', 0)

		// Apply styling & position
		const circlesToStyle = enteringCircles.merge(circles)
		this.styleCircles(circlesToStyle, animate)

		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	// A value is an anomaly if is above all defined domain and range thresholds
	isDatapointThresholdAnomaly(datum: any) {
		const { handleThresholds } = this.configs
		if (!handleThresholds) {
			return false
		}

		const { cartesianScales } = this.services
		if (!cartesianScales) throw new Error('Cartesian scales service is undefined')

		const orientation = cartesianScales.getOrientation()

		// Get highest domain and range thresholds
		const [xThreshold, yThreshold] = flipDomainAndRangeBasedOnOrientation(
			cartesianScales.getHighestDomainThreshold(),
			cartesianScales.getHighestRangeThreshold(),
			orientation
		)

		const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
			(d: any) => cartesianScales.getDomainValue(d),
			(d: any) => cartesianScales.getRangeValue(d),
			orientation
		)

		// Get datum x and y values
		const xValue = getXValue(datum)
		const yValue = getYValue(datum)

		// To be an anomaly, the value has to be higher or equal than the threshold value
		// (if are present, both range and domain threshold values)
		if (yThreshold && xThreshold) {
			return yValue <= yThreshold.scaleValue && xValue >= xThreshold.scaleValue
		}

		if (yThreshold) {
			return yValue <= yThreshold.scaleValue
		}

		if (xThreshold) {
			return xValue >= xThreshold.scaleValue
		}

		return false
	}

	styleCircles(selection: Selection<SVGCircleElement, any, Element, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.getOptions()
		const { filled, fillOpacity } = options.points
		const { cartesianScales } = this.services
		if (!cartesianScales) throw new Error('Cartesian scales service is undefined')

		const { groupMapsTo } = options.data

		const getDomainValue = (d: any) => cartesianScales.getDomainValue(d)
		const getRangeValue = (d: any) => cartesianScales.getRangeValue(d)
		const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		)

		const { fadeInOnChartHolderMouseover } = this.configs

		selection
			.raise()
			.classed('dot', true)
			.attr('class', (d: any) => {
				// one element in ChartTabularData (Record<string, any>)
				const domainIdentifier = cartesianScales.getDomainIdentifier(d)
				const isFilled = this.model.getIsFilled(d[groupMapsTo], d[domainIdentifier], d, filled)
				const classNamesNeeded = isFilled
					? [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE]
					: [ColorClassNameTypes.STROKE]

				return (
					this.model.getColorClassName({
						classNameTypes: classNamesNeeded,
						dataGroupName: d[groupMapsTo],
						originalClassName: 'dot'
					}) || ''
				)
			})
			// Set class to highlight the dots that are above all the thresholds, in both directions (vertical and horizontal)
			.classed('threshold-anomaly', (d: any) => this.isDatapointThresholdAnomaly(d))
			.classed('filled', (d: any) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d)
				return this.model.getIsFilled(d[groupMapsTo], d[domainIdentifier], d, filled)
			})
			.classed('unfilled', (d: any) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d)
				return !this.model.getIsFilled(d[groupMapsTo], d[domainIdentifier], d, filled)
			})
			.transition()
			.call((t: any) =>
				this.services.transitions?.setupTransition({
					transition: t,
					name: 'scatter-update-enter',
					animate
				})
			)
			.attr('cx', getXValue)
			.attr('cy', getYValue)
			.attr('r', options.points.radius)
			.style('fill', (d: any) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d)
				if (this.model.getIsFilled(d[groupMapsTo], d[domainIdentifier], d, filled)) {
					return this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
				}
			})
			.style('stroke', (d: any) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d)
				return this.model.getStrokeColor(d[groupMapsTo], d[domainIdentifier], d)
			})
			.attr('fill-opacity', filled ? fillOpacity : 1)
			.attr('opacity', fadeInOnChartHolderMouseover ? 0 : 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'point')
			.attr('aria-label', (d: any) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(d)
				return d[rangeIdentifier]
			})

		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	handleChartHolderOnHover = () => {
		if (!this.parent) throw new Error('Parent not defined')
		this.parent
			.selectAll('circle.dot')
			.transition('chart-holder-hover-scatter')
			.call((t: any) =>
				this.services.transitions?.setupTransition({
					transition: t,
					name: 'chart-holder-hover-scatter'
				})
			)
			.attr('opacity', 1)
	}

	handleChartHolderOnMouseOut = () => {
		if (!this.parent) throw new Error('Parent not defined')
		this.parent
			.selectAll('circle.dot')
			.transition('chart-holder-mouseout-scatter')
			.call((t: any) =>
				this.services.transitions?.setupTransition({
					transition: t,
					name: 'chart-holder-mouseout-scatter'
				})
			)
			.attr('opacity', 0)
	}

	// TODO: follow signature of EventListenerOrEventListenerObject
	handleLegendOnHover = (evt: CustomEvent) => {
		const { hoveredElement } = evt.detail
		const { groupMapsTo } = this.getOptions().data

		if (!this.parent) throw new Error('Parent not defined')
		this.parent
			.selectAll('circle.dot')
			.transition('legend-hover-scatter')
			.call((t: any) =>
				this.services.transitions?.setupTransition({
					transition: t,
					name: 'legend-hover-scatter'
				})
			)
			.attr('opacity', (d: any) => (d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1))
	}

	handleLegendMouseOut = () => {
		if (!this.parent) throw new Error('Parent not defined')

		this.parent
			.selectAll('circle.dot')
			.transition('legend-mouseout-scatter')
			.call((t: any) =>
				this.services.transitions?.setupTransition({
					transition: t,
					name: 'legend-mouseout-scatter'
				})
			)
			.attr('opacity', 1)
	}

	// Extended in bubble graphs
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getTooltipAdditionalItems(datum: any) {
		return null as any
	}

	addEventListeners() {
		const self = this
		const { groupMapsTo } = self.getOptions().data
		const alwaysShowRulerTooltip = getProperty(this.getOptions(), 'tooltip', 'alwaysShowRulerTooltip')

		if (!this.parent) throw new Error('Parent not defined')
		
		const circles = this.parent.selectAll('circle')
		
		// If alwaysShowRulerTooltip is enabled, disable pointer events so the backdrop can receive them
		// but keep event listeners active for programmatic events from ruler
		if (alwaysShowRulerTooltip) {
			circles.style('pointer-events', 'none')
		} else {
			circles.style('pointer-events', null)
		}
		
		circles
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				hoveredElement
					.classed('hovered', true)
					.attr('class', (d: any) =>
						self.model.getColorClassName({
							classNameTypes: [ColorClassNameTypes.FILL],
							dataGroupName: d[groupMapsTo],
							originalClassName: hoveredElement.attr('class')
						})
					)
					.style('fill', (d: any) => {
						const domainIdentifier = self.services.cartesianScales?.getDomainIdentifier(d)
						return self.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
					})
					.classed('unfilled', false)

				// Show tooltip only if alwaysShowRulerTooltip is not enabled
				if (!alwaysShowRulerTooltip) {
					self.services.events?.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement,
						data: [datum],
						additionalItems: self.getTooltipAdditionalItems(datum)
					})
				}

				// Dispatch mouse event
				self.services.events?.dispatchEvent(Events.Scatter.SCATTER_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events?.dispatchEvent(Events.Scatter.SCATTER_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				self.services.events?.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events?.dispatchEvent(Events.Scatter.SCATTER_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', false)

				if (!self.configs.filled) {
					const { filled } = self.getOptions().points
					const domainIdentifier = self.services.cartesianScales?.getDomainIdentifier(datum)
					const isFilled = self.model.getIsFilled(
						datum[groupMapsTo],
						datum[domainIdentifier],
						datum,
						filled
					)
					hoveredElement.classed('unfilled', !isFilled).style('fill', (d: any) => {
						if (isFilled || filled) {
							return self.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
						}
						return null
					})
				}

				// Dispatch mouse event
				self.services.events?.dispatchEvent(Events.Scatter.SCATTER_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Hide tooltip
				self.services.events?.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				})
			})
	}

	destroy() {
		// Remove event listeners
		this.parent?.selectAll('circle').on('mousemove', null).on('mouseout', null)

		// Remove legend listeners
		const { events } = this.services
		if (!events) throw new Error('Services events undefined')
		events.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover as EventListenerOrEventListenerObject
		)
		events.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
		events.removeEventListener(Events.Chart.MOUSEOVER, this.handleChartHolderOnHover)
		events.removeEventListener(Events.Chart.MOUSEOUT, this.handleChartHolderOnMouseOut)
	}
}
