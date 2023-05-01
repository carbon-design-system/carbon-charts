// Internal Imports
import { PieChart } from './pie'
import { options } from '../configuration'
import type { ChartConfig, PieChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'
import { Skeletons } from '../interfaces/enums'

// Components
import { Donut, Skeleton } from '../components/index'

export class DonutChart extends PieChart {
	constructor(holder: Element, chartConfigs: ChartConfig<PieChartOptions>) {
		super(holder, chartConfigs, true)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.donutChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new Donut(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.DONUT
			})
		]

		const components: any[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
