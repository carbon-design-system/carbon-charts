import React from 'react'
import {
	WordCloudChart as WordCloudChartCore,
	type WorldCloudChartOptions,
	type ChartTabularData
} from '@carbon/charts'
import BaseChart from './base-chart'
import { hasChartBeenInitialized } from './utils'

export default class WordCloudChart extends BaseChart<WorldCloudChartOptions> {
	declare chartRef: HTMLDivElement

	componentDidMount() {
		if (hasChartBeenInitialized(this.chartRef) === false) {
			this.chart = new WordCloudChartCore(this.chartRef, {
				data: this.props.data as ChartTabularData,
				options: this.props.options as WorldCloudChartOptions
			})
		}
	}

	render() {
		return <div ref={(chartRef) => (this.chartRef = chartRef!)} className="chart-holder"></div>
	}
}
