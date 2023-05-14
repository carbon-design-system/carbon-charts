import { Chart } from '../chart'
import { AlluvialChartModel } from '../model'
import { options } from '../configuration'
import type { ChartConfig, AlluvialChartOptions } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { Alluvial, type Component } from '../components'

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

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Alluvial(this.model, this.services)]

		const components: Component[] = this.getChartComponents(graphFrameComponents, {
			excludeLegend: true
		})
		return components
	}
}
