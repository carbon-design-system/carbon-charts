// Internal Imports
import { Axis } from './axis';
import {
	AxisPositions,
	Events,
	ScaleTypes,
	Roles,
	TruncationTypes,
} from '../../interfaces';
import { Tools } from '../../tools';
import { ChartModel } from '../../model/model';
import { DOMUtils } from '../../services';
import { AxisTitleOrientations, TickRotations } from '../../interfaces/enums';
import * as Configuration from '../../configuration';

// D3 Imports
import { select } from 'd3-selection';
import { axisBottom, axisLeft, axisRight, axisTop } from 'd3-axis';

export class HoverAxis extends Axis {
	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);
	}

	render(animate = true) {
		super.render(animate);
		const { position: axisPosition } = this.configs;
		const svg = this.getComponentContainer();
		const container = DOMUtils.appendOrSelect(
			svg,
			`g.axis.${axisPosition}`
		);

		container.selectAll('g.tick').each(function () {
			const g = select(this);
			g.classed('tick-hover', true).attr('tabindex', 0);
			const textNode = g.select('text');
			const { width, height } = DOMUtils.getSVGElementSize(textNode, {
				useBBox: true,
			});

			const rectangle = DOMUtils.appendOrSelect(g, `rect.axis-holder`);

			let x = 0,
				y = 0;

			switch (axisPosition) {
				case AxisPositions.LEFT:
					x = -width + Number(textNode.attr('x'));
					y = -(height / 2) + 1;
					break;
				case AxisPositions.RIGHT:
					x = Math.abs(Number(textNode.attr('x')));
					y = -(height / 2);
					break;
				case AxisPositions.TOP:
					x = -(width / 2);
					y = -height + Number(textNode.attr('y')) / 2;
					break;
				case AxisPositions.BOTTOM:
					x = -(width / 2);
					y = height / 2 - 2;
					break;
			}

			rectangle
				.attr('x', x)
				.attr('y', y)
				.attr('width', width)
				.attr('height', height);

			rectangle.lower();
		});

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	addEventListeners() {
		const svg = this.getComponentContainer();
		const { position: axisPosition } = this.configs;
		const container = DOMUtils.appendOrSelect(
			svg,
			`g.axis.${axisPosition}`
		);
		const options = this.getOptions();
		const axisOptions = Tools.getProperty(options, 'axes', axisPosition);
		const axisScaleType = Tools.getProperty(axisOptions, 'scaleType');
		const truncationThreshold = Tools.getProperty(
			axisOptions,
			'truncation',
			'threshold'
		);

		const self = this;
		container
			.selectAll('g.tick text')
			.on('mouseover', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Axis.LABEL_MOUSEOVER,
					{
						event,
						element: select(this),
						datum,
					}
				);

				if (
					axisScaleType === ScaleTypes.LABELS &&
					datum.length > truncationThreshold
				) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement: select(this),
						content: datum,
					});
				}
			})
			.on('mousemove', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Axis.LABEL_MOUSEMOVE,
					{
						event,
						element: select(this),
						datum,
					}
				);
				if (
					axisScaleType === ScaleTypes.LABELS &&
					datum.length > truncationThreshold
				) {
					console.log('inside');
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event,
					});
				}
			})
			.on('click', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_CLICK, {
					event,
					element: select(this),
					datum,
				});
			})
			.on('mouseout', function (event, datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOUT, {
					event,
					element: select(this),
					datum,
				});

				if (axisScaleType === ScaleTypes.LABELS) {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE);
				}
			});

		// Emit mouseover & mouseout events on focus/blur
		container
			.selectAll('g.tick.tick-hover')
			.on('focus', function (event) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Axis.LABEL_MOUSEOVER,
					{
						event,
						element: select(this),
						datum: select(this).select('text').datum(),
					}
				);
			})
			.on('blur', function (event) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOUT, {
					event,
					element: select(this),
					datum: select(this).select('text').datum(),
				});
			});
	}

	destroy() {
		const svg = this.getComponentContainer();
		const { position: axisPosition } = this.configs;
		const container = DOMUtils.appendOrSelect(
			svg,
			`g.axis.${axisPosition}`
		);

		// Remove event listeners
		container
			.selectAll('g.tick text')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
			.on('focus', null)
			.on('blur', null);
	}
}
