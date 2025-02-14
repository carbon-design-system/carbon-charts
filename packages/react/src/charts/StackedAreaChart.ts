import {
	StackedAreaChart as StackedAreaChartCore,
	type StackedAreaChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class StackedAreaChart extends BaseChart<StackedAreaChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: StackedAreaChartOptions) {
		return new StackedAreaChartCore(chartRef, { data, options })
	}
}
