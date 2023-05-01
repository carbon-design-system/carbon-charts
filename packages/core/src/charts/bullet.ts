// Internal Imports
import { AxisChart } from '../axis-chart'
import { BulletChartModel } from '../model/bullet'
import { options } from '../configuration'
import type { ChartConfig, BulletChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'
import { Skeletons } from '../interfaces/enums'

// Components
import { Bullet, Grid, TwoDimensionalAxes, Skeleton } from '../components/index'

export class BulletChart extends AxisChart {
	model = new BulletChartModel(this.services)

	constructor(holder: Element, chartConfigs: ChartConfig<BulletChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.bulletChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Bullet(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: any[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
