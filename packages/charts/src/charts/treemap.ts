// Internal Imports
import { Chart } from '../chart'
import { TreemapChartModel } from '../model/treemap'
import type { ChartConfig, TreemapChartOptions } from '../interfaces/index'
import * as Configuration from '../configuration'
import * as Tools from '../tools'

// Components
import { Treemap } from '../components/index'

export class TreemapChart extends Chart {
	model = new TreemapChartModel(this.services)

	constructor(holder: Element, chartConfigs: ChartConfig<TreemapChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(Configuration.options.treemapChart, chartConfigs.options)
		)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [new Treemap(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
