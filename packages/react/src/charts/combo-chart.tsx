import React from 'react'
import {
	ComboChart as ComboChartCore,
	type ComboChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class ComboChart extends BaseChart<ComboChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new ComboChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as ComboChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
