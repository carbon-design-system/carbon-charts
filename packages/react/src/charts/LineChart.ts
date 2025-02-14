import {
	LineChart as LineChartCore,
	type LineChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class LineChart extends BaseChart<LineChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: LineChartOptions) {
		return new LineChartCore(chartRef, { data, options })
	}
}
