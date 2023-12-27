import type { Transitions } from '@/services/essentials/transitions'
import type { DOMUtils } from '@/services/essentials/dom-utils'
import type { CartesianScales } from '@/services/scales-cartesian'
import type { CanvasZoom } from '@/services/canvas-zoom'
import type { Curves } from '@/services/curves'
import type { Events } from '@/services/essentials/events'
import type { Files } from '@/services/essentials/files'
import type { GradientUtils } from '@/services/essentials/gradient-utils'
import type { Zoom } from '@/services/zoom'

export interface Services {
	canvasZoom?: CanvasZoom
	cartesianScales?: CartesianScales
	curves?: Curves
	domUtils?: DOMUtils
	events?: Events
	files?: Files
	gradientUtils?: GradientUtils
	transitions?: Transitions
	zoom?: Zoom
}
