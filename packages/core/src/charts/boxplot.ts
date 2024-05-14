import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { BoxplotChartModel } from '@/model/boxplot'
import type { BoxplotChartOptions } from '@/interfaces/charts'
import type { ChartConfig } from '@/interfaces/model'
import { Skeletons } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { Boxplot } from '@/components/graphs/boxplot'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { ZeroLine } from '@/components/axes/zero-line'
import { Skeleton } from '@/components/graphs/skeleton'

export class BoxplotChart extends AxisChart {
	model = new BoxplotChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BoxplotChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.boxplotChart, chartConfigs.options))

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
			new Boxplot(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents, {
			legend: {
				enabled: false
			}
		})
		return components
	}
}
