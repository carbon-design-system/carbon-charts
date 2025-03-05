import { select } from 'd3'
import * as Events from '@/interfaces/events'
import { GeoProjection } from '@/components/essentials/geo-projection'
import { ChoroplethModel } from '@/model'
import { getProperty } from '@/tools'

export class Choropleth extends GeoProjection {
	type = 'choropleth'

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		super.render()
		const data = (this.model as ChoroplethModel).getCombinedData()
		const svg = this.getComponentContainer({ ariaLabel: 'map', withinChartClip: true })

		const colorOptions = getProperty(this.getOptions(), 'color')
		const customColors = getProperty(colorOptions, 'gradient', 'colors')

		const geo = svg.select('g.geo')
		geo
			.selectAll('path')
			.classed('border', true)
			.attr('class', (d: any) => {
				return this.model.getColorClassName({
					value: data[d.properties.NAME].value,
					originalClassName: `border`
				})
			})
			.attr('style', (d: any) => {
				if (customColors) {
					return `fill: ${this.model.getColorClassName({
						value: data[d.properties.NAME].value
					})}`
				}

				return null
			})

		this.addCountryAreaEventListener()
	}

	addCountryAreaEventListener() {
		const self = this
		const data = (this.model as ChoroplethModel).getCombinedData()

		this.parent
			.selectAll('path.border')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse over event
				self.services.events.dispatchEvent(Events.Choropleth.CHOROPLETH_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum: data[datum.properties.NAME]
				})

				// Dispatch tooltip show event
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: datum.properties.NAME,
							value: data[datum.properties.NAME].value
						}
					]
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(Events.Choropleth.CHOROPLETH_MOUSEMOVE, {
					event,
					element: select(this),
					datum: data[datum.properties.NAME]
				})
				// Dispatch tooltip move event
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse click event
				self.services.events.dispatchEvent(Events.Choropleth.CHOROPLETH_CLICK, {
					event,
					element: select(this),
					datum: data[datum.properties.NAME]
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse out event
				self.services.events.dispatchEvent(Events.Choropleth.CHOROPLETH_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum: data[datum.properties.NAME]
				})

				// Dispatch hide tooltip event
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					event,
					hoveredElement
				})
			})
	}
}
