import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { PieChartModel } from '@/model/pie'
import type { ChartConfig } from '@/interfaces/model'
import type { PieChartOptions } from '@/interfaces/charts'
import { Skeletons } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Pie } from '@/components/graphs/pie'
import { Skeleton } from '@/components/graphs/skeleton'

export class PieChart extends Chart {
	model = new PieChartModel(this.services)

	// TODO - Optimize the use of "extending"
	constructor(
		holder: HTMLDivElement,
		chartConfigs: ChartConfig<PieChartOptions>,
		extending = false
	) {
		super(holder, chartConfigs)

		// TODO - Optimize the use of "extending"
		if (extending) {
			return
		}

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.pieChart, chartConfigs.options))

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
			new Pie(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.PIE
			})
		]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
