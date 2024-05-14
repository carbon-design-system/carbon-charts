import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import { Skeletons } from '@/interfaces/enums'
import type { BarChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { StackedBar } from '@/components/graphs/bar-stacked'
import { StackedRuler } from '@/components/axes/ruler-stacked'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { ZeroLine } from '@/components/axes/zero-line'
import { Skeleton } from '@/components/graphs/skeleton'

export class StackedBarChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BarChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.stackedBarChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	/**
	 * Retrieves the components to be rendered inside the graph frame.
	 *
	 * @returns {Component[]} An array of components to be rendered.
	 */
	getComponents() {
		const graphFrameComponents: Component[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new StackedRuler(this.model, this.services),
			new StackedBar(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			}),
			new ZeroLine(this.model, this.services)
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
