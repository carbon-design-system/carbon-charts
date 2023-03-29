import {
	DonutChart as DonutChartCore,
	type DonutChartOptions,
	type ChartConfig,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class DonutChart extends BaseChart<DonutChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<DonutChartOptions>
	declare chart: DonutChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new DonutChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as DonutChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
