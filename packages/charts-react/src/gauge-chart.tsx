import {
	GaugeChart as GaugeChartCore,
	type GaugeChartOptions,
	type ChartConfig,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class GaugeChart extends BaseChart<GaugeChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<GaugeChartOptions>
	declare chart: GaugeChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new GaugeChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as GaugeChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
