import type { BaseChartOptions, ChartConfig, Charts, ChartTabularData } from '@carbon/charts'

export interface ChartProps<ChartType extends Charts, ChartOptionType extends BaseChartOptions> {
	/** Optional HTML ID for the chart container. */
	id?: string
	/** Tabular data for the chart. */
	data: ChartTabularData
	/** Chart configuration options (specific to chart type). */
	options: ChartOptionType
	/** Optional reference to the generated chart holder div. */
	ref?: HTMLDivElement
	/** Optional reference to the chart instance. */
	chart?: ChartType
	/** Optional callback triggered when the chart loads. */
	onload?: () => void
	/** Optional callback triggered when the chart updates. */
	onupdate?: (event: { data: ChartTabularData; options: ChartOptionType }) => void
	/** Optional callback triggered when the chart is destroyed. */
	ondestroy?: () => void
}

export interface BaseChartProps<ChartType extends Charts, ChartOptionType extends BaseChartOptions>
	extends ChartProps<ChartType, ChartOptionType> {
	/** Chart class to be instantiated. */
	Chart: new (holder: HTMLDivElement, chartConfigs: ChartConfig<ChartOptionType>) => ChartType
}
