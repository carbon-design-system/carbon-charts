import {
	ChoroplethChart as ChoroplethChartCore,
	type ChoroplethChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class ChoroplethChart extends BaseChart<ChoroplethChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: ChoroplethChartOptions) {
		return new ChoroplethChartCore(chartRef, { data, options })
	}
}
