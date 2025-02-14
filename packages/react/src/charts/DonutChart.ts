import {
	DonutChart as DonutChartCore,
	type DonutChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class DonutChart extends BaseChart<DonutChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: DonutChartOptions) {
		return new DonutChartCore(chartRef, { data, options })
	}
}
