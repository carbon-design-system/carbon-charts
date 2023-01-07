// Internal Imports
import { Events } from '../../interfaces';
import { GeoProjection } from '../essentials/geo-projection';

// D3 imports
import { select } from 'd3-selection';

export class Choropleth extends GeoProjection {
	type = 'choropleth';

	render(animate = true) {
		super.render();
		const data = this.model.getCombinedData();
		const svg = this.getComponentContainer({ withinChartClip: true });

		const geo = svg.select('g.geo');
		geo.selectAll('path')
			.classed('border', true)
			.attr('class', (d) => {
				return this.model.getColorClassName({
					value: data[d.properties.NAME].value,
					originalClassName: `border`,
				});
			})
			.classed('missing-data', (d) => {
				if (data[d.properties.NAME].value) {
					return false;
				}
				return true;
			});

		this.addCountryAreaEventListener();
	}

	addCountryAreaEventListener() {
		const self = this;
		const data = this.model.getCombinedData();

		this.parent
			.selectAll('path.border')
			.on('mouseover', function (event, datum) {
				const hoveredElement = select(this);

				// Dispatch mouse over event
				self.services.events.dispatchEvent(
					Events.Choropleth.CHOROPLETH_MOUSEOVER,
					{
						event,
						element: hoveredElement,
						datum: data[datum.properties.NAME],
					}
				);

				// Dispatch tooltip show event
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: datum.properties.NAME,
							value: data[datum.properties.NAME].value,
						},
					],
				});
			})
			.on('mousemove', function (event, datum) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(
					Events.Choropleth.CHOROPLETH_MOUSEMOVE,
					{
						event,
						element: select(this),
						datum: data[datum.properties.NAME],
					}
				);
				// Dispatch tooltip move event
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event,
				});
			})
			.on('click', function (event, datum) {
				// Dispatch mouse click event
				self.services.events.dispatchEvent(
					Events.Choropleth.CHOROPLETH_CLICK,
					{
						event,
						element: select(this),
						datum: data[datum.properties.NAME],
					}
				);
			})
			.on('mouseout', function (event, datum) {
				const hoveredElement = select(this);

				// Dispatch mouse out event
				self.services.events.dispatchEvent(
					Events.Choropleth.CHOROPLETH_MOUSEOUT,
					{
						event,
						element: hoveredElement,
						datum: data[datum.properties.NAME],
					}
				);

				// Dispatch hide tooltip event
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					event,
					hoveredElement,
				});
			});
	}
}
