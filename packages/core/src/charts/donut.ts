import { PieChart } from './pie'
import { options } from '../configuration'
import  { type ChartConfig, type PieChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Donut, Skeleton } from '../components'

export class DonutChart extends PieChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<PieChartOptions>) {
		super(holder, chartConfigs, true)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.donutChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new Donut(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.DONUT
			})
		]

		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
