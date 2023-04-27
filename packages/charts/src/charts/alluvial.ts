// Internal Imports
import { Chart } from '../chart'
import { AlluvialChartModel } from '../model/alluvial'
import { options } from '../configuration'
import type { ChartConfig, AlluvialChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'

// Components
import { Alluvial } from '../components/index'

export class AlluvialChart extends Chart {
	model = new AlluvialChartModel(this.services)

	constructor(holder: Element, chartConfigs: ChartConfig<AlluvialChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.alluvialChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any = [new Alluvial(this.model, this.services)]

		const components: any[] = this.getChartComponents(graphFrameComponents, {
			excludeLegend: true
		})
		return components
	}
}
