import {
	RadarChart as RadarChartCore,
	type RadarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class RadarChart extends BaseChart<RadarChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: RadarChartOptions) {
		return new RadarChartCore(chartRef, { data, options })
	}
}
