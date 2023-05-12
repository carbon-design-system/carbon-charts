import {
	HeatmapChart as HeatmapChartCore,
	type HeatmapChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class HeatmapChart extends BaseChart<HeatmapChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: HeatmapChartOptions) {
		return new HeatmapChartCore(chartRef, { data, options })
	}
}
