import {
	BoxplotChart as BoxplotChartCore,
	type BoxplotChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class BoxplotChart extends BaseChart<BoxplotChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: BoxplotChartOptions) {
		return new BoxplotChartCore(chartRef, { data, options })
	}
}
