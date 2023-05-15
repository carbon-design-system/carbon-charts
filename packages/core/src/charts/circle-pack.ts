import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { CirclePackChartModel } from '@/model/circle-pack'
import type { ChartConfig } from '@/interfaces/model'
import type { CirclePackChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { CirclePack } from '@/components/graphs/circle-pack'

export class CirclePackChart extends Chart {
	model = new CirclePackChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<CirclePackChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.circlePackChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [new CirclePack(this.model, this.services)]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
