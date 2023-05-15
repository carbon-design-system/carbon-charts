import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { ChartModelBinned } from '@/model/binned-charts'
import type { HistogramChartOptions } from '@/interfaces/charts'
import type { ChartConfig } from '@/interfaces/model'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Histogram } from '@/components/graphs/histogram'
import { BinnedRuler } from '@/components/axes/ruler-binned'

export class HistogramChart extends AxisChart {
	model = new ChartModelBinned(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<HistogramChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.histogramChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)

		this.update()
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new BinnedRuler(this.model, this.services),
			new Histogram(this.model, this.services)
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)

		return components
	}
}
