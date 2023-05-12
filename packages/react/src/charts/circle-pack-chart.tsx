import React from 'react'
import {
	CirclePackChart as CirclePackChartCore,
	type CirclePackChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class CirclePackChart extends BaseChart<CirclePackChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new CirclePackChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as CirclePackChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
