import React from 'react'
import {
	BubbleChart as BubbleChartCore,
	type BubbleChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class BubbleChart extends BaseChart<BubbleChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BubbleChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BubbleChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
