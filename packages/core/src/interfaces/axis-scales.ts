import { ScaleTypes } from "./enums";
import { AxisDomain } from "d3";

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
	domain?: AxisDomain[];
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
