import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import { Skeletons } from '@/interfaces/enums'
import type { BubbleChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { Ruler } from '@/components/axes/ruler'
import { Bubble } from '@/components/graphs/bubble'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Skeleton } from '@/components/graphs/skeleton'

export class BubbleChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BubbleChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.bubbleChart, chartConfigs.options))

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
			new Ruler(this.model, this.services),
			new Bubble(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
