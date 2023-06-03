import {
	ExperimentalChoroplethChart as ChoroplethChartCore,
	type ChoroplethChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class ExperimentalChoroplethChart extends BaseChart<ChoroplethChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: ChoroplethChartOptions) {
		return new ChoroplethChartCore(chartRef, { data, options })
	}
}
