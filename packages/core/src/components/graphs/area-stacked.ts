import { area } from 'd3'
import { getProperty } from '@/tools'
import { area as areaConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

export class StackedArea extends Component {
	type = 'area-stacked'
	renderType = RenderTypes.SVG

	areaGenerator: any

	init() {
		const eventsFragment = this.services.events

		// Highlight correct area on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)

		// Un-highlight area on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate = true) {
		const svg = this.getComponentContainer({ withinChartClip: true })
		const self = this
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const percentage = Object.keys(options.axes).some(axis => options.axes[axis].percentage)

		const stackedData = this.model.getStackedData({
			percentage,
			groups: this.configs.groups
		})
		const datum = getProperty(stackedData, 0, 0) as number[] // firstDatum name could not be used by getDomainAxisPosition() and getRangeAxisPosition() below

		// area doesn't have to use the main range and domain axes - they can be mapped to the secondary (in the case of a combo chart)
		// however area _cannot_ have multiple datasets that are mapped to _different_ ranges and domains so we can use the first data item
		const domainAxisPosition = this.services.cartesianScales.getDomainAxisPosition({ datum })
		const rangeAxisPosition = this.services.cartesianScales.getRangeAxisPosition({ datum })
		const mainYScale = this.services.cartesianScales.getScaleByPosition(rangeAxisPosition)

		const areas = svg
			.selectAll('path.area')
			.data(stackedData, (d: any) => getProperty(d, 0, groupMapsTo))

		// D3 area generator function
		this.areaGenerator = area()
			.x((d: any) =>
				this.services.cartesianScales.getValueThroughAxisPosition(
					domainAxisPosition,
					d.data.sharedStackKey
				)
			)
			.y0((d: any) => mainYScale(d[0]))
			.y1((d: any) => mainYScale(d[1]))
			.curve(this.services.curves.getD3Curve())

		areas.exit().attr('opacity', 0).remove()

		const enteringAreas = areas.enter().append('path').attr('opacity', 0)

		enteringAreas
			.merge(areas as any)
			.data(stackedData, (d: any) => getProperty(d, 0, groupMapsTo))
			.attr('class', 'area')
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: getProperty(d, 0, groupMapsTo),
					originalClassName: 'area'
				})
			)
			.style('fill', (d: any) => self.model.getFillColor(getProperty(d, 0, groupMapsTo), null, d))
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'area')
			.attr('aria-label', (d: any) => getProperty(d, 0, groupMapsTo))
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'area-update-enter',
					animate
				})
			)
			.attr('opacity', areaConfigs.opacity.selected)
			.attr('d', this.areaGenerator)
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		this.parent
			.selectAll('path.area')
			.transition('legend-hover-area')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-area'
				})
			)
			.attr('opacity', (d: any) => {
				if (getProperty(d, 0, groupMapsTo) !== hoveredElement.datum().name) {
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
}
