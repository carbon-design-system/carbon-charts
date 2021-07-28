// Internal Imports
import { Component } from '../component';
import {
	Events,
	Roles,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';
import { Tools } from '../../tools';
import { DOMUtils } from '../../services';

// D3 Imports
import { select } from 'd3-selection';

export class Bullet extends Component {
	type = 'bullet';
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
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		const data = this.model.getDisplayData(this.configs.groups);

		const rangeScale = this.services.cartesianScales.getRangeScale();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
		const [rangeScaleStart, rangeScaleEnd] = rangeScale.range();
		const [rangeScaleDomainMin, rangeScaleDomainMax] = rangeScale.domain();

		const renderRangeBoxes = () => {
			const rangeBoxData = [];
			data.forEach((datum) => {
				if (datum.ranges) {
					datum.ranges.forEach((range, i) => {
						if (
							range !== null &&
							range !== undefined &&
							range < rangeScaleDomainMax
						) {
							rangeBoxData.push({
								datum,
								value: range,
								order: i + 1,
							});
						}
					});
				} else {
					rangeBoxData.push({
						datum,
						order: 1,
					});
				}
			});

			// Update data on all lines
			const rangeBoxes = DOMUtils.appendOrSelect(svg, 'g.range-boxes')
				.selectAll('path.range-box')
				.data(
					rangeBoxData,
					(datum) => `${datum[groupMapsTo]}-${datum.order}`
				);

			// Remove lines that are no longer needed
			rangeBoxes.exit().attr('opacity', 0).remove();

			// Add the paths that need to be introduced
			const rangeBoxesEnter = rangeBoxes
				.enter()
				.append('path')
				.attr('opacity', 0);

			rangeBoxesEnter
				.merge(rangeBoxes)
				.attr('class', (d) => `range-box order-${d.order}`)
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-range-box-update-enter',
						animate,
					})
				)
				.attr('d', (d, i) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					const lineHeight = 16;

					let x0, x1, y0, y1;
					if (d.order === 1) {
						x0 =
							this.services.cartesianScales.getDomainValue(
								d.datum,
								i
							) -
							lineHeight / 2;
						x1 = x0 + lineHeight;
						y0 = rangeScaleEnd - 2;
						y1 = rangeScaleStart + 1;
					} else {
						x0 =
							this.services.cartesianScales.getDomainValue(
								d.datum,
								i
							) -
							lineHeight / 2;
						x1 = x0 + lineHeight;
						y0 = this.services.cartesianScales.getRangeValue(
							d.value,
							i
						);
						y1 = rangeScaleEnd;
					}

					return Tools.generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					);
				})
				.attr('opacity', 1);
		};

		const renderBars = () => {
			// Update data on all bars
			const bars = DOMUtils.appendOrSelect(svg, 'g.bars')
				.selectAll('path.bar')
				.data(data, (datum) => datum[groupMapsTo]);

			// Remove bars that are no longer needed
			bars.exit().attr('opacity', 0).remove();

			// Add the paths that need to be introduced
			const barsEnter = bars.enter().append('path').attr('opacity', 0);

			barsEnter
				.merge(bars)
				.classed('bar', true)
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-bar-update-enter',
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
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					const barWidth = 8;
					const x0 =
						this.services.cartesianScales.getDomainValue(d, i) -
						barWidth / 2;
					const x1 = x0 + barWidth;
					const y0 =
						this.services.cartesianScales.getRangeValue(0) + 1;
					const y1 = this.services.cartesianScales.getRangeValue(
						d,
						i
					);

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
		};

		const renderTargetLines = () => {
			// Update data on all lines
			const lines = DOMUtils.appendOrSelect(svg, 'g.markers')
				.selectAll('path.marker')
				.data(
					data.filter((d) => Tools.getProperty(d, 'marker') !== null),
					(datum) => datum[groupMapsTo]
				);

			// Remove lines that are no longer needed
			lines.exit().attr('opacity', 0).remove();

			// Add the paths that need to be introduced
			const linesEnter = lines.enter().append('path').attr('opacity', 0);

			linesEnter
				.merge(lines)
				.classed('marker', true)
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-marker-update-enter',
						animate,
					})
				)
				.attr('d', (d, i) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					const lineHeight = 24;
					const x0 =
						this.services.cartesianScales.getDomainValue(d, i) -
						lineHeight / 2;
					const x1 = x0 + lineHeight;
					const y0 = this.services.cartesianScales.getRangeValue(
						d.marker,
						i
					);
					const y1 = y0;

					return Tools.generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					);
				})
				.attr('opacity', 1);
		};

		const renderTargetQuartiles = () => {
			let quartilesData = [];
			data.filter((d) => Tools.getProperty(d, 'marker') !== null).forEach(
				(d) => {
					const value = d.marker;
					const barValue = d[rangeIdentifier];

					quartilesData = quartilesData.concat([
						{ datum: d, value: value * 0.25, barValue },
						{ datum: d, value: value * 0.5, barValue },
						{ datum: d, value: value * 0.75, barValue },
					]);
				}
			);

			// Update data on all lines
			const lines = DOMUtils.appendOrSelect(svg, 'g.quartiles')
				.selectAll('path.quartile')
				.data(quartilesData, (datum) => datum[groupMapsTo]);

			// Remove lines that are no longer needed
			lines.exit().attr('opacity', 0).remove();

			// Add the paths that need to be introduced
			const linesEnter = lines.enter().append('path').attr('opacity', 0);

			linesEnter
				.merge(lines)
				.attr('class', (d) => {
					return `quartile ${
						d.value <= d.barValue ? 'over-bar' : ''
					}`;
				})
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'bullet-quartile-update-enter',
						animate,
					})
				)
				.attr('d', ({ datum: d, value }, i) => {
					/*
					 * Orientation support for horizontal/vertical bar charts
					 * Determine coordinates needed for a vertical set of paths
					 * to draw the bars needed, and pass those coordinates down to
					 * generateSVGPathString() to decide whether it needs to flip them
					 */
					let lineHeight = 4;
					// if it lines up with a performance area border
					// make the line taller
					if (d.ranges && d.ranges.indexOf(value) !== -1) {
						lineHeight = 8;
					}

					const x0 =
						this.services.cartesianScales.getDomainValue(d, i) -
						lineHeight / 2;
					const x1 = x0 + lineHeight;
					const y0 = this.services.cartesianScales.getRangeValue(
						value,
						i
					);
					const y1 = y0;

					return Tools.generateSVGPathString(
						{ x0, x1, y0, y1 },
						this.services.cartesianScales.getOrientation()
					);
				})
				.attr('opacity', 1);
		};

		renderRangeBoxes();
		renderBars();
		renderTargetLines();
		renderTargetQuartiles();

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;
		const { groupMapsTo } = this.getOptions().data;

		this.parent
			.selectAll('path.bar')
			.transition(
				this.services.transitions.getTransition(
					'legend-hover-simple-bar'
				)
			)
			.attr('opacity', (d) =>
				d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
			);
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('path.bar')
			.transition(
				this.services.transitions.getTransition(
					'legend-mouseout-simple-bar'
				)
			)
			.attr('opacity', 1);
	};

	getMatchingRangeIndexForDatapoint(datum) {
		let matchingRangeIndex;
		for (let i = datum.ranges.length - 1; i > 0; i--) {
			const range = datum.ranges[i];
			if (datum.value >= range) {
				matchingRangeIndex = i;

				return matchingRangeIndex;
			}
		}

		return 0;
	}

	addEventListeners() {
		const self = this;

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

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

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum,
				});

				const performanceAreaTitles = Tools.getProperty(
					options,
					'bullet',
					'performanceAreaTitles'
				);
				const matchingRangeIndex = self.getMatchingRangeIndexForDatapoint(
					datum
				);

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: options.tooltip.groupLabel || 'Group',
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo],
							}),
						},
						{
							label: 'Value',
							value: datum[rangeIdentifier],
						},
						{
							label: 'Target',
							value: datum.marker,
						},
						{
							label: 'Percentage',
							value: `${Math.floor(
								(datum[rangeIdentifier] / datum.marker) * 100
							)}%`,
						},
						{
							label: 'Performance',
							value: performanceAreaTitles[matchingRangeIndex],
						},
					],
				});
			})
			.on('mousemove', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEMOVE, {
					event,
					element: select(this),
					datum,
				});

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event,
				});
			})
			.on('click', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_CLICK, {
					event,
					element: select(this),
					datum,
				});
			})
			.on('mouseout', function (event, datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', false);

				hoveredElement.transition(
					self.services.transitions.getTransition(
						'graph_element_mouseout_fill_update'
					)
				);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum,
				});

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});
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
