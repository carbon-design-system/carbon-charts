import { StackedAreaChart as StackedAreaChartCore, type StackedAreaChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class StackedAreaChart extends BaseChart<StackedAreaChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<StackedAreaChartOptions>
	declare chart: StackedAreaChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new StackedAreaChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as StackedAreaChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
