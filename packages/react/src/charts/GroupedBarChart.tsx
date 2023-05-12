import {
	GroupedBarChart as GroupedBarChartCore,
	type BarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class GroupedBarChart extends BaseChart<BarChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: BarChartOptions) {
		return new GroupedBarChartCore(chartRef, { data, options })
	}
}
