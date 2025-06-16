import { line } from 'd3'
import { some } from 'lodash-es'
import { flipDomainAndRangeBasedOnOrientation, getProperty } from '@/tools'
import { lines as lineConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

export class Line extends Component {
	type = 'line'
	renderType = RenderTypes.SVG

	init() {
		const { events } = this.services
		// Highlight correct line legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate = true) {
		// Browser detection for Firefox specific handling
		const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
		const isZoomBarEnabled = this.model.get('zoomDomain') !== undefined

		// For Firefox with zoombar, use alternative container approach
		const svg =
			isFirefox && isZoomBarEnabled
				? this.getComponentContainer({ ariaLabel: 'lines', withinChartClip: false })
				: this.getComponentContainer({ ariaLabel: 'lines', withinChartClip: true })

		const { cartesianScales, curves } = this.services

		const getDomainValue = (d: any) => cartesianScales.getDomainValue(d)
		const getRangeValue = (d: any) => cartesianScales.getRangeValue(d)
		const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		)
		const options = this.getOptions()

		// D3 line generator function
		const lineGenerator = line()
			.x(getXValue)
			.y(getYValue)
			.curve(curves.getD3Curve())
			.defined((datum: any) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(datum)
				const value = datum[rangeIdentifier]
				if (value === null || value === undefined) {
					return false
				}
				return true
			})

		let data = []
		if (this.configs.stacked) {
			const percentage = Object.keys(options.axes).some(axis => options.axes[axis].percentage)
			const { groupMapsTo } = options.data
			const stackedData = this.model.getStackedData({
				groups: this.configs.groups,
				percentage
			})

			data = stackedData.map((d: any) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d)
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(d)
				return {
					name: getProperty(d, 0, groupMapsTo),
					data: d.map((datum: any) => ({
						[domainIdentifier]: datum.data.sharedStackKey,
						[groupMapsTo]: datum[groupMapsTo],
						[rangeIdentifier]: datum[1]
					})),
					hidden: !some(d, (datum: any) => datum[0] !== datum[1])
				}
			})
		} else {
			data = this.model.getGroupedData(this.configs.groups)
		}

		// Update the bound data on lines
		const lines = svg.selectAll('path.line').data(data, (group: any) => group.name)

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		lines.exit().attr('opacity', 0).remove()

		// Add lines that need to be introduced
		const enteringLines = lines.enter().append('path').classed('line', true).attr('opacity', 0)

		// Apply styles and datum
		const allLines = enteringLines
			.merge(lines as any)
			.data(data, (group: any) => group.name)
			.attr('class', (group: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: group.name,
					originalClassName: 'line'
				})
			)
			.style('stroke', (group: any) => this.model.getStrokeColor(group.name, null, group.data))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'line')
			.attr('aria-label', (group: any) => {
				const { data: groupData } = group
				return groupData
					.map((datum: any) => {
						const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(datum)
						return datum[rangeIdentifier]
					})
					.join(',')
			})

		// For Firefox with zoombar, apply manual clipping using CSS clip
		if (isFirefox && isZoomBarEnabled) {
			const mainXScale = cartesianScales.getMainXScale()
			const mainYScale = cartesianScales.getMainYScale()

			if (mainXScale && mainYScale) {
				const [xScaleStart, xScaleEnd] = mainXScale.range()
				const [yScaleEnd, yScaleStart] = mainYScale.range()

				// Apply manual clipping using CSS clip property (Firefox-specific workaround)
				svg
					.style('overflow', 'hidden')
					.style('clip', `rect(${yScaleStart}px, ${xScaleEnd}px, ${yScaleEnd}px, ${xScaleStart}px)`)
			}
		}

		allLines
			// Transition
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'line-update-enter',
					animate
				})
			)
			.attr('opacity', (d: any) => (d.hidden ? 0 : 1))
			.attr('d', (group: any) => {
				const { data: groupData } = group
				return lineGenerator(groupData)
			})
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		this.parent
			.selectAll('path.line')
			.transition('legend-hover-line')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-line'
				})
			)
			.attr('opacity', (group: any) => {
				if (group.name !== hoveredElement.datum()['name']) {
					return lineConfigs.opacity.unselected
				}

				return lineConfigs.opacity.selected
			})
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.line')
			.transition('legend-mouseout-line')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-line'
				})
			)
			.attr('opacity', lineConfigs.opacity.selected)
	}

	destroy() {
		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}
}
