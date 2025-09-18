import {
	ComboChart as ComboChartCore,
	type ComboChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class ComboChart extends BaseChart<ComboChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: ComboChartOptions) {
		return new ComboChartCore(chartRef, { data, options })
	}
}
