import React from 'react'
import {
	HeatmapChart as HeatmapChartCore,
	type HeatmapChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class HeatmapChart extends BaseChart<HeatmapChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new HeatmapChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as HeatmapChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
