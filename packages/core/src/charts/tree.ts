// Internal Imports
import { Chart } from '../chart'
import { TreeChartModel } from '../model/tree'
import { options } from '../configuration'
import type { ChartConfig, TreeChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'

// Components
import { Tree } from '../components/index'

export class TreeChart extends Chart {
	model = new TreeChartModel(this.services)

	constructor(holder: Element, chartConfigs: ChartConfig<TreeChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.treeChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [new Tree(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents, {
			excludeLegend: true
		})
		return components
	}
}
