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
	useAsGraphDomain?: boolean;
	/**
	 * Whether the Axis should be used as the range
	 * axis of the chart. In the case of Cartesian Scales
	 * you would expect to only have 1 axis (dimension) being used as range
	 * Range usually follows a linear scale
	 */
	useAsGraphRange?: boolean;
	/**
	 * Whether the Axis should use the specified domain
	 * instead of it being dynamically generated based on data extents.
	 * The type of values should depend on the scale type.
	 * Example for continuous axis scale: [-100, 100]
	 * Example for discrete axis scale: ['Qty', 'More', 'Sold']
	 */
	domain?: AxisDomain[];
	primary?: boolean;
	secondary?: boolean;
	/**
	* Whether the Axis should be forced to include 0 as a starting point
	* (or ending point, in case of all negative axis).
	* Default: true
	*/
	includeZero?: boolean;
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
 * customize time series scales
 */
export interface TimeScaleOptions {
	addSpaceOnEdges?: number;
	/**
	 * if it's true, days are shown as mon-sun,
	 * otherwise days are shown as number 1-31
	 */
	showDayName?: boolean;
	/**
	 * formats for each time interval
	 */
	timeIntervalFormats?: TimeIntervalFormats;
	/**
	 * locale object. For more information see https://date-fns.org/v2.11.0/docs/Locale
	 * available locale objects are: https://github.com/date-fns/date-fns/tree/master/src/locale
	 */
	localeObject?: Locale;
}

/**
 * time scales: customize ticks format for different time intervals
 */
export interface TickFormats {
	primary?: string;
	secondary?: string;
}


export interface TimeIntervalFormats {
	"15seconds"?: TickFormats;
	"minute"?: TickFormats;
	"30minutes"?: TickFormats;
	"hourly"?: TickFormats;
	"daily"?: TickFormats;
	"weekly"?: TickFormats;
	"monthly"?: TickFormats;
	"quarterly"?: TickFormats;
	"yearly"?: TickFormats;
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
