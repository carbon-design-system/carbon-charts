import { AxisChartOptions } from './charts';

export type ChartTabularData = Record<string, any>[];

/**
 * Configuration passed to the chart.
 *
 * Includes options and data
 */
export interface ChartConfig<T extends AxisChartOptions> {
	options: T;
	data: ChartTabularData;
}

export interface DataSet {
	/**
	 * Label for the dataset
	 */
	label: string;
	/**
	 * Array of hex background colors
	 */
	fillColors: string[];
	/**
	 * Array of data values
	 */
	data: any[];
}

export interface ChartData {
	/**
	 * Labels for the x (horizontal) axis. Should match the number of items in each dataset data array
	 */
	labels: string[];
	/**
	 * Array of datasets to display in the chart
	 */
	datasets: DataSet[];
}
