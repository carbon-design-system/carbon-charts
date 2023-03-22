import { StackedAreaChart as StackedAreaChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class StackedAreaChart extends BaseChart<interfaces.StackedAreaChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.StackedAreaChartOptions>
	declare chart: StackedAreaChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new StackedAreaChartCore(this.chartRef, {
				data: this.props.data,
				options: this.props.options
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
