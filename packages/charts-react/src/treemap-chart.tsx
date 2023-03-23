import React from 'react'
import { TreemapChart as TreemapChartCore, type TreemapChartOptions, type ChartConfig, type ChartTabularData } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class TreemapChart extends BaseChart<TreemapChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: ChartConfig<TreemapChartOptions>
	declare chart: TreemapChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new TreemapChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as TreemapChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
