// Internal Imports
import { RadarChartModel } from '../model'
import { Chart } from '../chart'
import { options } from '../configuration'
import type { ChartConfig, RadarChartOptions } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Radar } from '../components'

export class RadarChart extends Chart {
	model = new RadarChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<RadarChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.radarChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Radar(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
