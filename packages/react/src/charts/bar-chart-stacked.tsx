import React from 'react'
import {
	StackedBarChart as StackedBarChartCore,
	type StackedBarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class StackedBarChart extends BaseChart<StackedBarChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new StackedBarChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as StackedBarChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
