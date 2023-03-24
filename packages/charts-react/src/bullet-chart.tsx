import {
	BulletChart as BulletChartCore,
	type BulletChartOptions,
	type ChartConfig,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class BulletChart extends BaseChart<BulletChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<BulletChartOptions>
	declare chart: BulletChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BulletChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BulletChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
