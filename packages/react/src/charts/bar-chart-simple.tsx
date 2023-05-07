import React from 'react'
import {
	SimpleBarChart as SimpleBarChartCore,
	type BarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class SimpleBarChart extends BaseChart<BarChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new SimpleBarChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BarChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
