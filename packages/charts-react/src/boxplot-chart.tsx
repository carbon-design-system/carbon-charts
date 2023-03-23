import { BoxplotChart as BoxplotChartCore, type BoxplotChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class BoxplotChart extends BaseChart<BoxplotChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<BoxplotChartOptions>
	declare chart: BoxplotChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BoxplotChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BoxplotChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
