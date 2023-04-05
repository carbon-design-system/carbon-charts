import {
	GroupedBarChart as GroupedBarChartCore,
	type BarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class GroupedBarChart extends BaseChart<BarChartOptions> {
	declare chartRef: HTMLDivElement

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
