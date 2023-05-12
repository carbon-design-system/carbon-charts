import React from 'react'
import {
	BulletChart as BulletChartCore,
	type BulletChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class BulletChart extends BaseChart<BulletChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new BulletChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as BulletChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => { if (chartRef) this.chartRef = chartRef }} className="chart-holder"></div>
	}
}
