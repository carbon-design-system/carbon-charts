import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import { Skeletons } from '@/interfaces/enums'
import type { BarChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Skeleton } from '@/components/graphs/skeleton'
import { ZeroLine } from '@/components/axes/zero-line'
import { SimpleBar } from '@/components/graphs/bar-simple'

export class SimpleBarChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BarChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.simpleBarChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new SimpleBar(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
