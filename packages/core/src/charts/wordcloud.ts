import { WordCloudModel } from '../model'
import { Chart } from '../chart'
import { options } from '../configuration'
import { type ChartConfig, type WorldCloudChartOptions, Skeletons } from '../interfaces'
import { mergeDefaultChartOptions } from '../tools'
import {type Component, Skeleton, WordCloud } from '../components'

export class WordCloudChart extends Chart {
	model = new WordCloudModel(this.services)

	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<WorldCloudChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.wordCloudChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: Component[] = [
			new WordCloud(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.PIE
			})
		]

		// get the base chart components and export with tooltip
		const components: Component[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
