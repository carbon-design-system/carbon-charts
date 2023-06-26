import {
	TreeChart as TreeChartCore,
	type TreeChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class TreeChart extends BaseChart<TreeChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: TreeChartOptions) {
		return new TreeChartCore(chartRef, { data, options })
	}
}
