import { LollipopChart as LollipopChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class LollipopChart extends BaseChart<interfaces.LollipopChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.LollipopChartOptions>
	declare chart: LollipopChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new LollipopChartCore(this.chartRef!, {
				data: this.props.data as any,
				options: this.props.options!
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
