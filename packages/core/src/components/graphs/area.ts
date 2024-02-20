import { area, select } from 'd3'
import { getProperty } from '@/tools'
import { area as areaConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { CartesianOrientations, Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { GradientUtils } from '@/services/essentials/gradient-utils'

export class Area extends Component {
	type = 'area'
	renderType = RenderTypes.SVG

	gradient_id = 'gradient-id-' + Math.floor(Math.random() * 99999999999)

	init() {
		const eventsFragment = this.services.events

		// Highlight correct area on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)

		// Un-highlight area on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate = true) {
		const svg = this.getComponentContainer({ withinChartClip: true })
		const options = this.getOptions()
		let domain = [0, 0]

		const { cartesianScales } = this.services

		const orientation = cartesianScales.getOrientation()
		const areaGenerator = area()
			.curve(this.services.curves.getD3Curve())
			.defined((datum: any) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier()
				const value = datum[rangeIdentifier]
				if (value === null || value === undefined) {
					return false
				}
				return true
			})

		// Update the bound data on area groups
		const groupedData = this.model.getGroupedData(this.configs.groups)

		const bounds = getProperty(options, 'bounds')
		const boundsEnabled = bounds && groupedData && groupedData.length === 1

		if (!boundsEnabled && bounds) {
			console.warn(
				`Bounds can only be shown when having 1 single datagroup, you've supplied ${groupedData.length}`
			) // eslint-disable-line no-console
		}

		let upperBoundRangeValue = 0
		// If includeZero is enabled, we want to replace upperBoundRange from 0 to domain value
		const includeZeroInRangeValue = (position: any, _domain: any) => {
			if (getProperty(options, 'axes', position, 'includeZero') === false) {
				// Replace upperBoundRangeValue if domain is positive
				if (_domain[0] > 0 && _domain[1] > 0) {
					upperBoundRangeValue = _domain[0]
				}
			}
		}

		const upperBound = (d: any) =>
			boundsEnabled
				? cartesianScales.getBoundedScaledValues(d)[0]
				: cartesianScales.getRangeValue(upperBoundRangeValue)

		const lowerBound = (d: any) =>
			boundsEnabled
				? cartesianScales.getBoundedScaledValues(d)[1]
				: cartesianScales.getRangeValue(d)

		if (orientation === CartesianOrientations.VERTICAL) {
			domain = cartesianScales.getMainYScale().domain() as number[]
			includeZeroInRangeValue(cartesianScales.getMainYAxisPosition(), domain)

			areaGenerator
				.x((d: any) => cartesianScales.getDomainValue(d))
				.y0((d: any) => upperBound(d))
				.y1((d: any) => lowerBound(d))
		} else {
			domain = cartesianScales.getMainXScale().domain() as number[]
			includeZeroInRangeValue(cartesianScales.getMainXAxisPosition(), domain)

			areaGenerator
				.x0((d: any) => upperBound(d))
				.x1((d: any) => lowerBound(d))
				.y((d: any) => cartesianScales.getDomainValue(d))
		}

		// Is gradient enabled or not
		const isGradientEnabled = getProperty(options, 'color', 'gradient', 'enabled')

		// Should gradient style be applicable
		const isGradientAllowed = groupedData && groupedData.length === 1 && isGradientEnabled

		if (groupedData.length > 1 && isGradientEnabled) {
			console.error('Gradients can only be enabled when having 1 single dataset')
		}

		const areas = svg.selectAll('path.area').data(groupedData, (group: any) => group.name)

		const chartMainContainer = select(this.services.domUtils.getMainContainer())

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areas.exit().attr('opacity', 0).remove()

		// if there is no grouped data (if all data groups are turned OFF with legend which can happen in the case of combo charts)
		if (!groupedData.length) {
			return
		}

		if (isGradientAllowed) {
			// The fill value of area has been overwritten, get color value from stroke color class instead
			const strokePathElement = chartMainContainer
				.select(
					`path.${this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.STROKE],
						dataGroupName: groupedData[0].name
					})}`
				)
				.node()

			let colorValue
			if (strokePathElement) {
				colorValue = getComputedStyle(strokePathElement as HTMLElement, null).getPropertyValue(
					'stroke'
				)
			} else {
				const sparklineColorObject = getProperty(this.model.getOptions(), 'color', 'scale')

				if (sparklineColorObject !== null) {
					const sparklineColorObjectKeys = Object.keys(sparklineColorObject)
					colorValue = sparklineColorObject[sparklineColorObjectKeys[0]]
				}
			}
			GradientUtils.appendOrUpdateLinearGradient({
				svg: this.parent,
				id: this.services.domUtils.generateElementIDString(
					`${groupedData[0].name.replace(' ', '')}_${this.gradient_id}`
				),
				x1: '0%',
				x2: '0%',
				y1: '0%',
				y2: '100%',
				stops: GradientUtils.getStops(domain, colorValue)
			})
		} else {
			// make sure there is no linearGradient if no gradient is allowed
			if (!this.parent.selectAll('defs linearGradient').empty()) {
				this.parent.selectAll('defs linearGradient').each(function () {
					;(this as any).parentNode.remove()
				})
			}
		}

		const self = this

		// Enter paths that need to be introduced
		const enteringAreas = areas.enter().append('path')
		if (isGradientAllowed) {
			enteringAreas
				.merge(areas as any)
				.style(
					'fill',
					(group: any) =>
						`url(#${this.services.domUtils.generateElementIDString(
							`${group.name.replace(' ', '')}_${this.gradient_id}`
						)})`
				)
				.attr('class', 'area')
				.attr('class', (group: any) =>
					this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.FILL],
						dataGroupName: group.name,
						originalClassName: 'area'
					})
				)
				.attr('d', (group: any) => {
					const { data } = group
					return areaGenerator(data)
				})
		} else {
			enteringAreas
				.attr('opacity', 0)
				.merge(areas as any)
				.attr('class', 'area')
				.attr('class', (group: any) =>
					this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE],
						dataGroupName: group.name,
						originalClassName: 'area'
					})
				)
				.style('fill', (group: any) => self.model.getFillColor(group.name, null, group.data))
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'area-update-enter',
						animate
					})
				)
				.attr('opacity', boundsEnabled ? 1 : areaConfigs.opacity.selected)
				.attr('d', (group: any) => {
					const { data } = group
					return areaGenerator(data)
				})

			if (boundsEnabled) {
				enteringAreas
					.attr('fill-opacity', areaConfigs.opacity.selected)
					.style('stroke', (group: any) => self.model.getStrokeColor(group.name, null, group.data))
					.style('stroke-dasharray', '2, 2')
					.attr('stroke-width', 0.7 + 'px')
			}
		}
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		this.parent
			.selectAll('path.area')
			.transition('legend-hover-area')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-area'
				})
			)
			.attr('opacity', (group: any) => {
				if (group.name !== hoveredElement.datum()['name']) {
					return areaConfigs.opacity.unselected
				}

				return areaConfigs.opacity.selected
			})
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.area')
			.transition('legend-mouseout-area')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-area'
				})
			)
			.attr('opacity', areaConfigs.opacity.selected)
	}

	destroy() {
		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}
}
