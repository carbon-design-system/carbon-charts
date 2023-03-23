import { TreeChart as TreeChartCore, type TreeChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class TreeChart extends BaseChart<TreeChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<TreeChartOptions>
	declare chart: TreeChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new TreeChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as TreeChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
