import {
	PieChart as PieChartCore,
	type PieChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class PieChart extends BaseChart<PieChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: PieChartOptions) {
		return new PieChartCore(chartRef, { data, options })
	}
}
