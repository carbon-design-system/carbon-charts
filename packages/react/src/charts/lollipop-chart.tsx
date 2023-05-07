import React from 'react'
import {
	LollipopChart as LollipopChartCore,
	type LollipopChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class LollipopChart extends BaseChart<LollipopChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new LollipopChartCore(this.chartRef!, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as LollipopChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
