import React from 'react'
import { TreemapChart as TreemapChartCore, type interfaces } from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class TreemapChart extends BaseChart<interfaces.TreemapChartOptions> {
	declare chartRef: HTMLDivElement
	declare props: interfaces.ChartConfig<interfaces.TreemapChartOptions>
	declare chart: TreemapChartCore

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new TreemapChartCore(this.chartRef, {
				data: this.props.data,
				options: this.props.options
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
