import { StackedBarChart as StackedBarChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class StackedBarChart extends BaseChart<interfaces.StackedBarChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.StackedBarChartOptions>
	declare chart: StackedBarChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new StackedBarChartCore(this.chartRef, {
				data: this.props.data,
				options: this.props.options
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
