import React from 'react'
import { WordCloudChart as WordCloudChartCore, type WorldCloudChartOptions, type ChartTabularData } from '@carbon/charts'
import BaseChart from './BaseChart'

export default class WordCloudChart extends BaseChart<WorldCloudChartOptions> {
	createChart(chartRef: HTMLDivElement, data: ChartTabularData, options: WorldCloudChartOptions) {
		return new WordCloudChartCore(chartRef, { data, options })
	}
}
