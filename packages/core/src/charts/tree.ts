import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { TreeChartModel } from '@/model/tree'
import type { ChartConfig } from '@/interfaces/model'
import type { TreeChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Tree } from '@/components/graphs/tree'

export class TreeChart extends Chart {
	model = new TreeChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<TreeChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.treeChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	/**
	 * Retrieves the components to be rendered inside the graph frame.
	 *
	 * @returns {Component[]} An array of components to be rendered.
	 */
	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Tree(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents, {
			excludeLegend: true
		})
		return components
	}
}
