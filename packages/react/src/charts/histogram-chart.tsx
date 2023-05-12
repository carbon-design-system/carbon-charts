import React from 'react'
import {
	HistogramChart as HistogramChartCore,
	type HistogramChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class HistogramChart extends BaseChart<HistogramChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new HistogramChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as HistogramChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
