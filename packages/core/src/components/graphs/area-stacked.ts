// Internal Imports
import { Component } from '../component';
import { Tools } from '../../tools';
import * as Configuration from '../../configuration';
import {
	Roles,
	Events,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';

// D3 Imports
import { area } from 'd3-shape';

export class StackedArea extends Component {
	type = 'area-stacked';
	renderType = RenderTypes.SVG;

	areaGenerator: any;

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct area on legend item hovers
		eventsFragment.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);

		// Un-highlight area on legend item mouseouts
		eventsFragment.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

	render(animate = true) {
		let svg = this.getComponentContainer({ withinChartClip: true });
		const self = this;
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const percentage = Object.keys(options.axes).some(
			(axis) => options.axes[axis].percentage
		);

		const stackedData = this.model.getStackedData({
			percentage,
			groups: this.configs.groups,
		});

		const firstDatum = Tools.getProperty(stackedData, 0, 0);

		// area doesnt have to use the main range and domain axes - they can be mapped to the secondary (in the case of a combo chart)
		// however area _cannot_ have multiple datasets that are mapped to _different_ ranges and domains so we can use the first data item
		const domainAxisPosition = this.services.cartesianScales.getDomainAxisPosition(
			{ firstDatum }
		);
		const rangeAxisPosition = this.services.cartesianScales.getRangeAxisPosition(
			{ firstDatum }
		);
		const mainYScale = this.services.cartesianScales.getScaleByPosition(
			rangeAxisPosition
		);

		const areas = svg
			.selectAll('path.area')
			.data(stackedData, (d) => Tools.getProperty(d, 0, groupMapsTo));

		// D3 area generator function
		this.areaGenerator = area()
			.x((d: any, i) =>
				this.services.cartesianScales.getValueThroughAxisPosition(
					domainAxisPosition,
					d.data.sharedStackKey,
					i
				)
			)
			.y0((d) => mainYScale(d[0]))
			.y1((d) => mainYScale(d[1]))
			.curve(this.services.curves.getD3Curve());

		areas.exit().attr('opacity', 0).remove();

		const enteringAreas = areas.enter().append('path').attr('opacity', 0);

		enteringAreas
			.merge(areas)
			.data(stackedData, (d) => Tools.getProperty(d, 0, groupMapsTo))
			.attr('class', 'area')
			.attr('class', (d) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: Tools.getProperty(d, 0, groupMapsTo),
					originalClassName: 'area',
				})
			)
			.style('fill', (d) =>
				self.model.getFillColor(Tools.getProperty(d, 0, groupMapsTo))
			)
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'area')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'area-update-enter',
					animate,
				})
			)
			.attr('opacity', Configuration.area.opacity.selected)
			.attr('d', this.areaGenerator);
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		this.parent
			.selectAll('path.area')
			.transition(
				this.services.transitions.getTransition('legend-hover-area')
			)
			.attr('opacity', (d) => {
				if (
					Tools.getProperty(d, 0, groupMapsTo) !==
					hoveredElement.datum().name
				) {
					return Configuration.area.opacity.unselected;
				}

				return Configuration.area.opacity.selected;
			});
	};

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.area')
			.transition(
				this.services.transitions.getTransition('legend-mouseout-area')
			)
			.attr('opacity', Configuration.area.opacity.selected);
	};
}
