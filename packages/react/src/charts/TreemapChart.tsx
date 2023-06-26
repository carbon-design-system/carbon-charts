import {
	TreemapChart as TreemapChartCore,
	type TreemapChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class TreemapChart extends BaseChart<TreemapChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: TreemapChartOptions) {
		return new TreemapChartCore(chartRef, { data, options })
	}
}
