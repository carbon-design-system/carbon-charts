import { LayoutAlignItems, LayoutDirection, RenderTypes } from './enums';

export interface LayoutConfigs {
	/**
	 * Direction/orientation of the layout
	 */
	direction?: LayoutDirection;
	/**
	 * Whether to render through SVG or HTML
	 */
	renderType?: RenderTypes;
	/**
	 * how the layout will align its children
	 */
	alignItems?: LayoutAlignItems;
}
