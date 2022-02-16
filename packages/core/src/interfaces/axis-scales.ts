import { ScaleTypes, TickRotations, AxisTitleOrientations } from './enums';
import { ThresholdOptions } from './components';
import { TruncationOptions } from './truncation';

import { AxisDomain } from 'd3-axis';
import { Locale } from 'date-fns';

export interface BasedAxisOptions {
	/**
	 * type of the scale used on axis
	 */
	scaleType?: ScaleTypes;
	/**
	 * Whether the Axis should use the specified domain
	 * instead of it being dynamically generated based on data extents.
	 * The type of values should depend on the scale type.
	 * Example for continuous axis scale: [-100, 100]
	 * Example for discrete axis scale: ['Qty', 'More', 'Sold']
	 * No need to define domain for percentage axis scale
	 */
	domain?: AxisDomain[];
	/**
	 * an additional key from the charting data that is used to
	 * extend the domain of an axis by
	 * (e.g. in the bullet graph we need both the marker &
	 * the data values to define the domain of the linear scale)
	 */
	extendLinearDomainBy?: string;
	/**
	 * Whether the Axis should be forced to include 0 as a starting point
	 * (or ending point, in case of all negative axis).
	 * Default: true
	 */
	includeZero?: boolean;
	/**
	 * identifies what key within the data the axis values would map to
	 */
	mapsTo?: string;
	/**
	 * optional title for the scales
	 */
	title?: string;
	/**
	 * Override for the orientation of the title (for vertical axes).
	 * The title string can be overrided to be rotated left or right.
	 */
	titleOrientation?: AxisTitleOrientations;
	/**
	 * thresholds
	 * Example:
	 * [
	 *		{value: 10000},
	 *		{value: 40020, valueFormatter: (x) => x},
	 *		{value: 55000, label: "Custom label", fillColor: "#03a9f4"},
	 * ]
	 */
	thresholds?: ThresholdOptions[];
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
		 * when to rotate ticks
		 */
		rotation?: TickRotations;
		/**
		 * function to format the ticks
		 */
		formatter?: Function;
		/**
		 * optional custom array of tick values that is within the domain of data
		 */
		values?: any[];
	};
	truncation?: TruncationOptions;
	/**
	 * is axis visible or not
	 */
	visible?: boolean;
	/**
	 * Bins to display (Histogram)
	 * bins: 20
	 * bins: [0, 20, 40, 60]
	 * bins: [new Date(...), new Date(...), ...]
	 */
	bins?: number | any[];
	/**
	 * limit the visible axis domain to only the binned area
	 */
	limitDomainToBins?: boolean;
	/**
	 * should be set to `true` on the domain
	 * axis that's being broken into bins
	 */
	binned?: boolean;
}

/**
 * options to configure a scale. not all options are used by all scales
 */
export interface AxisOptions extends BasedAxisOptions {
	/**
	 * option for stacked axis
	 */
	stacked?: boolean;
	/**
	 * option for percentage axis scale
	 */
	percentage?: boolean;
}

export interface BinnedAxisOptions {
	/**
	 * should be set to `true` on the domain
	 * axis that's being broken into bins
	 */
	binned?: boolean;
	/**
	 * Bins to display (Histogram)
	 * bins: 20
	 * bins: [0, 20, 40, 60]
	 * bins: [new Date(...), new Date(...), ...]
	 */
	bins?: number | any[];
	/**
	 * limit the visible axis domain to only the binned area
	 */
	limitDomainToBins?: boolean;
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
	 * locale object, for more information see https://date-fns.org/v2.11.0/docs/Locale.
	 * example: `import enUSLocaleObject from "date-fns/locale/en-US/index"`.
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
	'15seconds'?: TickFormats;
	minute?: TickFormats;
	'30minutes'?: TickFormats;
	hourly?: TickFormats;
	daily?: TickFormats;
	weekly?: TickFormats;
	monthly?: TickFormats;
	quarterly?: TickFormats;
	yearly?: TickFormats;
}

/**
 * customize the axes components
 */
export interface AxesOptions<AxesOptionType> {
	left?: AxesOptionType;
	bottom?: AxesOptionType;
	right?: AxesOptionType;
	top?: AxesOptionType;
}
