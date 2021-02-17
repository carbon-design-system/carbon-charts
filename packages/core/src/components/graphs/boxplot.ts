// Internal Imports
import { Component } from '../component';
import { ColorClassNameTypes, Events } from '../../interfaces';

// D3 Imports
import { select } from 'd3-selection';

export class Boxplot extends Component {
	type = 'boxplot';

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getContainerSVG({ withinChartClip: true });

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

		const gridSize = Math.floor(width / dataGroupNames.length);
		const boxWidth = Math.min(gridSize / 2, 16);
		const boxStrokeWidth = '1';

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
			.append('line')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'vertical-line start',
				})
			)
			.attr('stroke-width', boxStrokeWidth)
			.attr('fill', 'none')
			.attr('x1', (d) => mainXScale(d[groupMapsTo]) + gridSize / 2)
			.attr('x2', (d) => mainXScale(d[groupMapsTo]) + gridSize / 2)
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-verticalstartline',
					animate
				)
			)
			.attr('y1', (d) => mainYScale(d.whiskers.min))
			.attr('y2', (d) => mainYScale(d.quartiles.q_25));

		// End range line
		boxGroupsEnter
			.append('line')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'vertical-line end',
				})
			)
			.attr('stroke-width', boxStrokeWidth)
			.attr('fill', 'none')
			.attr('x1', (d) => mainXScale(d[groupMapsTo]) + gridSize / 2)
			.attr('x2', (d) => mainXScale(d[groupMapsTo]) + gridSize / 2)
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-verticalendline',
					animate
				)
			)
			.attr('y1', (d) => mainYScale(d.whiskers.max))
			.attr('y2', (d) => mainYScale(d.quartiles.q_75));

		// The offset needed to center boxes on each group
		const offset = gridSize / 2 - boxWidth / 2;

		/*
		 * Draw out and update the boxes
		 */
		boxGroupsEnter
			.append('rect')
			.attr('width', boxWidth)
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: 'box',
				})
			)
			.attr('fill-opacity', 0.3)
			.attr('stroke-width', boxStrokeWidth)
			.attr('x', (d) => mainXScale(d[groupMapsTo]) + offset);

		allBoxGroups
			.select('.box')
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-quartiles',
					animate
				)
			)
			.attr('height', (d) =>
				Math.abs(
					mainYScale(d.quartiles.q_75) - mainYScale(d.quartiles.q_25)
				)
			)
			.attr('y', (d) =>
				mainYScale(Math.max(d.quartiles.q_75, d.quartiles.q_25))
			);

		/*
		 * Draw out and update the top whisker
		 */
		boxGroupsEnter
			.append('line')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'whisker top',
				})
			)
			.attr('stroke-width', 2)
			.attr('fill', 'none')
			.attr(
				'x1',
				(d) => mainXScale(d[groupMapsTo]) + offset + boxWidth / 4
			)
			.attr(
				'x2',
				(d) =>
					mainXScale(d[groupMapsTo]) +
					offset +
					boxWidth -
					boxWidth / 4
			);

		allBoxGroups
			.select('.whisker.top')
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-topwhisker',
					animate
				)
			)
			.attr('y1', (d) => mainYScale(d.whiskers.min))
			.attr('y2', (d) => mainYScale(d.whiskers.min));

		/*
		 * Draw out and update the median line
		 */
		boxGroupsEnter
			.append('line')
			.attr('fill', 'none')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'median',
				})
			)
			.attr('stroke-width', 2)
			.attr('x1', (d) => mainXScale(d[groupMapsTo]) + offset)
			.attr('x2', (d) => mainXScale(d[groupMapsTo]) + offset + boxWidth);

		allBoxGroups
			.select('.median')
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-median',
					animate
				)
			)
			.attr('y1', (d) => mainYScale(d.quartiles.q_50))
			.attr('y2', (d) => mainYScale(d.quartiles.q_50));

		/*
		 * Draw out and update the bottom whisker
		 */
		boxGroupsEnter
			.append('line')
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					originalClassName: 'whisker bottom',
				})
			)
			.attr('stroke-width', 2)
			.attr('fill', 'none')
			.attr(
				'x1',
				(d) => mainXScale(d[groupMapsTo]) + offset + boxWidth / 4
			)
			.attr(
				'x2',
				(d) =>
					mainXScale(d[groupMapsTo]) +
					offset +
					boxWidth -
					boxWidth / 4
			);

		allBoxGroups
			.select('.whisker.bottom')
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-bottomwhisker',
					animate
				)
			)
			.attr('y1', (d) => mainYScale(d.whiskers.max))
			.attr('y2', (d) => mainYScale(d.whiskers.max));

		/*
		 * Draw out and update the outlier circles
		 */
		const circleData = allBoxGroups.selectAll('circle.outlier').data((d) =>
			d.outliers.map((outlier) => {
				return {
					min: d.whiskers.min,
					max: d.whiskers.max,
					[groupMapsTo]: d[groupMapsTo],
					value: outlier,
				};
			})
		);

		circleData.exit().remove();

		const circleDataEnter = circleData
			.enter()
			.append('circle')
			.attr('r', 4)
			.attr('class', () =>
				this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: 'outlier',
				})
			)
			.attr('fill-opacity', 0.3)
			.attr('cx', (d: any) => mainXScale(d[groupMapsTo]) + gridSize / 2);

		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
		circleData
			.merge(circleDataEnter)
			.transition(
				this.services.transitions.getTransition(
					'boxplot-update-circles',
					animate
				)
			)
			.attr('cy', (d: any) => mainYScale(d[rangeIdentifier]));

		this.addBoxEventListeners();
		this.addCircleEventListeners();
	}

	addBoxEventListeners() {
		const self = this;

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		this.parent
			.selectAll(
				'line.vertical-line, rect.box, line.whisker, line.median'
			)
			.on('mouseover', function (datum) {
				const hoveredElement = select(this);
				hoveredElement
					.classed('hovered', true)
					.attr('fill-opacity', 0.5);

				// Show tooltip for single datapoint
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					items: [
						{
							label: options.tooltip.groupLabel || 'Group',
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
					Events.Scatter.SCATTER_MOUSEOVER,
					{
						element: hoveredElement,
						datum,
					}
				);
			})
			.on('mousemove', function (datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEMOVE,
					{
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('click', function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_CLICK,
					{
						element: select(this),
						datum,
					}
				);
			})
			.on('mouseout', function (datum) {
				const hoveredElement = select(this);
				hoveredElement
					.classed('hovered', false)
					.attr('fill-opacity', 0.3);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEOUT,
					{
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
			.on('mouseover', function (datum) {
				const hoveredElement = select(this);

				hoveredElement
					.classed('hovered', true)
					.attr('fill-opacity', 1)
					.classed('unfilled', false);

				// Show tooltip for single datapoint
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					items: [
						{
							label: options.tooltip.groupLabel || 'Group',
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
					Events.Scatter.SCATTER_MOUSEOVER,
					{
						element: hoveredElement,
						datum,
					}
				);
			})
			.on('mousemove', function (datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEMOVE,
					{
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('click', function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_CLICK,
					{
						element: select(this),
						datum,
					}
				);
			})
			.on('mouseout', function (datum) {
				const hoveredElement = select(this);
				hoveredElement
					.classed('hovered', false)
					.attr('fill-opacity', 0.3);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEOUT,
					{
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
