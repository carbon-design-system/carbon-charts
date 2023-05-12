import React from 'react'
import {
	BoxplotChart as BoxplotChartCore,
	type BoxplotChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class BoxplotChart extends BaseChart<BoxplotChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BoxplotChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BoxplotChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
