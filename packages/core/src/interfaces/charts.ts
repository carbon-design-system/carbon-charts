import { ChartType } from "./enums";
import { LegendOptions, TooltipOptions, GridOptions, AxesOptions } from "./index";

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
	 * boolean to prevent the container from resizing
	 */
	resizable?: boolean;
	/**
	 * Optionally specify a width for the chart
	 */
	width?: number;
	/**
	 * Optionally specify a height for the chart
	 */
	height?: number;
	/**
	 * tooltip configuration
	 */
	tooltip?: TooltipOptions;
	/**
	 * legend configuration
	 */
	legend?: LegendOptions;
	/**
	 * Optional function to generate the fill color based on datasetLabel, label, and/or value
	 */
	getFillColor?: (datasetLabel: any, label?: any, value?: any) => string;
	/**
	 * Optional function to generate the stroke color based on datasetLabel, label, and/or value
	 */
	getStrokeColor?: (datasetLabel: any, label?: any, value?: any) => string;
}

/**
 * Options common to any chart with an axis
 */
export interface AxisChartOptions extends BaseChartOptions {
	axes?: AxesOptions;
	grid?: GridOptions;
}

/**
 * options specific to line charts
 */
export interface BarChartOptions extends AxisChartOptions {
	bars?: {

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
 * options specific to line charts
 */
export interface LineChartOptions extends ScatterChartOptions {
	/**
	 * options for the curve of the line
	 */
	curve?: string | {
		name: string;
	};
}
