import { BaseChartOptions } from "./charts";
import { ChartType } from "./enums";

/**
 * Configuration passed to the chart.
 *
 * Includes options and data
 */
export interface ChartConfig<T extends BaseChartOptions> {
	options: T;
	data: ChartData | Promise<ChartData>;
}

export interface DataSet {
	/**
	 * Label for the dataset
	 */
	label: string;
	/**
	 * Array of hex background colors
	 */
	backgroundColors: Array<string>;
	/**
	 * Array of data values
	 */
	data: Array<any>;
	/**
	 * chartType - only used with combo charts
	 */
	chartType?: ChartType;
}

export interface ChartData {
	/**
	 * Labels for the x (horizontal) axis. Should match the number of items in each dataset data array
	 */
	labels: Array<string>;
	/**
	 * Array of datasets to display in the chart
	 */
	datasets: Array<DataSet>;
}
