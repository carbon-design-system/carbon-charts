import React from 'react'
import {
	AreaChart as AreaChartCore,
	type AreaChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class AreaChart extends BaseChart<AreaChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new AreaChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as AreaChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
