// Internal Imports
import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import type { BarChartOptions, ChartConfig } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'

import { Skeletons } from '../interfaces/enums'

// Components
import { Grid, GroupedBar, TwoDimensionalAxes, ZeroLine, Skeleton } from '../components/index'

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
		const graphFrameComponents: any[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new GroupedBar(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			})
		]

		const components: any[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
