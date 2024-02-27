import { select } from 'd3'
import { generateSVGPathString, getProperty } from '@/tools'
import { Component } from '@/components/component'
import { Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { BulletChartModel } from '@/model/bullet'

export class Bullet extends Component {
	type = 'bullet'
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

		const rangeScale = this.services.cartesianScales.getRangeScale()
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()
		const [rangeScaleStart, rangeScaleEnd] = rangeScale.range()
		const [, rangeScaleDomainMax] = rangeScale.domain()

		const renderRangeBoxes = () => {
			const rangeBoxData: any[] = []
			data.forEach((datum: any) => {
				if (datum.ranges) {
					datum.ranges.forEach((range: any, i: number) => {
						if (range !== null && range !== undefined && range < rangeScaleDomainMax) {
							rangeBoxData.push({
								datum,
								value: range,
								order: i + 1
							})
						}
					})
				} else {
					rangeBoxData.push({
						datum,
						order: 1
					})
				}
			})

			// Update data on all lines
			const rangeBoxes = DOMUtils.appendOrSelect(svg, 'g.range-boxes')
				.selectAll('path.range-box')
				.data(rangeBoxData, (datum: any) => `${datum[groupMapsTo]}-${datum.order}`)

			// Remove lines that are no longer needed
			rangeBoxes.exit().attr('opacity', 0).remove()

			// Add the paths that need to be introduced
			const rangeBoxesEnter = rangeBoxes.enter().append('path').attr('opacity', 0)

			rangeBoxesEnter
				.merge(rangeBoxes as any)
				.attr('class', (d: any) => `range-box order-${d.order}`)
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-range-box-update-enter',
						animate
					})
				)
				.attr('d', (d: any) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					const lineHeight = 16

					let x0: number, x1: number, y0: number, y1: number
					if (d.order === 1) {
						x0 = this.services.cartesianScales.getDomainValue(d.datum) - lineHeight / 2
						x1 = x0 + lineHeight
						y0 = rangeScaleEnd - 2
						y1 = rangeScaleStart + 1
					} else {
						x0 = this.services.cartesianScales.getDomainValue(d.datum) - lineHeight / 2
						x1 = x0 + lineHeight
						y0 = this.services.cartesianScales.getRangeValue(d.value)
						y1 = rangeScaleEnd
					}

					return generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					)
				})
				.attr('opacity', 1)
		}

		const renderBars = () => {
			// Update data on all bars
			const bars = DOMUtils.appendOrSelect(svg, 'g.bars')
				.selectAll('path.bar')
				.data(data, (datum: any) => datum[groupMapsTo])

			// Remove bars that are no longer needed
			bars.exit().attr('opacity', 0).remove()

			// Add the paths that need to be introduced
			const barsEnter = bars.enter().append('path').attr('opacity', 0)

			barsEnter
				.merge(bars as any)
				.classed('bar', true)
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-bar-update-enter',
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
					const barWidth = 8
					const x0 = this.services.cartesianScales.getDomainValue(d) - barWidth / 2
					const x1 = x0 + barWidth
					const y0 = this.services.cartesianScales.getRangeValue(0) + 1
					const y1 = this.services.cartesianScales.getRangeValue(d)

					return generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					)
				})
				.attr('opacity', 1)
				// a11y
				.attr('role', Roles.GRAPHICS_SYMBOL)
				.attr('aria-roledescription', 'bar')
				.attr('aria-label', (d: any) => d.value)
		}

		const renderTargetLines = () => {
			// Update data on all lines
			const lines = DOMUtils.appendOrSelect(svg, 'g.markers')
				.selectAll('path.marker')
				.data(
					data.filter((d: any) => getProperty(d, 'marker') !== null),
					(datum: any) => datum[groupMapsTo]
				)

			// Remove lines that are no longer needed
			lines.exit().attr('opacity', 0).remove()

			// Add the paths that need to be introduced
			const linesEnter = lines.enter().append('path').attr('opacity', 0)

			linesEnter
				.merge(lines as any)
				.classed('marker', true)
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-marker-update-enter',
						animate
					})
				)
				.attr('d', (d: any) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					const lineHeight = 24
					const x0 = this.services.cartesianScales.getDomainValue(d) - lineHeight / 2
					const x1 = x0 + lineHeight
					const y0 = this.services.cartesianScales.getRangeValue(d.marker)
					const y1 = y0

					return generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					)
				})
				.attr('opacity', 1)
		}

		const renderTargetQuartiles = () => {
			let quartilesData: any[] = []
			data
				.filter((d: any) => getProperty(d, 'marker') !== null)
				.forEach((d: any) => {
					const value = d.marker
					const barValue = d[rangeIdentifier]

					quartilesData = quartilesData.concat([
						{ datum: d, value: value * 0.25, barValue },
						{ datum: d, value: value * 0.5, barValue },
						{ datum: d, value: value * 0.75, barValue }
					])
				})

			// Update data on all lines
			const lines = DOMUtils.appendOrSelect(svg, 'g.quartiles')
				.selectAll('path.quartile')
				.data(quartilesData, (datum: any) => datum[groupMapsTo])

			// Remove lines that are no longer needed
			lines.exit().attr('opacity', 0).remove()

			// Add the paths that need to be introduced
			const linesEnter = lines.enter().append('path').attr('opacity', 0)

			linesEnter
				.merge(lines as any)
				.attr('class', (d: any) => {
					return `quartile ${d.value <= d.barValue ? 'over-bar' : ''}`
				})
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-quartile-update-enter',
						animate
					})
				)
				.attr('d', ({ datum: d, value }: { datum: any; value: any }) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					let lineHeight = 4
					// if it lines up with a performance area border
					// make the line taller
					if (d.ranges && d.ranges.indexOf(value) !== -1) {
						lineHeight = 8
					}

					const x0 = this.services.cartesianScales.getDomainValue(d) - lineHeight / 2
					const x1 = x0 + lineHeight
					const y0 = this.services.cartesianScales.getRangeValue(value)
					const y1 = y0

					return generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					)
				})
				.attr('opacity', 1)
		}

		renderRangeBoxes()
		renderBars()
		renderTargetLines()
		renderTargetQuartiles()

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

		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()

		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')

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

				const performanceAreaTitles = getProperty(options, 'bullet', 'performanceAreaTitles')
				const matchingRangeIndex = (
					self.model as BulletChartModel
				).getMatchingRangeIndexForDatapoint(datum)

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label:
								getProperty(options, 'locale', 'translations', 'group') ||
								getProperty(options, 'tooltip', 'groupLabel') ||
								'Group',
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo]
							})
						},
						{
							label: 'Value',
							value: datum[rangeIdentifier]
						},
						{
							label: 'Target',
							value: datum.marker
						},
						{
							label: 'Percentage',
							value: `${numberFormatter(Math.floor((datum[rangeIdentifier] / datum.marker) * 100), localeCode)}%`
						},
						{
							label: 'Performance',
							value: performanceAreaTitles[matchingRangeIndex]
						}
					]
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
