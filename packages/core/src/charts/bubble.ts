import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import { type ChartConfig, type BubbleChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Grid, Ruler, Bubble, TwoDimensionalAxes, Skeleton } from '../components'

export class BubbleChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BubbleChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.bubbleChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Ruler(this.model, this.services),
			new Bubble(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
