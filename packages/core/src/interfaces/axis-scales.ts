import { ScaleTypes } from "./enums";

/**
 * options to configure a scale. not all options are used by all scales
 */
export interface AxisOptions {
	/**
	 * type of the scale used on axis
	 */
	scaleType?: ScaleTypes;
	/**
	 * Whether the Axis should be used as the domain
	 * axis of the chart. In the case of Cartesian Scales
	 * you would expect to only have 1 axis (dimension) being used as domain
	 * Domain usually represents labels, ordinal values, time intervals etc.
	 */
	useAsDomain?: boolean;
	/**
	 * Whether the Axis should be used as the range
	 * axis of the chart. In the case of Cartesian Scales
	 * you would expect to only have 1 axis (dimension) being used as range
	 * Range usually follows a linear scale
	 */
	useAsRange?: boolean;
	primary?: boolean;
	secondary?: boolean;
	/**
	 * optional title for the scales
	 */
	title?: string;
	/**
	 * tick configuration
	 */
	ticks?: {
		/**
		 * number of ticks to show
		 */
		number?: number;
		/**
		 * minimum tick value
		 */
		min?: number;
		/**
		 * maximum tick value
		 */
		max?: number;
		/**
		 * minimum width of a tick
		 * before getting rotated (in pixels)
		 */
		rotateIfSmallerThan?: number;
		/**
		 * function to format the ticks
		 */
		formatter?: Function;
		/**
		 * if it's true, it uses 12-hour clock format,
		 * 24-hour clock format otherwise
		 */
		hour12Format?: boolean;
		/**
		 * if it's true, days are shown as mon-sun,
		 * otherwise days are shown as number 1-31
		 */
		showDayName?: boolean;
	};
}

/**
 * customize the axes components
 */
export interface AxesOptions {
	left?: AxisOptions;
	bottom?: AxisOptions;
	right?: AxisOptions;
	top?: AxisOptions;
}

/**
 * customize time series scales
 */
export interface TimeScaleOptions {
	addSpaceOnEdges?: number;
}
