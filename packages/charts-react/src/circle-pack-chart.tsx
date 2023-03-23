import { CirclePackChart as CirclePackChartCore, type CirclePackChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class CirclePackChart extends BaseChart<CirclePackChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<CirclePackChartOptions>
	declare chart: CirclePackChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new CirclePackChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as CirclePackChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
