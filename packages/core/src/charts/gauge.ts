import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import type { GaugeChartOptions } from '@/interfaces/charts'
import { GaugeChartModel } from '@/model/gauge'
import type { Component } from '@/components/component'
import { Gauge } from '@/components/graphs/gauge'

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
