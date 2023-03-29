import {
	StackedBarChart as StackedBarChartCore,
	type StackedBarChartOptions,
	type ChartConfig,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class StackedBarChart extends BaseChart<StackedBarChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<StackedBarChartOptions>
	declare chart: StackedBarChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new StackedBarChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as StackedBarChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
