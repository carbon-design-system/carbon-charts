// Internal Imports
import { RadarChartModel } from '../model/radar'
import { Chart } from '../chart'
import { options } from '../configuration'
import type { ChartConfig, RadarChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'
import { Radar } from '../components/graphs/radar'

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
		const graphFrameComponents: any[] = [new Radar(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
