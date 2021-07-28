// Internal Imports
import { Component } from '../component';
import * as Configuration from '../../configuration';
import {
	Roles,
	Events,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
import { line } from 'd3-shape';

export class Line extends Component {
	type = 'line';
	renderType = RenderTypes.SVG;

	init() {
		const { events } = this.services;
		// Highlight correct line legend item hovers
		events.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

	render(animate = true) {
		const svg = this.getComponentContainer({ withinChartClip: true });
		const { cartesianScales, curves } = this.services;

		const getDomainValue = (d, i) => cartesianScales.getDomainValue(d, i);
		const getRangeValue = (d, i) => cartesianScales.getRangeValue(d, i);
		const [
			getXValue,
			getYValue,
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		);
		const options = this.getOptions();

		// D3 line generator function
		const lineGenerator = line()
			.x(getXValue)
			.y(getYValue)
			.curve(curves.getD3Curve())
			.defined((datum: any, i) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(
					datum
				);
				const value = datum[rangeIdentifier];
				if (value === null || value === undefined) {
					return false;
				}
				return true;
			});

		let data = [];
		if (this.configs.stacked) {
			const percentage = Object.keys(options.axes).some(
				(axis) => options.axes[axis].percentage
			);
			const { groupMapsTo } = options.data;
			const stackedData = this.model.getStackedData({
				groups: this.configs.groups,
				percentage,
			});

			data = stackedData.map((d) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(
					d
				);
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
					d
				);
				return {
					name: Tools.getProperty(d, 0, groupMapsTo),
					data: d.map((datum) => ({
						[domainIdentifier]: datum.data.sharedStackKey,
						[groupMapsTo]: datum[groupMapsTo],
						[rangeIdentifier]: datum[1],
					})),
					hidden: !Tools.some(d, (datum) => datum[0] !== datum[1]),
				};
			});
		} else {
			data = this.model.getGroupedData(this.configs.groups);
		}

		// Update the bound data on lines
		const lines = svg
			.selectAll('path.line')
			.data(data, (group) => group.name);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		lines.exit().attr('opacity', 0).remove();

		// Add lines that need to be introduced
		const enteringLines = lines
			.enter()
			.append('path')
			.classed('line', true)
			.attr('opacity', 0);

		// Apply styles and datum
		enteringLines
			.merge(lines)
			.data(data, (group) => group.name)
			.attr('class', (group) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: group.name,
					originalClassName: 'line',
				})
			)
			.style('stroke', (group) => this.model.getStrokeColor(group.name))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'line')
			.attr('aria-label', (group) => {
				const { data: groupData } = group;
				return groupData
					.map((datum) => {
						const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
							datum
						);
						return datum[rangeIdentifier];
					})
					.join(',');
			})
			// Transition
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'line-update-enter',
					animate,
				})
			)
			.attr('opacity', (d) => (d.hidden ? 0 : 1))
			.attr('d', (group) => {
				const { data: groupData } = group;
				return lineGenerator(groupData);
			});
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent
			.selectAll('path.line')
			.transition(
				this.services.transitions.getTransition('legend-hover-line')
			)
			.attr('opacity', (group) => {
				if (group.name !== hoveredElement.datum()['name']) {
					return Configuration.lines.opacity.unselected;
				}

				return Configuration.lines.opacity.selected;
			});
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('path.line')
			.transition(
				this.services.transitions.getTransition('legend-mouseout-line')
			)
			.attr('opacity', Configuration.lines.opacity.selected);
	};

	destroy() {
		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}
}
