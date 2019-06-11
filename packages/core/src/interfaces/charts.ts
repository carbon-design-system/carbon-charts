import { ChartType, TooltipSize } from "./enums";
import { OverlayOptions } from "./components";
import { Scales, Axis } from "./axis-scales";

import { PieChartOptions } from "../configuration";

/**
 * Base chart options common to any chart
 */
export interface BaseChartOptions {
	/**
	 * Internal property to track what type of chart should be instantiated
	 */
	type?: ChartType;
	/**
	 * boolean to enable accessibility mode
	 */
	accessibility?: boolean;
	/**
	 * boolean to disable animations (enabled by default)
	 */
	animations?: boolean;
	/**
	 * boolean to enable/disable legend interactivity
	 */
	legendClickable?: boolean;
	/**
	 * boolean to prevent the container from resizing
	 */
	containerResizable?: boolean;
	/**
	 * array of hex colors for the chart to render from
	 */
	colors: Array<string>;
	/**
	 * tooltip configuration
	 */
	tooltip?: {
		/**
		 * specify the size of the tooltip
		 */
		size: TooltipSize;
		/**
		 * a function to format the tooltip contents
		 */
		formatter: Function;
		/**
		 * elements onto which a hover or click would not trigger the tooltip to hide
		 */
		targetsToSkip: Array<String>;
		/**
		 * custom HTML content for tooltip provided by user
		 */
		customHTML?: string;
	};
	overlay?: OverlayOptions;
	/**
	 * Optional function to generate the fill color based on datasetLabel, label, and/or value
	 */
	getFillColor?: (datasetLabel: any, label?: any, value?: any) => string;
	/**
	 * Optional function to generate the stroke color based on datasetLabel, label, and/or value
	 */
	getStrokeColor?: (datasetLabel: any, label?: any, value?: any) => string;
	/**
	 * Optionally specify a width for the chart
	 */
	width?: number;
	/**
	 * Optionally specify a height for the chart
	 */
	height?: number;
	/**
	 * Internal property to track keys in the legend
	 */
	keys?: Object;
}

/**
 * Options specific to donut charts
 */
export interface DonutChartOptions extends PieChartOptions {
	center?: {
		label: string;
		number: string;
	};
	centerLabel?: string;
	centerNumber?: string;
}


/**
 * Options common to any chart with an axis
 */
export interface AxisChartOptions extends BaseChartOptions {
	/**
	 * scale configuration
	 */
	scales?: Scales;
	axis?: Axis;
}

/**
 * options specific to line charts
 */
export interface LineChartOptions extends AxisChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | {
		name: string;
	};
	/**
	 * options for the line points
	 */
	points?: {
		/**
		 * sets the radius of the point
		 */
		radius: number;
		fillOpacity?: number;
	};
}

/**
 * options specific to scatter charts
 */
export interface ScatterChartOptions extends AxisChartOptions {
	/**
	 * options for the points
	 */
	points?: {
		/**
		 * sets the radius of the point
		 */
		radius: number;
		fillOpacity?: number;
	};
}


/**
 * options specific to bar charts
 */
export interface BarChartOptions extends AxisChartOptions {
	/**
	 * options for all bars
	 */
	bars?: {
		/**
		 * constrains the bars to a maximum width
		 */
		maxWidth: number;
	};
}

/**
 * Options specific to combo charts.
 *
 * This interface also extends all other AxisChartOption interfaces as the single config is shared across all charts in a combo
 */
export interface ComboChartOptions extends AxisChartOptions, BarChartOptions, LineChartOptions, ScatterChartOptions { }
