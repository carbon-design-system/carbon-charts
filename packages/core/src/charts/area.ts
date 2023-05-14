import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import { type ChartConfig, type AreaChartOptions, Skeletons } from '../interfaces'
import { clone, mergeDefaultChartOptions } from '../tools'
import { type Component, Grid, Area, Line, Ruler, Scatter, TwoDimensionalAxes, Skeleton } from '../components'

export class AreaChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(clone(options.areaChart), chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Ruler(this.model, this.services),
			new Line(this.model, this.services),
			new Area(this.model, this.services),
			new Scatter(this.model, this.services, {
				fadeInOnChartHolderMouseover: true,
				handleThresholds: true
			}),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
