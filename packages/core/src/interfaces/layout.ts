import type { LayoutAlignItems, LayoutDirection, RenderTypes } from './enums'

/**
 * Configuration for layout settings.
 */
export interface LayoutConfigs {
	/**
	 * Direction/orientation of the layout.
	 * @type {LayoutDirection | string}
	 */
	direction?: LayoutDirection | string
	/**
	 * Whether to render through SVG or HTML.
	 * @type {RenderTypes | string}
	 */
	renderType?: RenderTypes | string
	/**
	 * How the layout will align its children.
	 * @type {LayoutAlignItems | string}
	 */
	alignItems?: LayoutAlignItems | string
}

/**
 * Interface representing coordinates in a 2D space.
 */
export interface Coordinates {
	/**
	 * The x-coordinate.
	 * @type {number}
	 */
	x: number

	/**
	 * The y-coordinate.
	 * @type {number}
	 */
	y: number

	/**
	 * The optional initial x-coordinate.
	 * @type {number}
	 */
	x0?: number

	/**
	 * The optional initial y-coordinate.
	 * @type {number}
	 */
	y0?: number
}
