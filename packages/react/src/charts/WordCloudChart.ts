import {
	WordCloudChart as WordCloudChartCore,
	type WordCloudChartOptions,
	type WorldCloudChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class WordCloudChart extends BaseChart<
	WordCloudChartOptions | WorldCloudChartOptions
> {
	createChart(
		chartRef: HTMLDivElement,
		data: ChartTabularData,
		options: WordCloudChartOptions | WorldCloudChartOptions
	) {
		return new WordCloudChartCore(chartRef, { data, options })
	}
}
