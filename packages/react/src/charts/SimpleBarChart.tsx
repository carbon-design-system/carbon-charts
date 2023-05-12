import {
	SimpleBarChart as SimpleBarChartCore,
	type BarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class SimpleBarChart extends BaseChart<BarChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: BarChartOptions) {
		return new SimpleBarChartCore(chartRef, { data, options })
	}
}
