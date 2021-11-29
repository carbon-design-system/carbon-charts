// Internal Imports
import { Axis } from './axis';
import { AxisPositions, Events, ScaleTypes } from '../../interfaces';
import { Tools } from '../../tools';
import { ChartModel } from '../../model/model';
import { DOMUtils } from '../../services';

// D3 Imports
import { select } from 'd3-selection';

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

		container.selectAll('g.ticks').attr('tabindex', 0);

		container.selectAll('g.tick').each(function () {
			const g = select(this);
			g.classed('tick-hover', true).attr('tabindex', -1);
			const textNode = g.select('text');
			const { width, height } = DOMUtils.getSVGElementSize(textNode, {
				useBBox: true,
			});

			const rectangle = DOMUtils.appendOrSelect(g, 'rect.axis-holder');

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

		const self = this;

		container.selectAll('g.ticks').on('focus', function () {
			const axis = select(this);
			this.blur();

			if (!axis.classed('invisible')) {
				// Set focus on intial value in the axis
				axis.select('g.tick').dispatch('focus');

				axis.selectAll('g.tick').on(
					'keydown',
					function (event: KeyboardEvent) {
						// Choose specific arrow key depending on the axis
						if (
							axisPosition === AxisPositions.LEFT ||
							axisPosition === AxisPositions.RIGHT
						) {
							if (event.key && event.key === 'ArrowUp') {
								self.goNext(this as HTMLElement, event);
							} else if (event.key && event.key === 'ArrowDown') {
								self.goPrevious(this as HTMLElement, event);
							}
						} else {
							if (event.key && event.key === 'ArrowLeft') {
								self.goPrevious(this as HTMLElement, event);
							} else if (
								event.key &&
								event.key === 'ArrowRight'
							) {
								self.goNext(this as HTMLElement, event);
							}
						}
					}
				);
			}
		});

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	// Focus on the next HTML element sibling
	private goNext(element: HTMLElement, event: Event) {
		if (
			element.nextElementSibling !== null &&
			element.nextElementSibling.tagName !== 'path'
		) {
			element.nextElementSibling.dispatchEvent(new Event('focus'));
		}

		event.preventDefault();
	}

	// Focus on the previous HTML element sibling
	private goPrevious(element: HTMLElement, event: Event) {
		if (
			element.previousElementSibling !== null &&
			element.previousElementSibling.tagName !== 'path'
		) {
			element.previousElementSibling.dispatchEvent(new Event('focus'));
		}

		event.preventDefault();
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
				// Focus element since we are using arrow keys
				event.target.focus();
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_FOCUS, {
					event,
					element: select(this),
					datum: select(this).select('text').datum(),
				});
			})
			.on('blur', function (event) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_BLUR, {
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
