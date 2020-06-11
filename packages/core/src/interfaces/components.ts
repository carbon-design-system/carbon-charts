import { LayoutGrowth, LegendPositions } from "./enums";
import { Component } from "../components/component";
import { TruncationOptions } from "./truncation";

/**
 * customize the overlay contents
 */
export interface LayoutComponentChild {
	id: string;
	/**
	 * the component that'll be rendered inside layout child
	 */
	components: Component[];
	/**
	 * size of the layout child
	 */
	size?: number;
	/**
	 * how the layout child will grow or shrink in x & y directions
	 */
	growth?: {
		x: LayoutGrowth;
		y: LayoutGrowth;
	};
}

/**
 * customize the legend component
 */
export interface LegendOptions {
	position?: LegendPositions;
	/**
	 * the clickability of legend items
	 */
	clickable?: boolean;
	/**
	 * is the legend visible or not
	 */
	enabled?: boolean;
	items?: {
		status?: {
			ACTIVE?: Number;
			DISABLED?: Number;
		};
		horizontalSpace?: Number;
		verticalSpace?: Number;
		textYOffset?: Number;
	};
	checkbox?: {
		radius?: Number;
		spaceAfter?: Number;
	};
	truncation?: TruncationOptions;
}

export interface TooltipOptions {
	/**
	 * a function to format the tooltip values
	 */
	valueFormatter?: Function;
	/**
	 * custom function for returning tooltip HTML
	 * passed an array or object with the data, and then the default tooltip markup
	 */
	customHTML?: Function;
	/**
	 * offset of the tooltip from the mouse position
	 */
	horizontalOffset?: number;
	/**
	 * show total of items
	 */
	showTotal?: boolean;
	truncation?: TruncationOptions;
}

/**
 * Threshold options
 */
export interface ThresholdOptions {
	/**
	 * threshold value
	 */
	value: number | Date;
	/**
	 * a function to format the threshold values
	 */
	valueFormatter?: Function;
	/**
	 * hex threshold line color
	 */
	fillColor: string;
	/**
	 * threshold label
	 */
	label: string;
}

export interface GridOptions {
	y?: {
		numberOfTicks?: number;
	};
	x?: {
		numberOfTicks?: number;
	};
	strokeColor?: string;
}

export interface BarOptions {
	width?: number;
	maxWidth?: number;
}

export interface StackedBarOptions extends BarOptions {
	dividerSize?: number;
}

/**
 * customize the ZoomBar component
 */
export interface ZoomBarOptions {
	/**
	 * is the zoom-bar visible or not
	 */
	enabled?: boolean;
	/**
	 * a function to handle selection start event
	 */
	selectionStart?: Function;
	/**
	 * a function to handle selection in progress event
	 */
	selectionInProgress?: Function;
	/**
	 * a function to handle selection end event
	 */
	selectionEnd?: Function;
}
