import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import { WordCloudModel } from '@/model/wordcloud'
import type { ChartConfig } from '@/interfaces/model'
import type { WordCloudChartOptions } from '@/interfaces/charts'
import type { WorldCloudChartOptions } from '@/interfaces'
import { Skeletons } from '@/interfaces/enums'
import type { Component } from '@/components/component'
import { Skeleton } from '@/components/graphs/skeleton'
import { WordCloud } from '@/components/graphs/wordcloud'

export class WordCloudChart extends Chart {
	model = new WordCloudModel(this.services)

	constructor(
		holder: HTMLDivElement,
		chartConfigs: ChartConfig<WordCloudChartOptions | WorldCloudChartOptions>
	) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.wordCloudChart, chartConfigs.options))

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
