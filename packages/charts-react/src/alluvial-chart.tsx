import { AlluvialChart as AlluvialChartCore, type AlluvialChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class AlluvialChart extends BaseChart<AlluvialChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<AlluvialChartOptions>
	declare chart: AlluvialChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new AlluvialChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as AlluvialChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
