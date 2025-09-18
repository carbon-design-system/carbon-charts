import {
	CirclePackChart as CirclePackChartCore,
	type CirclePackChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class CirclePackChart extends BaseChart<CirclePackChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: CirclePackChartOptions) {
		return new CirclePackChartCore(chartRef, { data, options })
	}
}
