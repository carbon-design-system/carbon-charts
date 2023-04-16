// Internal Imports
import { WordCloudModel } from '../model/wordcloud'
import { Chart } from '../chart'
import { options } from '../configuration'
import type { ChartConfig, WorldCloudChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'
import { Skeletons } from '../interfaces/enums'

// Components
import {
	WordCloud,
	Skeleton
} from '../components/index'

export class WordCloudChart extends Chart {
	model = new WordCloudModel(this.services)

	constructor(holder: Element, chartConfigs: ChartConfig<WorldCloudChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			mergeDefaultChartOptions(options.wordCloudChart, chartConfigs.options)
		)

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new WordCloud(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.PIE
			})
		]

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents)
		return components
	}
}
