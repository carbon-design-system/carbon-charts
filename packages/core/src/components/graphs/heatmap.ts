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
import { min } from 'd3-array';
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

		// Determine padding depending on axes being used
		const axesOptions = Tools.getProperty(this.getOptions(), 'axes');
		if (axesOptions) {
			Object.keys(axesOptions).forEach((axisPosition) => {
				switch (axisPosition) {
					case AxisPositions.TOP:
						this.translationUnits.y =
							Configuration.heatmap.chartPadding;
						break;
					case AxisPositions.BOTTOM:
						this.translationUnits.y = -Configuration.heatmap
							.chartPadding;
						break;
					case AxisPositions.LEFT:
						this.translationUnits.x =
							Configuration.heatmap.chartPadding;
						break;
					case AxisPositions.RIGHT:
						this.translationUnits.x = -Configuration.heatmap
							.chartPadding;
						break;
				}
			});
		}

		// Translate the chart to show the chart axes lines
		const container = svg
			.append('g')
			.attr(
				'transform',
				`translate(${this.translationUnits.x}, ${this.translationUnits.y})`
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

		// Cell highlight box
		this.createOuterBox(
			'g.cell-highlight',
			this.xBandwidth,
			this.yBandwidth
		);
		// Column highlight box
		this.createOuterBox(
			'g.multi-cell.column-highlight',
			this.xBandwidth,
			Math.abs(yRange[1] - yRange[0])
		);
		// Row highlight box
		this.createOuterBox(
			'g.multi-cell.row-highlight',
			Math.abs(xRange[1] - xRange[0]),
			this.yBandwidth
		);

		if (this.determineDividerStatus()) {
			rectangles.style('stroke-width', '1px');
			this.parent.select('g.cell-highlight').classed('cell-2', true);
		}

		this.addEventListener();
	}

	/**
	 * Generates a box using lines to create a hover effect
	 * The lines have drop shadow in their respective direction
	 * @param parentTag - tag name
	 * @param xBandwidth - X length
	 * @param yBandwidth - y length
	 */
	private createOuterBox(parentTag, xBandwidth, yBandwidth) {
		// Create a highlighter in the parent component so the shadow and the lines do not get clipped
		const highlight = DOMUtils.appendOrSelect(this.parent, parentTag)
			.classed('shadows', true)
			.classed('highlighter-hidden', true);

		DOMUtils.appendOrSelect(highlight, 'line.top')
			.attr('x1', 0)
			.attr('x2', xBandwidth);

		DOMUtils.appendOrSelect(highlight, 'line.left')
			.attr('x1', 0)
			.attr('y1', yBandwidth);

		DOMUtils.appendOrSelect(highlight, 'line.down')
			.attr('x1', 0)
			.attr('x2', xBandwidth)
			.attr('y1', yBandwidth)
			.attr('y2', yBandwidth);

		DOMUtils.appendOrSelect(highlight, 'line.right')
			.attr('x1', xBandwidth)
			.attr('x2', xBandwidth)
			.attr('y1', 0)
			.attr('y2', yBandwidth);
	}

	private determineDividerStatus(): boolean {
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
					// Get transformation value of node
					const transform = Tools.getTranformOffsets(
						cell.attr('transform')
					);

					select('g.cell-highlight')
						.attr(
							'transform',
							`translate(${
								transform.x + self.translationUnits.x
							}, ${transform.y + self.translationUnits.y})`
						)
						.classed('highlighter-hidden', false);

					// Dispatch mouse over event
					self.services.events.dispatchEvent(
						Events.Heatmap.HEATMAP_MOUSEOVER,
						{
							event,
							element: hoveredElement,
							datum: datum,
						}
					);

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
								color: hoveredElement.style('fill'),
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

				select('g.cell-highlight').classed('highlighter-hidden', true);

				// Dispatch event and tooltip only if value exists
				if (!nullState) {
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
				}
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
			minimum = 0,
			maximum = 0;

		// Check to see where datum belongs
		if (this.matrix[datum] !== undefined) {
			label = domainLabel;
			// Iterate through Object and get sum, min, and max
			ranges.forEach((element) => {
				let value = this.matrix[datum][element].value || 0;
				sum += value;
				minimum = value < minimum ? value : minimum;
				maximum = value > maximum ? value : maximum;
			});
		} else {
			label = rangeLabel;
			domains.forEach((element) => {
				let value = this.matrix[element][datum].value || 0;
				sum += value;
				minimum = value < minimum ? value : minimum;
				maximum = value > maximum ? value : maximum;
			});
		}

		if (mainXScale(datum) !== undefined) {
			this.parent
				.select('g.multi-cell.column-highlight')
				.classed('highlighter-hidden', false)
				.attr(
					'transform',
					`translate(${
						mainXScale(datum) + this.translationUnits.x
					}, ${min(mainYScale.range()) + this.translationUnits.y})`
				);
		} else if (mainYScale(datum) !== undefined) {
			this.parent
				.select('g.multi-cell.row-highlight')
				.classed('highlighter-hidden', false)
				.attr(
					'transform',
					`translate(${
						min(mainXScale.range()) + this.translationUnits.x
					},${mainYScale(datum) + this.translationUnits.y})`
				);
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
					value: minimum,
				},
				{
					label: 'Max',
					value: maximum,
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
		// Hide column/row
		this.parent
			.selectAll('g.multi-cell')
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
