import {
	AreaChart as AreaChartCore,
	type AreaChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class AreaChart extends BaseChart<AreaChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: AreaChartOptions) {
		return new AreaChartCore(chartRef, { data, options })
	}
}
