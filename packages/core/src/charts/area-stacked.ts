import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { Component } from '@/components/component'
import type { ChartConfig } from '@/interfaces/model'
import type { AreaChartOptions } from '@/interfaces/charts'
import { Skeletons } from '@/interfaces/enums'
import { Grid } from '@/components/axes/grid'
import { StackedArea } from '@/components/graphs/area-stacked'
import { StackedRuler } from '@/components/axes/ruler-stacked'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Line } from '@/components/graphs/line'
import { StackedScatter } from '@/components/graphs/scatter-stacked'
import { Skeleton } from '@/components/graphs/skeleton'

export class StackedAreaChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.stackedAreaChart, chartConfigs.options))

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
