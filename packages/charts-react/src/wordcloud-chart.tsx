import { WordCloudChart as WordCloudChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class WordCloudChart extends BaseChart<interfaces.WorldCloudChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.WorldCloudChartOptions>
	declare chart: WordCloudChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new WordCloudChartCore(this.chartRef, {
				data: this.props.data,
				options: this.props.options
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
