import { LayoutGrowth } from "./enums";
import { Component } from "../components/component";

/**
 * customize the overlay contents
 */
export interface LayoutComponentChild {
	id: string;
	/**
	 * the component that'll be rendered inside layout child
	 */
	components: Array<Component>;
	/**
	 * size of the layout child
	 */
	size?: number;
	/**
	 * how the layout child will grow or shrink in x & y directions
	 */
	growth?: {
		x: LayoutGrowth,
		y: LayoutGrowth
	};
}


/**
 * customize the legend component
 */
export interface LegendOptions {
	/**
	 * the clickability of legend items
	 */
	clickable: boolean;
}

export interface TooltipOptions {
	/**
	 * a function to format the tooltip values
	 */
	formatter?: Function;
	/**
	 * custom function for returning tooltip HTML
	 */
	customHTML?: Function;
}

/**
 * extends tooltip options to provide support for multiple gridline tooltips
 */
export interface AxisTooltipOptions extends TooltipOptions {
	/** options for gridline event listeners */
	gridline?: {
		/**
		 * controls whether the gridlines are active for tooltip support
		 */
		enabled?: boolean
	};
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
