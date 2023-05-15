import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import type { LollipopChartOptions } from '@/interfaces/charts'
import { Skeletons } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { Ruler } from '@/components/axes/ruler'
import { Scatter } from '@/components/graphs/scatter'
import { Lollipop } from '@/components/graphs/lollipop'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Skeleton } from '@/components/graphs/skeleton'

export class LollipopChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<LollipopChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.lollipopChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Ruler(this.model, this.services),
			new Lollipop(this.model, this.services),
			new Scatter(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
