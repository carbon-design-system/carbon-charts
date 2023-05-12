import React from 'react'
import {
	MeterChart as MeterChartCore,
	type MeterChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class MeterChart extends BaseChart<MeterChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new MeterChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as MeterChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
