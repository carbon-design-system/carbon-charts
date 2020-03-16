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
	 * local code, ie. "en-US"
	 */
	localeCode?: string;
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
