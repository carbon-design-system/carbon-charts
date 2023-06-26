import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { TreemapChartModel } from '@/model/treemap'
import type { ChartConfig } from '@/interfaces/model'
import type { TreemapChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Treemap } from '@/components/graphs/treemap'

export class TreemapChart extends Chart {
	model = new TreemapChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<TreemapChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.treemapChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Treemap(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
