import React from 'react'
import {
	RadarChart as RadarChartCore,
	type RadarChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class RadarChart extends BaseChart<RadarChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new RadarChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as RadarChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
