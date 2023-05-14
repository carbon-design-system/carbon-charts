import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import { type BarChartOptions, type ChartConfig, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Grid, GroupedBar, TwoDimensionalAxes, ZeroLine, Skeleton } from '../components'

export class GroupedBarChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BarChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.groupedBarChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new GroupedBar(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
