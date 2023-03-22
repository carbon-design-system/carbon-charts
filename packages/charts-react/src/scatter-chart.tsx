import { ScatterChart as ScatterChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class ScatterChart extends BaseChart<interfaces.ScatterChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.ScatterChartOptions>
	declare chart: ScatterChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new ScatterChartCore(this.chartRef, {
				data: this.props.data as any,
				options: this.props.options!
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
