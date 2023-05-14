import { BoxplotChartModel } from '../model'
import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import { type BoxplotChartOptions, type ChartConfig, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { type Component, Grid, Boxplot, TwoDimensionalAxes, ZeroLine, Skeleton } from '../components'

export class BoxplotChart extends AxisChart {
	model = new BoxplotChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BoxplotChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.boxplotChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Boxplot(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents, {
			legend: {
				enabled: false
			}
		})
		return components
	}
}
