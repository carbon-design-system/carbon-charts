import type { Transitions } from '@/services/essentials/transitions'
import type { DOMUtils } from '@/services/essentials/dom-utils'
import type { CartesianScales } from '@/services/scales-cartesian'
import type { CanvasZoom } from '@/services/canvas-zoom'
import type { Curves } from '@/services/curves'
import type { Events } from '@/services/essentials/events'
import type { Files } from '@/services/essentials/files'
import type { GradientUtils } from '@/services/essentials/gradient-utils'
import type { Zoom } from '@/services/zoom'

/**
 * Represents a collection of service instances used within the chart.
 */
export interface Services {
	/**
	 * Optional canvas zoom service.
	 * @type {CanvasZoom}
	 */
	canvasZoom?: CanvasZoom

	/**
	 * Optional Cartesian scales service.
	 * @type {CartesianScales}
	 */
	cartesianScales?: CartesianScales

	/**
	 * Optional curves service.
	 * @type {Curves}
	 */
	curves?: Curves

	/**
	 * Optional DOM utilities service.
	 * @type {DOMUtils}
	 */
	domUtils?: DOMUtils

	/**
	 * Optional events service.
	 * @type {Events}
	 */
	events?: Events

	/**
	 * Optional files service.
	 * @type {Files}
	 */
	files?: Files

	/**
	 * Optional gradient utilities service.
	 * @type {GradientUtils}
	 */
	gradientUtils?: GradientUtils

	/**
	 * Optional transitions service.
	 * @type {Transitions}
	 */
	transitions?: Transitions

	/**
	 * Optional zoom service.
	 * @type {Zoom}
	 */
	zoom?: Zoom
}
