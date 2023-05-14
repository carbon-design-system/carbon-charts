import { Chart } from '../chart'
import { options } from '../configuration'
import type { ChartConfig, GaugeChartOptions } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { GaugeChartModel } from '../model'
import { type Component, Gauge } from '../components'

export class GaugeChart extends Chart {
	model = new GaugeChartModel(this.services)
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<GaugeChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.gaugeChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new Gauge(this.model, this.services)]

		const components: Component[] = this.getChartComponents(graphFrameComponents)

		return components
	}
}
