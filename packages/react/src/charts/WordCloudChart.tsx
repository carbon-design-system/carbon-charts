import {
	WordCloudChart as WordCloudChartCore,
	type WordCloudChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class WordCloudChart extends BaseChart<WordCloudChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: WordCloudChartOptions) {
		return new WordCloudChartCore(chartRef, { data, options })
	}
}
