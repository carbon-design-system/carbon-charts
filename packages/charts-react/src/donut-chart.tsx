import { DonutChart as DonutChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class DonutChart extends BaseChart<interfaces.DonutChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.DonutChartOptions>
	declare chart: DonutChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new DonutChartCore(this.chartRef, {
				data: this.props.data,
				options: this.props.options
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
