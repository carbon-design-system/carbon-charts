import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import type { LineChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { Ruler } from '@/components/axes/ruler'
import { Line } from '@/components/graphs/line'
import { Scatter } from '@/components/graphs/scatter'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { ZeroLine } from '@/components/axes/zero-line'
import { SkeletonLines } from '@/components/graphs/skeleton-lines'

export class LineChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<LineChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.lineChart, chartConfigs.options))

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
			new Scatter(this.model, this.services, { handleThresholds: true }),
			new SkeletonLines(this.model, this.services),
			new ZeroLine(this.model, this.services)
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
