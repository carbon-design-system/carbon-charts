import {
	ScatterChart as ScatterChartCore,
	type ScatterChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class ScatterChart extends BaseChart<ScatterChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: ScatterChartOptions) {
		return new ScatterChartCore(chartRef, { data, options })
	}
}
