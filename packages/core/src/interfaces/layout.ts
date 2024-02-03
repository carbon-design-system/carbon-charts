import type { LayoutAlignItems, LayoutDirection, RenderTypes } from './enums'

export interface LayoutConfigs {
	/**
	 * Direction/orientation of the layout
	 */
	direction?: LayoutDirection | string
	/**
	 * Whether to render through SVG or HTML
	 */
	renderType?: RenderTypes | string
	/**
	 * how the layout will align its children
	 */
	alignItems?: LayoutAlignItems | string
}

export interface Coordinates {
	x: number
	y: number
	x0?: number
	y0?: number
}
