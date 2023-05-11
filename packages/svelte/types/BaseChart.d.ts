import type { SvelteComponentTyped } from 'svelte'
import { HTMLAttributes } from 'svelte/elements'
import type { BaseChartOptions, Chart as ChartCore, ChartTabularData, ChartTheme } from '@carbon/charts'

export interface BaseChartProps<
	Chart = ChartCore,
	ChartOptions = BaseChartOptions,
	ChartData = ChartTabularData
> extends HTMLAttributes<HTMLElementTagNameMap['div']> {
	/**
	 * Provide a Carbon Chart class to instantiate
	 * @default undefined
	 */
	Chart?: Chart

	/**
	 * Obtain a reference to the instantiated chart
	 * @default null
	 */
	chart?: Chart | null

	/**
	 * Set the chart data using the tabular data format
	 * @default []
	 */
	data?: ChartData

	/**
	 * Set the chart options
	 * @default {}
	 */
	options?: ChartOptions

	/**
	 * Specify the Carbon theme
	 * @default "white"
	 */
	theme?: ChartTheme // 'white' | 'g10' | 'g90' | 'g100'

	/**
	 * Specify the id for the chart holder element
	 * @default "chart-" + Math.random().toString(36)
	 */
	id?: string

	/**
	 * Obtain a reference to the chart holder element
	 * @default null
	 */
	ref?: null | HTMLDivElement
}

export default class BaseChart extends SvelteComponentTyped<
	BaseChartProps,
	{
		load: CustomEvent<Chart>
		update: CustomEvent<{
			data: ChartTabularData
			options: ChartOptions
		}>
		destroy: CustomEvent<any>
	},
	never
> {}
