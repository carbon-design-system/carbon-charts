import { PieChartModel } from '../model'
import { Chart } from '../chart'
import { options } from '../configuration'
import { type ChartConfig, type PieChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Pie, Skeleton } from '../components'

export class PieChart extends Chart {
	model = new PieChartModel(this.services)

	// TODO - Optimize the use of "extending"
	constructor(
		holder: HTMLDivElement,
		chartConfigs: ChartConfig<PieChartOptions>,
		extending = false
	) {
		super(holder, chartConfigs)

		// TODO - Optimize the use of "extending"
		if (extending) {
			return
		}

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.pieChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new Pie(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.PIE
			})
		]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
