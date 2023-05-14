import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import { type ChartConfig, type AreaChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import type { Component } from '../components'

// Components
import {
	Grid,
	StackedArea,
	StackedRuler,
	TwoDimensionalAxes,
	Line,
	StackedScatter,
	Skeleton
} from '../components/index'

export class StackedAreaChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.stackedAreaChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new StackedRuler(this.model, this.services),
			new StackedArea(this.model, this.services),
			new Line(this.model, this.services, { stacked: true }),
			new StackedScatter(this.model, this.services, {
				fadeInOnChartHolderMouseover: true,
				handleThresholds: true,
				stacked: true
			}),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
