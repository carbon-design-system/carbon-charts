// Internal Imports
import { Tools } from '../../tools';
import {
	Roles,
	Events,
	CartesianOrientations,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';
import { Component } from '../component';

// D3 Imports
import { select } from 'd3-selection';

import { get } from 'lodash-es';

export class Histogram extends Component {
	type = 'histogram';
	renderType = RenderTypes.SVG;

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getComponentContainer();

		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();
		const { groupIdentifier } = options;
		const { groupMapsTo } = options.data;

		const binnedStackedData = this.model.getBinnedStackedData();

		const x = this.services.cartesianScales.getMainXScale();

		// Update data on all bar groups
		const barGroups = svg
			.selectAll('g.bars')
			.data(binnedStackedData, (d) => get(d, `0.${groupMapsTo}`));

		barGroups.exit().attr('opacity', 0).remove();

		// Add bar groups that need to be introduced
		barGroups
			.enter()
			.append('g')
			.classed('bars', true)
			.attr('role', Roles.GROUP);

		// Update data on all bars
		const bars = svg
			.selectAll('g.bars')
			.selectAll('path.bar')
			.data((data) => data);

		// Remove bars that need to be removed
		bars.exit().remove();

		bars.enter()
			.append('path')
			.merge(bars)
			.classed('bar', true)
			.attr(groupIdentifier, (d, i) => i)
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'histogram-bar-update-enter',
					animate,
				})
			)
			.attr('class', (d) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d[groupMapsTo],
					originalClassName: 'bar',
				})
			)
			.style('fill', (d) => this.model.getFillColor(d[groupMapsTo]))
			.attr('d', (d, i) => {
				const bin = get(d, 'data');

				if (!bin) {
					return;
				}

				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const barWidth = x(bin.x1) - x(bin.x0) - 1;
				const x0 = this.services.cartesianScales.getDomainValue(
					bin.x0,
					i
				);
				const x1 = x0 + barWidth;

				const y0 = this.services.cartesianScales.getRangeValue(d[0], i);
				let y1 = this.services.cartesianScales.getRangeValue(d[1], i);

				// Add the divider gap
				if (
					Math.abs(y1 - y0) > 0 &&
					Math.abs(y1 - y0) > options.bars.dividerSize
				) {
					if (
						this.services.cartesianScales.getOrientation() ===
						CartesianOrientations.VERTICAL
					) {
						y1 += 1;
					} else {
						y1 -= 1;
					}
				}

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					this.services.cartesianScales.getOrientation()
				);
			})
			.attr('opacity', 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'bar')
			.attr('aria-label', (d) => d.value);

		// Add event listeners for the above elements
		this.addEventListeners();
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		this.parent
			.selectAll('path.bar')
			.transition(
				this.services.transitions.getTransition('legend-hover-bar')
			)
			.attr('opacity', (d) =>
				d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
			);
	};

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('path.bar')
			.transition(
				this.services.transitions.getTransition('legend-mouseout-bar')
			)
			.attr('opacity', 1);
	};

	addEventListeners() {
		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;

		const self = this;
		this.parent
			.selectAll('path.bar')
			.on('mouseover', function (event, datum) {
				const hoveredElement = select(this);

				hoveredElement.classed('hovered', true);
				hoveredElement.transition(
					self.services.transitions.getTransition(
						'graph_element_mouseover_fill_update'
					)
				);

				const x0 = parseFloat(get(datum, 'data.x0'));
				const x1 = parseFloat(get(datum, 'data.x1'));

				const rangeAxisPosition = self.services.cartesianScales.getRangeAxisPosition();
				const rangeScaleLabel = self.services.cartesianScales.getScaleLabel(
					rangeAxisPosition
				);

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: get(options, 'bins.rangeLabel') || 'Range',
							value: `${x0} – ${x1}`,
						},
						{
							label: options.tooltip.groupLabel || 'Group',
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo],
							}),
						},
						{
							label: rangeScaleLabel,
							value: get(datum, `data.${datum[groupMapsTo]}`),
						},
					],
				});
			})
			.on('mousemove', function (event, datum) {
				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event,
				});
			})
			.on('mouseout', function (event, datum) {
				const hoveredElement = select(this);

				// Select all same group elements
				hoveredElement.classed('hovered', false);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE);
			});
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('path.bar')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null);

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
