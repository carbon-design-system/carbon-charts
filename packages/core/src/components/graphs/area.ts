// Internal Imports
import { Component } from '../component';
import * as Configuration from '../../configuration';
import {
	CartesianOrientations,
	Events,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';
import { GradientUtils } from '../../services';
import { Tools } from '../../tools';

// D3 Imports
import { area } from 'd3-shape';
import { select } from 'd3-selection';

export class Area extends Component {
	type = 'area';
	renderType = RenderTypes.SVG;

	gradient_id = 'gradient-id-' + Math.floor(Math.random() * 99999999999);

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
		const svg = this.getComponentContainer({ withinChartClip: true });
		let domain = [0, 0];

		const { cartesianScales } = this.services;

		const orientation = cartesianScales.getOrientation();
		const areaGenerator = area()
			.curve(this.services.curves.getD3Curve())
			.defined((datum: any, i) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier();
				const value = datum[rangeIdentifier];
				if (value === null || value === undefined) {
					return false;
				}
				return true;
			});

		// Update the bound data on area groups
		const groupedData = this.model.getGroupedData(this.configs.groups);

		const bounds = Tools.getProperty(this.getOptions(), 'bounds');
		const boundsEnabled = bounds && groupedData && groupedData.length === 1;

		if (!boundsEnabled && bounds) {
			console.warn(
				`Bounds can only be shown when having 1 single datagroup, you've supplied ${groupedData.length}`
			); // eslint-disable-line no-console
		}

		const upperBound = (d, i) =>
			boundsEnabled
				? cartesianScales.getBoundedScaledValues(d, i)[0]
				: cartesianScales.getRangeValue(0);

		const lowerBound = (d, i) =>
			boundsEnabled
				? cartesianScales.getBoundedScaledValues(d, i)[1]
				: cartesianScales.getRangeValue(d, i);

		if (orientation === CartesianOrientations.VERTICAL) {
			domain = this.services.cartesianScales.getMainYScale().domain();
			areaGenerator
				.x((d, i) => cartesianScales.getDomainValue(d, i))
				.y0((d, i) => upperBound(d, i))
				.y1((d, i) => lowerBound(d, i));
		} else {
			domain = this.services.cartesianScales.getMainXScale().domain();
			areaGenerator
				.x0((d, i) => upperBound(d, i))
				.x1((d, i) => lowerBound(d, i))
				.y((d, i) => cartesianScales.getDomainValue(d, i));
		}

		// Is gradient enabled or not
		const isGradientEnabled = Tools.getProperty(
			this.getOptions(),
			'color',
			'gradient',
			'enabled'
		);

		// Should gradient style be applicable
		const isGradientAllowed =
			groupedData && groupedData.length === 1 && isGradientEnabled;

		if (groupedData.length > 1 && isGradientEnabled) {
			console.error(
				'Gradients can only be enabled when having 1 single dataset'
			);
		}

		const areas = svg
			.selectAll('path.area')
			.data(groupedData, (group) => group.name);

		const chartMainContainer = select(
			this.services.domUtils.getMainContainer()
		);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areas.exit().attr('opacity', 0).remove();

		// if there is no grouped data (if all data groups are turned OFF with legend which can happen in the case of combo charts)
		if (!groupedData.length) {
			return;
		}

		if (isGradientAllowed) {
			// The fill value of area has been overwritten, get color value from stroke color class instead
			const strokePathElement = chartMainContainer
				.select(
					`path.${this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.STROKE],
						dataGroupName: groupedData[0].name,
					})}`
				)
				.node();

			let colorValue;
			if (strokePathElement) {
				colorValue = getComputedStyle(
					strokePathElement as HTMLElement,
					null
				).getPropertyValue('stroke');
			} else {
				const sparklineColorObject = Tools.getProperty(
					this.model.getOptions(),
					'color',
					'scale'
				);

				if (sparklineColorObject !== null) {
					const sparklineColorObjectKeys = Object.keys(
						sparklineColorObject
					);
					colorValue =
						sparklineColorObject[sparklineColorObjectKeys[0]];
				}
			}
			GradientUtils.appendOrUpdateLinearGradient({
				svg: this.parent,
				id:
					groupedData[0].name.replace(' ', '') +
					'_' +
					this.gradient_id,
				x1: '0%',
				x2: '0%',
				y1: '0%',
				y2: '100%',
				stops: GradientUtils.getStops(domain, colorValue),
			});
		} else {
			// make sure there is no linearGradient if no gradient is allowed
			if (!this.parent.selectAll('defs linearGradient').empty()) {
				this.parent.selectAll('defs linearGradient').each(function () {
					this.parentNode.remove();
				});
			}
		}

		const self = this;

		// Enter paths that need to be introduced
		const enteringAreas = areas.enter().append('path');
		if (isGradientAllowed) {
			enteringAreas
				.merge(areas)
				.style(
					'fill',
					(group) =>
						`url(#${group.name.replace(' ', '')}_${
							this.gradient_id
						})`
				)
				.attr('class', 'area')
				.attr('class', (group) =>
					this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.FILL],
						dataGroupName: group.name,
						originalClassName: 'area',
					})
				)
				.attr('d', (group) => {
					const { data } = group;
					return areaGenerator(data);
				});
		} else {
			enteringAreas
				.attr('opacity', 0)
				.merge(areas)
				.attr('class', 'area')
				.attr('class', (group) =>
					this.model.getColorClassName({
						classNameTypes: [
							ColorClassNameTypes.FILL,
							ColorClassNameTypes.STROKE,
						],
						dataGroupName: group.name,
						originalClassName: 'area',
					})
				)
				.style('fill', (group) => self.model.getFillColor(group.name))
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'area-update-enter',
						animate,
					})
				)
				.attr(
					'opacity',
					boundsEnabled ? 1 : Configuration.area.opacity.selected
				)
				.attr('d', (group) => {
					const { data } = group;
					return areaGenerator(data);
				});

			if (boundsEnabled) {
				enteringAreas
					.attr('fill-opacity', Configuration.area.opacity.selected)
					.style('stroke', (group) =>
						self.model.getStrokeColor(group.name)
					)
					.style('stroke-dasharray', '2, 2')
					.attr('stroke-width', 0.7 + 'px');
			}
		}
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent
			.selectAll('path.area')
			.transition(
				this.services.transitions.getTransition('legend-hover-area')
			)
			.attr('opacity', (group) => {
				if (group.name !== hoveredElement.datum()['name']) {
					return Configuration.area.opacity.unselected;
				}

				return Configuration.area.opacity.selected;
			});
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('path.area')
			.transition(
				this.services.transitions.getTransition('legend-mouseout-area')
			)
			.attr('opacity', Configuration.area.opacity.selected);
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
