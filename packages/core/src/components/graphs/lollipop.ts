import { flipDomainAndRangeBasedOnOrientation } from '@/tools'
import { lines } from '@/configuration'
import { Scatter } from './scatter'
import { CartesianOrientations, ColorClassNameTypes, Events, RenderTypes } from '@/interfaces/enums'

export class Lollipop extends Scatter {
	type = 'lollipop'
	renderType = RenderTypes.SVG

	init() {
		const { events } = this.services
		// Highlight correct line legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true })

		const options = this.model.getOptions()

		const { groupMapsTo } = options.data

		const { cartesianScales } = this.services
		const mainXScale = cartesianScales.getMainXScale()
		const mainYScale = cartesianScales.getMainYScale()
		const domainIdentifier = cartesianScales.getDomainIdentifier()

		const getDomainValue = (d: any) => cartesianScales.getDomainValue(d)
		const getRangeValue = (d: any) => cartesianScales.getRangeValue(d)
		const orientation = cartesianScales.getOrientation()
		const [getXValue, getYValue] = flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			orientation
		)

		// Update data on lines
		const lines = svg
			.selectAll('line.line')
			.data(
				this.getScatterData(),
				(datum: any) => `${datum[groupMapsTo]}-${datum[domainIdentifier]}`
			)

		// Remove lines that are no longer needed
		lines.exit().attr('opacity', 0).remove()

		// Remove lines that need to be removed
		const enteringLines = lines.enter().append('line').attr('opacity', 0)

		const allLines = enteringLines
			.merge(lines)
			.classed('line', true)
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: d[groupMapsTo],
					originalClassName: 'line'
				})
			)
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'lollipop-line-update-enter',
					animate
				})
			)
			.style('stroke', (d: any) => this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d))
			.attr('opacity', 1)

		if (orientation === CartesianOrientations.HORIZONTAL) {
			allLines
				.attr('y1', getYValue)
				.attr('y2', getYValue)
				.attr('x1', mainXScale.range()[0])
				.attr('x2', (d: any) => (getXValue(d) as any) - options.points.radius)
		} else {
			allLines
				.attr('x1', getXValue)
				.attr('x2', getXValue)
				.attr('y1', mainYScale.range()[0])
				.attr('y2', (d: any) => getYValue(d) + options.points.radius)
		}

		this.addScatterPointEventListeners()
	}

	// listen for when individual datapoints are hovered
	addScatterPointEventListeners() {
		// Highlight correct line associated when hovering on a scatter point
		this.services.events.addEventListener(
			Events.Scatter.SCATTER_MOUSEOVER,
			this.handleScatterOnHover
		)

		// unbolden the line when not hovered on the lollipop scatter point
		this.services.events.addEventListener(
			Events.Scatter.SCATTER_MOUSEOUT,
			this.handleScatterOnMouseOut
		)
	}

	// on hover, bolden the line associated with the scatter
	handleScatterOnHover = (event: CustomEvent) => {
		const hoveredElement = event.detail

		const options = this.getOptions()
		const { groupMapsTo } = options.data

		this.parent.selectAll('line.line').attr('stroke-width', (d: any) => {
			if (d[groupMapsTo] !== hoveredElement.datum[groupMapsTo]) {
				return lines.weight.unselected
			}
			// apply selected weight
			return lines.weight.selected
		})
	}

	// on mouse out remove the stroke width assertion
	handleScatterOnMouseOut = () => {
		this.parent.selectAll('line.line').attr('stroke-width', lines.weight.unselected)
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		const options = this.getOptions()
		const { groupMapsTo } = options.data

		this.parent
			.selectAll('line.line')
			.transition('legend-hover-line')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-line'
				})
			)
			.attr('opacity', (d: any) => {
				if (d[groupMapsTo] !== hoveredElement.datum()['name']) {
					return lines.opacity.unselected
				}

				return lines.opacity.selected
			})
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('line.line')
			.transition('legend-mouseout-line')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-line'
				})
			)
			.attr('opacity', lines.opacity.selected)
	}

	destroy() {
		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)

		// remove scatter listeners
		eventsFragment.removeEventListener(Events.Scatter.SCATTER_MOUSEOVER, this.handleScatterOnHover)
		eventsFragment.removeEventListener(
			Events.Scatter.SCATTER_MOUSEOUT,
			this.handleScatterOnMouseOut
		)
	}
}
