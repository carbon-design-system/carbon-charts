import { AxisChart } from '../axis-chart'
import { BulletChartModel } from '../model'
import { options } from '../configuration'
import { type ChartConfig, type BulletChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import { Bullet, type Component, Grid, TwoDimensionalAxes, Skeleton } from '../components'

export class BulletChart extends AxisChart {
	model = new BulletChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BulletChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.bulletChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Bullet(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
