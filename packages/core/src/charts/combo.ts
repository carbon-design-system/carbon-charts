import { AxisChart } from '@/axis-chart'
import { options as configOptions } from '@/configuration'
import { camelCase, flatten, merge, mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import { ChartTypes, Skeletons } from '@/interfaces/enums'
import type { ComboChartOptions } from '@/interfaces/charts'
import type { Component } from '@/components/component'
import { Grid } from '@/components/axes/grid'
import { TwoDimensionalAxes } from '@/components/axes/two-dimensional-axes'
import { Line } from '@/components/graphs/line'
import { Skeleton } from '@/components/graphs/skeleton'
import { SimpleBar } from '@/components/graphs/bar-simple'
import { GroupedBar } from '@/components/graphs/bar-grouped'
import { StackedRuler } from '@/components/axes/ruler-stacked'
import { Area } from '@/components/graphs/area'
import { Ruler } from '@/components/axes/ruler'
import { Scatter } from '@/components/graphs/scatter'
import { ZeroLine } from '@/components/axes/zero-line'
import { StackedArea } from '@/components/graphs/area-stacked'
import { StackedBar } from '@/components/graphs/bar-stacked'
import { StackedScatter } from '@/components/graphs/scatter-stacked'

const graphComponentsMap = {
	[ChartTypes.LINE]: [Line, Scatter],
	[ChartTypes.SCATTER]: [Scatter],
	[ChartTypes.AREA]: [Area, Line, Scatter],
	[ChartTypes.STACKED_AREA]: [StackedArea, Line, StackedScatter, StackedRuler],
	[ChartTypes.SIMPLE_BAR]: [SimpleBar],
	[ChartTypes.GROUPED_BAR]: [GroupedBar, ZeroLine],
	[ChartTypes.STACKED_BAR]: [StackedBar, StackedRuler]
}

export class ComboChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<ComboChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		const chartOptions = mergeDefaultChartOptions(configOptions.comboChart, chartConfigs.options)

		// Warn user if no comboChartTypes defined
		// Use skeleton chart instead
		if (!chartConfigs.options.comboChartTypes) {
			console.error('No comboChartTypes defined for the Combo Chart!')
			// add a default chart to get an empty chart
			chartOptions.comboChartTypes = [{ type: ChartTypes.LINE, correspondingDatasets: [] }]
		}

		// set the global options
		this.model.setOptions(chartOptions)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getGraphComponents() {
		const { comboChartTypes }: { comboChartTypes: Component[] } = this.model.getOptions()
		let counter = 0
		const graphComponents: Component[] = comboChartTypes
			.map((graph: any) => {
				const type = graph.type
				let options: any

				// initializes the components using input strings with the base configs for each chart
				if (typeof graph.type === 'string') {
					// check if it is in the components map
					// if it isn't then it is not a valid carbon chart to use in combo
					if (!Object.keys(graphComponentsMap).includes(graph.type)) {
						console.error(
							`Invalid chart type "${graph.type}" specified for combo chart. Please refer to the ComboChart tutorial for more guidance.`
						)
						return null
					}
					let stacked = false
					options = merge(
						{},
						configOptions[`${camelCase(graph.type)}Chart`],
						this.model.getOptions(),
						graph.options
					)
					// if we are creating a stacked area, the contained Line chart needs to know it is stacked
					if (graph.type === ChartTypes.STACKED_AREA) {
						stacked = true
					}
					return graphComponentsMap[graph.type].map(
						(Component: any) =>
							new Component(this.model, this.services, {
								groups: graph.correspondingDatasets,
								id: counter++,
								options: options,
								stacked
							})
					)
				} else {
					// user has imported a type or custom component to instantiate
					options = merge({}, this.model.getOptions(), graph.options)
					return new type(this.model, this.services, {
						groups: graph.correspondingDatasets,
						id: counter++,
						options: options
					})
				}
			})
			.filter((item: any) => item !== null)

		return flatten(graphComponents)
	}

	getComponents() {
		const { comboChartTypes } = this.model.getOptions()
		// don't add the regular ruler if stacked ruler is added
		const stackedRulerEnabled = comboChartTypes.some(
			(chartObject: any) =>
				chartObject.type === ChartTypes.STACKED_BAR || chartObject.type === ChartTypes.STACKED_AREA
		)

		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			}),
			...(stackedRulerEnabled ? [] : [new Ruler(this.model, this.services)]),
			...this.getGraphComponents()
		]

		const components: Component[] = this.getAxisChartComponents(graphFrameComponents)

		return components
	}
}
