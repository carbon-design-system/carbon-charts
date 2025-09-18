import {
	AlluvialChart as AlluvialChartCore,
	type AlluvialChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class AlluvialChart extends BaseChart<AlluvialChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: AlluvialChartOptions) {
		return new AlluvialChartCore(chartRef, { data, options })
	}
}
