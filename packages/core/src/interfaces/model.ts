import type { AxisChartOptions } from './charts'

/**
 * Represents tabular data for a chart.
 * Each record is an object where keys are strings and values can be of any type.
 * @type {Record<string, any>[]}
 */
export type ChartTabularData = Record<string, any>[]

/**
 * Configuration passed to the chart.
 *
 * Includes options and data.
 */
export interface ChartConfig<T extends AxisChartOptions> {
	/**
	 * Chart options configuration.
	 * @type {T}
	 */
	options: T

	/**
	 * Data for the chart.
	 * @type {ChartTabularData}
	 */
	data: ChartTabularData
}

/**
 * Represents a dataset used in a chart.
 */
export interface DataSet {
	/**
	 * Label for the dataset.
	 * @type {string}
	 */
	label: string

	/**
	 * Array of hex background colors.
	 * @type {string[]}
	 */
	fillColors: string[]

	/**
	 * Array of data values.
	 * @type {any[]}
	 */
	data: any[]
}

/**
 * Represents the data structure for a chart.
 */
export interface ChartData {
	/**
	 * Labels for the x (horizontal) axis. Should match the number of items in each dataset data array.
	 * @type {string[]}
	 */
	labels: string[]

	/**
	 * Array of datasets to display in the chart.
	 * @type {DataSet[]}
	 */
	datasets: DataSet[]
}
