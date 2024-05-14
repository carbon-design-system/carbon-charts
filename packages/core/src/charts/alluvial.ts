import { Chart } from '@/chart'
import { AlluvialChartModel } from '@/model/alluvial'
import { options } from '@/configuration'
import type { ChartConfig } from '@/interfaces/model'
import type { AlluvialChartOptions } from '@/interfaces/charts'
import { mergeDefaultChartOptions } from '@/tools'
import { Alluvial } from '@/components/graphs/alluvial'
import type { Component } from '@/components/component'

export class AlluvialChart extends Chart {
	model = new AlluvialChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<AlluvialChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.alluvialChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	/**
	 * Retrieves the components to be rendered inside the graph frame.
	 *
	 * @returns {Component[]} An array of components to be rendered.
	 */
	getComponents() {
		const graphFrameComponents: Component[] = [new Alluvial(this.model, this.services)]

		const components: Component[] = this.getChartComponents(graphFrameComponents, {
			excludeLegend: true
		})
		return components
	}
}
