import { HistogramChart as HistogramChartCore, type HistogramChartOptions, type ChartConfig, type ChartTabularData} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class HistogramChart extends BaseChart<HistogramChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<HistogramChartOptions>
	declare chart: HistogramChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new HistogramChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as HistogramChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
