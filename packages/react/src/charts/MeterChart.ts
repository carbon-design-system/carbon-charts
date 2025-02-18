import {
	MeterChart as MeterChartCore,
	type MeterChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './BaseChart'

export default class MeterChart extends BaseChart<MeterChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: MeterChartOptions) {
		return new MeterChartCore(chartRef, { data, options })
	}
}
