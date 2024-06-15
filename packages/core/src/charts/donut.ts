import { PieChart } from './pie'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import type { PieChartOptions } from '@/interfaces/charts'
import { Skeletons } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Donut } from '@/components/graphs/donut'
import { Skeleton } from '@/components/graphs/skeleton'

export class DonutChart extends PieChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<PieChartOptions>) {
		super(holder, chartConfigs, true)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.donutChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	/**
	 * Retrieves the components to be rendered inside the graph frame.
	 *
	 * @returns {Component[]} An array of components to be rendered.
	 */
	getComponents() {
		const graphFrameComponents: Component[] = [
			new Donut(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.DONUT
			})
		]

		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
