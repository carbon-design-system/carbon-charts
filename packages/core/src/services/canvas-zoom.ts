// Internal Imports
import { Service } from './service';
import { Tools } from '../tools';
import { Events } from './../interfaces/enums';
import * as Configuration from '../configuration';
// Services
import { DOMUtils } from './index';
import { select } from 'd3-selection';

export class CanvasZoom extends Service {
	protected model: any;

	/**
	 * focal:  object to zoom into
	 * canvasElements: all the elements to translate and zoom on the chart area
	 * zoomSettings: object containing duration, easing and zoomlevel for the zoom behaviours
	 *  */
	zoomIn(focal, canvasElements, zoomSettings?) {
		let x;
		let y;
		let zoomLevel;
		const settings = zoomSettings
			? zoomSettings
			: Configuration.canvasZoomSettings;

		if (focal) {
			x = focal.x;
			y = focal.y;
			zoomLevel = 2;
		}

		// the 'viewport' size of the chart
		const { width, height } = DOMUtils.getSVGElementSize(
			this.services.domUtils.getHolder(),
			{
				useClientDimensions: true,
			}
		);

		canvasElements
			.transition()
			.duration(settings.duration)
			.ease(settings.ease)
			.attr(
				'transform',
				`translate(${width / 2}, ${
					height / 2
				}) scale(${zoomLevel}) translate(${-x},${-y})`
			);

		// Dispatch canvas zoom in event
		this.services.events.dispatchEvent(Events.CanvasZoom.CANVAS_ZOOM_IN, {
			element: select(focal),
		});
	}

	zoomOut(canvasElements, zoomSettings?) {
		const settings = zoomSettings
			? zoomSettings
			: Configuration.canvasZoomSettings;
		canvasElements
			.transition()
			.duration(settings.duration)
			.ease(settings.ease)
			.attr('transform', '');

		// Dispatch canvas zoom out event
		this.services.events.dispatchEvent(Events.CanvasZoom.CANVAS_ZOOM_OUT);
	}
}
