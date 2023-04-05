import { AlluvialChart as AlluvialChartCore, type AlluvialChartOptions, type ChartTabularData } from '@carbon/charts';
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class AlluvialChart extends BaseChart<AlluvialChartOptions> {
	declare chartRef: HTMLDivElement

  componentDidMount() {
    if (!hasChartBeenInitialized(this.chartRef)) {
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
