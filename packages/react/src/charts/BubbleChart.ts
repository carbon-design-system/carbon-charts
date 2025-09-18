import {
	BubbleChart as BubbleChartCore,
	type BubbleChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class BubbleChart extends BaseChart<BubbleChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: BubbleChartOptions) {
		return new BubbleChartCore(chartRef, { data, options })
	}
}
