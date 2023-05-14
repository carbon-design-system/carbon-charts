import type { CanvasZoom, CartesianScales, Curves, DOMUtils, Events, Files, GradientUtils, Transitions, Zoom } from '../services'

export interface Services {
  canvasZoom?: CanvasZoom,
  cartesianScales?: CartesianScales,
  curves?: Curves,
  domUtils?: DOMUtils,
  events?: Events,
  files?: Files,
  gradientUtils?: GradientUtils,
  transitions?: Transitions,
  zoom?: Zoom
}
