import {
	GaugeChart as GaugeChartCore,
	type GaugeChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class GaugeChart extends BaseChart<GaugeChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: GaugeChartOptions) {
		return new GaugeChartCore(chartRef, { data, options })
	}
}
