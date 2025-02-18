import {
	LollipopChart as LollipopChartCore,
	type LollipopChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class LollipopChart extends BaseChart<LollipopChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: LollipopChartOptions) {
		return new LollipopChartCore(chartRef, { data, options })
	}
}
