import { extent, scaleLinear, type Selection } from 'd3'
import { Scatter } from './scatter'
import { DOMUtils } from '../../services'
import { Roles, ColorClassNameTypes, RenderTypes } from '../../interfaces'
import { flipDomainAndRangeBasedOnOrientation, getProperty } from '../../tools'

export class Bubble extends Scatter {
	type = 'bubble'
	renderType = RenderTypes.SVG

	getRadiusScale(selection: Selection<any, any, any, any>) {
		const options = this.getOptions()
		const { radiusMapsTo } = options.bubble

		const data = selection.data()
		// Filter out any null/undefined values
		const allRadii = data.map((d: any) => d[radiusMapsTo]).filter((radius) => radius)
		const chartSize = DOMUtils.getHTMLElementSize(this.services.domUtils.getMainContainer())

		// We need the ternary operator here in case the user
		// doesn't provide radius values in data
		const radiusDataIsValid = allRadii.length > 0
		const domain = radiusDataIsValid ? extent(allRadii) : [1, 1]

		return scaleLinear()
			.domain(domain)
			.range(radiusDataIsValid ? options.bubble.radiusRange(chartSize, data) : [4, 4])
	}

	styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.getOptions()
		const { radiusMapsTo } = options.bubble

		const radiusScale = this.getRadiusScale(selection)
		const { groupMapsTo } = options.data

		const { cartesianScales } = this.services
		const getDomainValue = (d: any) => cartesianScales.getDomainValue(d)
		const getRangeValue = (d: any) => cartesianScales.getRangeValue(d)
		const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		)

		selection
			.raise()
			.classed('dot', true)
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-label', (d: any) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(d)
				return d[rangeIdentifier]
			})
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'bubble-update-enter',
					animate
				})
			)
			.attr('cx', getXValue)
			.attr('cy', getYValue)
			// We need `|| 1` here in case the user doesn't provide radius values in data
			.attr('r', (d: any) => radiusScale(d[radiusMapsTo] || 1))
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE],
					dataGroupName: d[groupMapsTo],
					originalClassName: 'dot'
				})
			)
			.style('fill', (d: any) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d)
				return this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
			})
			.style('stroke', (d: any) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d)
				return this.model.getStrokeColor(d[groupMapsTo], d[domainIdentifier], d)
			})
			.attr('fill-opacity', options.bubble.fillOpacity)
			.attr('opacity', 1)
	}

	getTooltipAdditionalItems(datum: any) {
		const bubbleOptions = getProperty(this.getOptions(), 'bubble')

		return [
			{
				label: getProperty(bubbleOptions, 'radiusLabel'),
				value: datum[getProperty(bubbleOptions, 'radiusMapsTo')]
			}
		]
	}
}
