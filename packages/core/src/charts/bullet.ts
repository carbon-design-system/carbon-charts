import { AxisChart } from '@/axis-chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { BulletChartModel } from '@/model/bullet'
import type { BulletChartOptions } from '@/interfaces/charts'
import type { ChartConfig } from '@/interfaces/model'
import { Skeletons } from '@/interfaces/enums'
import { Bullet } from '@/components/graphs/bullet'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Skeleton } from '@/components/graphs/skeleton'

export class BulletChart extends AxisChart {
	model = new BulletChartModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<BulletChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.bulletChart, chartConfigs.options))

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
			new Bullet(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			})
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
