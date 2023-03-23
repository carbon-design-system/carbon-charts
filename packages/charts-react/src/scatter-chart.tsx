import { ScatterChart as ScatterChartCore, type ScatterChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class ScatterChart extends BaseChart<ScatterChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<ScatterChartOptions>
	declare chart: ScatterChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new ScatterChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as ScatterChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
