import { select } from 'd3'
import { Service } from './service'
import { Events } from '../interfaces/enums'
import { canvasZoomSettings } from '../configuration'
import { DOMUtils } from './essentials/dom-utils'

export class CanvasZoom extends Service {
	protected model: any

	/**
	 * focal:  object to zoom into
	 * canvasElements: all the elements to translate and zoom on the chart area
	 * zoomSettings: object containing duration, easing and zoomlevel for the zoom behaviours
	 *  */
	zoomIn(focal: any, canvasElements: any, zoomSettings?: any) {
		let x: number
		let y: number
		let zoomLevel: number
		const settings = zoomSettings ? zoomSettings : canvasZoomSettings

		if (focal) {
			x = focal.x
			y = focal.y
			zoomLevel = 2
		}

		// the 'viewport' size of the chart
		const { width, height } = DOMUtils.getSVGElementSize(this.services.domUtils.getHolder(), {
			useClientDimensions: true
		})

		canvasElements
			.transition()
			.duration(settings.duration)
			.ease(settings.ease)
			.attr(
				'transform',
				`translate(${width / 2}, ${height / 2}) scale(${zoomLevel}) translate(${-x},${-y})`
			)

		// Dispatch canvas zoom in event
		this.services.events.dispatchEvent(Events.CanvasZoom.CANVAS_ZOOM_IN, {
			element: select(focal)
		})
	}

	zoomOut(canvasElements: any, zoomSettings?: any) {
		const settings = zoomSettings ? zoomSettings : canvasZoomSettings
		canvasElements
			.transition()
			.duration(settings.duration)
			.ease(settings.ease)
			.attr('transform', '')

		// Dispatch canvas zoom out event
		this.services.events.dispatchEvent(Events.CanvasZoom.CANVAS_ZOOM_OUT)
	}
}
