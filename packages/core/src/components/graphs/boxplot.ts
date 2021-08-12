// Internal Imports
import { Component } from '../component';
import {
	CartesianOrientations,
	ColorClassNameTypes,
	Events,
	RenderTypes,
	Roles,
} from '../../interfaces';
import { Tools } from '../../tools';
import * as Configuration from '../../configuration';

// D3 Imports
import { select } from 'd3-selection';

export class Boxplot extends Component {
	type = 'boxplot';
	renderType = RenderTypes.SVG;

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const dataGroupNames = this.model.getDataGroupNames();

		/*
		 * Get graphable dimensions
		 */
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();
		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();
		const width = xScaleEnd - xScaleStart;
		const height = yScaleEnd - yScaleStart;
		if (width === 0) {
			return;
		}

		// Get orientation of the chart
		const { cartesianScales } = this.services;
		const orientation = cartesianScales.getOrientation();
		const isInVerticalOrientation =
			orientation === CartesianOrientations.VERTICAL;
		const [
			getXValue,
			getYValue,
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			(d, i?) => this.services.cartesianScales.getDomainValue(d, i),
			(d, i?) => this.services.cartesianScales.getRangeValue(d, i),
			orientation
		);

		const gridSize = Math.floor(
			(isInVerticalOrientation ? width : height) / dataGroupNames.length
		);
		const boxWidth = Math.min(gridSize / 2, 16);

		const boxplotData = this.model.getBoxplotData();

		/*
		 * update or initialize all box groups
		 */
		const boxGroups = svg.selectAll('.box-group').data(boxplotData);
		boxGroups.exit().remove();

		const boxGroupsEnter = boxGroups
			.enter()
			.append('g')
			.attr('class', 'box-group');

		const allBoxGroups = boxGroups.merge(boxGroupsEnter);

		/*
		 * draw the 2 range lines for each box
		 */
		// Start range line
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.vertical-line.start'))
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'vertical-line start',
				})
			)
			.attr('stroke-width', Configuration.boxplot.strokeWidth.default)
			.attr('fill', 'none')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-verticalstartline',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 = cartesianScales.getDomainValue(d[groupMapsTo]);
				const x1 = x0;
				const y0 = cartesianScales.getRangeValue(d.whiskers.min);
				const y1 = cartesianScales.getRangeValue(d.quartiles.q_25);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		// End range line
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.vertical-line.end'))
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'vertical-line end',
				})
			)
			.attr('stroke-width', Configuration.boxplot.strokeWidth.default)
			.attr('fill', 'none')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-verticalendline',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 = cartesianScales.getDomainValue(d[groupMapsTo]);
				const x1 = x0;
				const y0 = cartesianScales.getRangeValue(d.whiskers.max);
				const y1 = cartesianScales.getRangeValue(d.quartiles.q_75);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update the boxes
		 */
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.box'))
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: 'box',
				})
			)
			.attr('fill-opacity', Configuration.boxplot.box.opacity.default)
			.attr('stroke-width', Configuration.boxplot.strokeWidth.default)
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'box')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-quartiles',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 =
					cartesianScales.getDomainValue(d[groupMapsTo]) -
					boxWidth / 2;
				const x1 = x0 + boxWidth;
				const y0 = cartesianScales.getRangeValue(
					Math[isInVerticalOrientation ? 'max' : 'min'](
						d.quartiles.q_75,
						d.quartiles.q_25
					)
				);
				const y1 =
					y0 +
					Math.abs(
						cartesianScales.getRangeValue(d.quartiles.q_75) -
							cartesianScales.getRangeValue(d.quartiles.q_25)
					);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update highlight areas
		 */
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.highlight-area'))
			.attr('class', 'highlight-area')
			.attr('opacity', 0)
			.attr('d', (d) => {
				const x0 =
					cartesianScales.getDomainValue(d[groupMapsTo]) -
					boxWidth / 2;
				const x1 = x0 + boxWidth;
				const y0 = cartesianScales.getRangeValue(d.whiskers.min);
				const y1 = cartesianScales.getRangeValue(d.whiskers.max);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update the starting whisker
		 */
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.whisker.start'))
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'whisker start',
				})
			)
			.attr('stroke-width', Configuration.boxplot.strokeWidth.thicker)
			.attr('fill', 'none')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-startingwhisker',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 =
					cartesianScales.getDomainValue(d[groupMapsTo]) -
					boxWidth / 4;
				const x1 = x0 + boxWidth / 2;
				const y0 = cartesianScales.getRangeValue(d.whiskers.min);
				const y1 = cartesianScales.getRangeValue(d.whiskers.min);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update the median line
		 */
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.median'))
			.attr('fill', 'none')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'median',
				})
			)
			.attr('stroke-width', 2)
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-median',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 =
					cartesianScales.getDomainValue(d[groupMapsTo]) -
					boxWidth / 2;
				const x1 = x0 + boxWidth;
				const y0 = cartesianScales.getRangeValue(d.quartiles.q_50);
				const y1 = y0;

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update the ending whisker
		 */
		boxGroupsEnter
			.append('path')
			.merge(boxGroups.select('path.whisker.end'))
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'whisker end',
				})
			)
			.attr('stroke-width', Configuration.boxplot.strokeWidth.thicker)
			.attr('fill', 'none')
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-endingwhisker',
					animate,
				})
			)
			.attr('d', (d) => {
				const x0 =
					cartesianScales.getDomainValue(d[groupMapsTo]) -
					boxWidth / 4;
				const x1 = x0 + boxWidth / 2;
				const y0 = cartesianScales.getRangeValue(d.whiskers.max);
				const y1 = cartesianScales.getRangeValue(d.whiskers.max);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					orientation
				);
			});

		/*
		 * Draw out and update the outlier circles
		 */
		const circles = allBoxGroups.selectAll('circle.outlier').data((d) =>
			d.outliers.map((outlier) => {
				return {
					min: d.whiskers.min,
					max: d.whiskers.max,
					[groupMapsTo]: d[groupMapsTo],
					value: outlier,
				};
			})
		);

		circles.exit().remove();

		const circlesEnter = circles.enter().append('circle');

		circles
			.merge(circlesEnter)
			.attr('r', Configuration.boxplot.circle.radius)
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: 'outlier',
				})
			)
			.attr('fill-opacity', Configuration.boxplot.circle.opacity.default)
			.attr('cx', getXValue)
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'boxplot-update-circles',
					animate,
				})
			)
			.attr('cy', getYValue);

		this.addBoxEventListeners();
		this.addCircleEventListeners();
	}

	addBoxEventListeners() {
		const self = this;

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		this.parent
			.selectAll('path.highlight-area')
			.on('mouseover', function (event, datum) {
				const hoveredElement = select(this);
				const parentElement = select(this.parentNode);
				parentElement
					.select('path.box')
					.classed('hovered', true)
					.attr(
						'fill-opacity',
						Configuration.boxplot.box.opacity.hovered
					);

				// Show tooltip for single datapoint
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: options.tooltip.groupLabel,
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
							}),
						},
						{
							label: 'Minimum',
							value: datum.whiskers.min,
						},
						{
							label: 'Q1',
							value: datum.quartiles.q_25,
						},
						{
							label: 'Median',
							value: datum.quartiles.q_50,
						},
						{
							label: 'Q3',
							value: datum.quartiles.q_75,
						},
						{
							label: 'Maximum',
							value: datum.whiskers.max,
						},
						{
							label: 'IQR',
							value: datum.quartiles.q_75 - datum.quartiles.q_25,
						},
					],
				});

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.BOX_MOUSEOVER,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);
			})
			.on('mousemove', function (event, datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.BOX_MOUSEMOVE,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event,
				});
			})
			.on('click', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Boxplot.BOX_CLICK, {
					event,
					element: select(this),
					datum,
				});
			})
			.on('mouseout', function (event, datum) {
				const hoveredElement = select(this);
				const parentElement = select(this.parentNode);
				parentElement
					.select('path.box')
					.classed('hovered', false)
					.attr(
						'fill-opacity',
						Configuration.boxplot.box.opacity.default
					);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.BOX_MOUSEOUT,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});
			});
	}

	addCircleEventListeners() {
		const self = this;

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		this.parent
			.selectAll('circle')
			.on('mouseover', function (event, datum) {
				const hoveredElement = select(this);

				hoveredElement
					.classed('hovered', true)
					.attr(
						'fill-opacity',
						Configuration.boxplot.circle.opacity.hovered
					)
					.classed('unfilled', false);

				// Show tooltip for single datapoint
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: options.tooltip.groupLabel,
							value: datum[groupMapsTo],
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
							}),
						},
						{
							label: 'Outlier',
							value: datum[rangeIdentifier],
						},
					],
				});

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.OUTLIER_MOUSEOVER,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);
			})
			.on('mousemove', function (event, datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.OUTLIER_MOUSEMOVE,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event,
				});
			})
			.on('click', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.OUTLIER_CLICK,
					{
						event,
						element: select(this),
						datum,
					}
				);
			})
			.on('mouseout', function (event, datum) {
				const hoveredElement = select(this);
				hoveredElement
					.classed('hovered', false)
					.attr(
						'fill-opacity',
						Configuration.boxplot.circle.opacity.default
					);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Boxplot.OUTLIER_MOUSEOUT,
					{
						event,
						element: hoveredElement,
						datum,
					}
				);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});
			});
	}
}
