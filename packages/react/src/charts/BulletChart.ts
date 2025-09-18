import {
	BulletChart as BulletChartCore,
	type BulletChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class BulletChart extends BaseChart<BulletChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: BulletChartOptions) {
		return new BulletChartCore(chartRef, { data, options })
	}
}
