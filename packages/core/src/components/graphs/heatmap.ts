// Internal Imports
import { Component } from '../component';
import * as Configuration from '../../configuration';
import {
	Events,
	RenderTypes,
	DividerStatus,
	AxisPositions,
} from '../../interfaces';
import { Tools } from '../../tools';
import { DOMUtils } from '../../services';

import { get } from 'lodash-es';

// D3 Imports
import { select } from 'd3-selection';

export class Heatmap extends Component {
	type = 'heatmap';
	renderType = RenderTypes.SVG;

	private matrix = {};
	private xBandwidth = 0;
	private yBandwidth = 0;
	private translationUnits = {
		x: 0,
		y: 0,
	};

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct cells on Axis item hovers
		eventsFragment.addEventListener(
			Events.Axis.LABEL_MOUSEOVER,
			this.handleAxisOnHover
		);

		// Highlight correct cells on Axis item mouseouts
		eventsFragment.addEventListener(
			Events.Axis.LABEL_MOUSEOUT,
			this.handleAxisMouseOut
		);

		// Highlight correct cells on Axis item focus
		eventsFragment.addEventListener(
			Events.Axis.LABEL_FOCUS,
			this.handleAxisOnHover
		);

		// Highlight correct cells on Axis item  blur
		eventsFragment.addEventListener(
			Events.Axis.LABEL_BLUR,
			this.handleAxisMouseOut
		);
	}

	render(animate = true) {
		// svg and container widths
		const svg = this.getComponentContainer();

		const { cartesianScales } = this.services;
		this.matrix = this.model.getMatrix();

		svg.html('');

		// determine x and y axis scale
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const rangeIdentifier = cartesianScales.getRangeIdentifier();

		// Get unique axis values & create a matrix
		const uniqueDomain = this.model.getUniqueDomain();
		const uniqueRange = this.model.getUniqueRanges();

		// Get matrix in the form of an array to create a single heatmap group
		const matrixArray = this.model.getMatrixAsArray();

		// Get available chart area
		const xRange = mainXScale.range();
		const yRange = mainYScale.range();

		// Determine rectangle dimensions based on the number of unique domain and range
		this.xBandwidth = Math.abs(
			(xRange[1] - xRange[0]) / uniqueDomain.length
		);
		this.yBandwidth = Math.abs(
			(yRange[1] - yRange[0]) / uniqueRange.length
		);

		// Add padding around chart so the axes lines display
		const axesOptions = Tools.getProperty(this.getOptions(), 'axes');
		if (axesOptions) {
			Object.keys(axesOptions).forEach((axisPosition) => {
				switch (axisPosition) {
					case AxisPositions.TOP:
						this.translationUnits[1] =
							Configuration.heatmap.chartPadding;
						break;
					case AxisPositions.BOTTOM:
						this.translationUnits[1] = -Configuration.heatmap
							.chartPadding;
						break;
					case AxisPositions.LEFT:
						this.translationUnits[0] =
							Configuration.heatmap.chartPadding;
						break;
					case AxisPositions.RIGHT:
						this.translationUnits[0] = -Configuration.heatmap
							.chartPadding;
						break;
				}
			});
		}

		const container = svg
			.append('g')
			.attr(
				'transform',
				`translate(${this.translationUnits[0]}, ${this.translationUnits[1]})`
			);

		const rectangles = container
			.selectAll()
			.data(matrixArray)
			.enter()
			.append('g')
			.attr('class', (d) => `heat-${d.index}`)
			.classed('cell', true)
			.attr(
				'transform',
				(d) =>
					`translate(${mainXScale(d[domainIdentifier])}, ${mainYScale(
						d[rangeIdentifier]
					)})`
			)
			.append('rect')
			.attr('class', (d) => {
				return this.model.getColorClassName({
					value: d.value,
					originalClassName: `heat-${d.index}`,
				});
			})
			.classed('heat', true)
			.classed('null-state', (d) =>
				d.index === -1 || d.value === null ? true : false
			)
			.attr('width', this.xBandwidth)
			.attr('height', this.yBandwidth)
			.style('fill', (d) => {
				// Check if a valid value exists
				if (d.index === -1 || d.value === null) {
					return null;
				}
				return this.model.getFillColor(Number(d.value));
			})
			.attr('aria-label', (d) => d.value);

		rectangles.exit().remove();

		const rowAndColumnShadow = container
			.append('g')
			.classed('shadow-holder', true);

		// Row
		rowAndColumnShadow
			.append('rect')
			.classed('highlighter-hidden', true)
			.classed('shadow-row', true)
			.attr('x', xRange[0])
			.attr('y', 0)
			.attr('width', Math.abs(xRange[1] - xRange[0]))
			.attr('height', this.yBandwidth);

		rowAndColumnShadow
			.append('rect')
			.classed('highlighter-hidden', true)
			.classed('shadow-column', true)
			.attr('x', xRange[0])
			.attr('y', 0)
			.attr('width', this.xBandwidth)
			.attr('height', Math.abs(yRange[1] - yRange[0]));

		const parent = DOMUtils.appendOrSelect(
			this.parent,
			'g.row-column-highlighter'
		);

		DOMUtils.appendOrSelect(parent, 'rect.highlight-row')
			.classed('highlighter-hidden', true)
			.classed('highlight-row', true)
			.attr('x', xRange[0])
			.attr('y', 0)
			.attr('width', Math.abs(xRange[1] - xRange[0]))
			.attr('height', this.yBandwidth);

		DOMUtils.appendOrSelect(parent, 'rect.highlight-column')
			.classed('highlighter-hidden', true)
			.attr('x', xRange[0])
			.attr('y', 0)
			.attr('width', this.xBandwidth)
			.attr('height', Math.abs(yRange[1] - yRange[0]));

		if (this.determineDividerStatus()) {
			rectangles.style('stroke-width', '1px');
		}

		this.addEventListener();
	}

	determineDividerStatus(): boolean {
		// Add dividers if status is not off, will assume auto or on by default.
		const dividerStatus = Tools.getProperty(
			this.getOptions(),
			'heatmap',
			'divider',
			'state'
		);

		// Determine if cell divider should be displayed
		if (dividerStatus !== DividerStatus.OFF) {
			if (
				(dividerStatus === DividerStatus.AUTO &&
					Configuration.heatmap.minCellDividerDimension <=
						this.xBandwidth &&
					Configuration.heatmap.minCellDividerDimension <=
						this.yBandwidth) ||
				dividerStatus === DividerStatus.ON
			) {
				return true;
			}
		}

		return false;
	}

	addEventListener() {
		const self = this;
		const { cartesianScales } = this.services;
		const options = this.getOptions();
		const totalLabel = get(options, 'tooltip.totalLabel');
		// Add dividers if status is not off, will presume auto or on by default.
		const dividerStatus = Tools.getProperty(
			options,
			'heatmap',
			'divider',
			'state'
		);

		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const rangeIdentifier = cartesianScales.getRangeIdentifier();

		const domainLabel = cartesianScales.getDomainLabel();
		const rangeLabel = cartesianScales.getRangeLabel();

		this.parent
			.selectAll('g.cell')
			.on('mouseover', function (event, datum) {
				const cell = select(this);
				const hoveredElement = cell.select('rect.heat');
				const nullState = hoveredElement.classed('null-state');

				// Dispatch event and tooltip only if value exists
				if (!nullState) {
					const fillColor = hoveredElement.style('fill');

					// Dispatch mouse over event
					self.services.events.dispatchEvent(
						Events.Heatmap.HEATMAP_MOUSEOVER,
						{
							event,
							element: hoveredElement,
							datum: datum,
						}
					);

					cell.raise();

					// Highlight element
					hoveredElement
						.style(
							'stroke-width',
							hoveredElement.style('stroke-width') === '1px'
								? '2px'
								: '1px'
						)
						.classed('raised', true);

					// Dispatch tooltip show event
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						items: [
							{
								label: domainLabel,
								value: datum[domainIdentifier],
							},
							{
								label: rangeLabel,
								value: datum[rangeIdentifier],
							},
							{
								label: totalLabel || 'Total',
								value: datum['value'],
								color: fillColor,
							},
						],
					});
				}
			})
			.on('mousemove', function (event, datum) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(
					Events.Heatmap.HEATMAP_MOUSEMOVE,
					{
						event,
						element: select(this),
						datum: datum,
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
					Events.Heatmap.HEATMAP_CLICK,
					{
						event,
						element: select(this),
						datum: datum,
					}
				);
			})
			.on('mouseout', function (event, datum) {
				const cell = select(this);
				const hoveredElement = cell.select('rect.heat');
				const nullState = hoveredElement.classed('null-state');
				hoveredElement.classed('raised', false);
				cell.lower();

				if (self.determineDividerStatus() && !nullState) {
					hoveredElement.style('stroke-width', '1px');
				} else {
					hoveredElement
						.style('stroke', 'none')
						.style('stroke-width', '0px');
				}

				// Dispatch mouse out event
				self.services.events.dispatchEvent(
					Events.Heatmap.HEATMAP_MOUSEOUT,
					{
						event,
						element: hoveredElement,
						datum: datum,
					}
				);

				// Dispatch hide tooltip event
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					event,
					hoveredElement,
				});
			});
	}

	// Highlight elements that match the hovered axis item
	handleAxisOnHover = (event: CustomEvent) => {
		const { detail } = event;
		const { datum } = detail;
		// Unique ranges and domains
		const ranges = this.model.getUniqueRanges();
		const domains = this.model.getUniqueDomain();
		// Labels
		const domainLabel = this.services.cartesianScales.getDomainLabel();
		const rangeLabel = this.services.cartesianScales.getRangeLabel();
		// Scales
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		let label = '',
			sum = 0,
			min = 0,
			max = 0;
		const ids = [];

		// Check to see where datum belongs
		if (this.matrix[datum] !== undefined) {
			label = domainLabel;
			// Iterate through Object and get sum, min, and max
			ranges.forEach((element) => {
				let value = this.matrix[datum][element].value || 0;
				sum += value;
				min = value < min ? value : min;
				max = value > max ? value : max;
				const id = this.matrix[datum][element].index;
				if (id >= 0) {
					ids.push(`g.heat-${id}`);
				}
			});
		} else {
			label = rangeLabel;
			domains.forEach((element) => {
				let value = this.matrix[element][datum].value || 0;
				sum += value;
				min = value < min ? value : min;
				max = value > max ? value : max;
				const id = this.matrix[element][datum].index;
				if (id >= 0) {
					ids.push(`g.heat-${id}`);
				}
			});
		}

		// Show the outlines to make the cells appear grouped
		const shadowHighlighter = this.parent.select('g.shadow-holder').raise();
		// Pop out cells
		this.parent
			.selectAll(ids.join(','))
			.classed('axis-hovered', true)
			.raise();

		if (mainXScale(datum) !== undefined) {
			shadowHighlighter
				.select('rect.shadow-column')
				.classed('highlighter-hidden', false)
				.attr('x', mainXScale(datum) + this.translationUnits[0])
				.raise();

			this.parent
				.select('g.row-column-highlighter')
				.select('rect.highlight-column')
				.classed('highlighter-hidden', false)
				.attr('x', mainXScale(datum) + this.translationUnits[0])
				.raise();
		} else if (mainYScale(datum) !== undefined) {
			shadowHighlighter
				.select('rect.shadow-row')
				.classed('highlighter-hidden', false)
				.attr('y', mainXScale(datum) + this.translationUnits[1])
				.raise();

			this.parent
				.select('g.row-column-highlighter')
				.select('rect.highlight-row')
				.classed('highlighter-hidden', false)
				.attr('y', mainXScale(datum) + this.translationUnits[1])
				.raise();
		}

		// Dispatch tooltip show event
		this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
			event: detail.event,
			hoveredElement: select(event.detail.element),
			items: [
				{
					label: label,
					value: datum,
					bold: true,
				},
				{
					label: 'Min',
					value: min,
				},
				{
					label: 'Max',
					value: max,
				},
				{
					label: 'Average',
					value: sum / domains.length,
				},
			],
		});
	};

	// Un-highlight all elements
	handleAxisMouseOut = (event: CustomEvent) => {
		// Hide shadow
		this.parent
			.selectAll('rect.shadow-column,rect.shadow-row')
			.classed('highlighter-hidden', true);

		// Lower cells
		this.parent
			.selectAll('.axis-hovered')
			.classed('axis-hovered', false)
			.lower();

		// Hide row/column highlighting
		const strokeHighlighter = this.parent
			.selectAll('g.row-column-highlighter')
			.selectAll('rect.highlight-column, rect.highlight-row')
			.classed('highlighter-hidden', true);

		// Dispatch hide tooltip event
		this.services.events.dispatchEvent(Events.Tooltip.HIDE, {
			event,
		});
	};

	// Remove event listeners
	destroy() {
		this.parent
			.selectAll('rect.heat')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('click', null)
			.on('mouseout', null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleAxisOnHover
		);
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleAxisMouseOut
		);
	}
}
