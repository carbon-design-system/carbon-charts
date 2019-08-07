import { Threshold } from "./components";

import { ScaleBand, ScaleLinear } from "d3-scale";

/**
 * options to configure a scale. not all options are used by all scales
 */
export interface ScaleOptions {
	/**
	 * optional title for the scales
	 */
	title?: string;
	/**
	 * function to adjust the min value
	 */
	maxValueAdjuster?: Function;
	/**
	 * function to adjust the max value
	 */
	minValueAdjuster?: Function;
	/**
	 * function to format the ticks
	 */
	formatter?: Function;
	/**
	 * tick configuration
	 */
	ticks?: {
		/**
		 * maximum ... number of ticks?
		 */
		max: number;
		/**
		 * minumum ... number of ticks?
		 */
		min: number;
	};
	/**
	 * configuration for the thresholds
	 */
	thresholds?: Array<Threshold>;
}

/**
 * options to configure a Y (vertical) scale
 */
export interface YScaleOptions extends ScaleOptions {
	/**
	 * boolean to indicate whether bars should be stacked
	 */
	stacked?: boolean;
	/**
	 * custom formatter function to adjust the maximum y-value of the scale
	 */
	yMaxAdjuster?: Function;
	/**
	 * custom formatter function to adjust the minimum y-value of the scale
	 */
	yMinAdjuster?: Function;
	/**
	 * number of ticks to show on axis
	 */
	numberOfTicks?: number;
}

/**
 * options for the x, y, and y2 scales/axis
 */
export interface Scales {
	x: ScaleOptions;
	y: YScaleOptions;
	y2?: YScaleOptions;
}

export interface Axis {
	x: ScaleBand<any>;
	y: ScaleLinear<any, any>;
	y2: ScaleLinear<any, any>;
}
