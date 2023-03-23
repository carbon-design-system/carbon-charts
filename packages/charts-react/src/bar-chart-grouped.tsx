import { GroupedBarChart as GroupedBarChartCore, type BarChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class GroupedBarChart extends BaseChart<BarChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<BarChartOptions>
	declare chart: GroupedBarChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new GroupedBarChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BarChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
