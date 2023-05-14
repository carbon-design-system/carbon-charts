import { ChartModelBinned } from '../model'
import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import type { ChartConfig, HistogramChartOptions } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Grid, Histogram, BinnedRuler, TwoDimensionalAxes } from '../components'

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
