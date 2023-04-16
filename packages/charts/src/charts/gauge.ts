// Internal Imports
import { Chart } from '../chart'
import { options } from '../configuration'
import type { ChartConfig, GaugeChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'
import { GaugeChartModel } from '../model/gauge'

// Components
import { Gauge } from '../components/index'

export class GaugeChart extends Chart {
	model = new GaugeChartModel(this.services)
	constructor(holder: Element, chartConfigs: ChartConfig<GaugeChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			mergeDefaultChartOptions(options.gaugeChart, chartConfigs.options)
		)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [new Gauge(this.model, this.services)]

		const components: any[] = this.getChartComponents(graphFrameComponents)

		return components
	}
}
