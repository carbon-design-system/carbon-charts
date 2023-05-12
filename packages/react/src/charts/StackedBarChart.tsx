import {
	StackedBarChart as StackedBarChartCore,
	type StackedBarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class StackedBarChart extends BaseChart<StackedBarChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: StackedBarChartOptions) {
		return new StackedBarChartCore(chartRef, { data, options })
	}
}
