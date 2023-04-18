import { ScatterChart, ScatterChartOptions } from '../index'
import { createChartHolder } from './tools'
import { ChartTabularData } from '../interfaces'
import { groupedBarData, groupedBarOptions } from '../../demo/data'

export const data = groupedBarData as ChartTabularData

export const options = Object.assign(groupedBarOptions, {
	title: 'My chart',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3']
	}
}) as ScatterChartOptions

export class TestEnvironment {
	chartOptions = options
	chartData = data
	chart: ScatterChart

	render() {
		const holder = createChartHolder('scatter')

		this.chart = new ScatterChart(holder, {
			data: this.chartData,
			options: this.chartOptions
		})
	}

	destroy() {
		this.chart.destroy()
	}

	// Dead code
	// setChartOptions(func: Function) {
	// 	this.chartOptions = func(this.chartOptions)
	// }

	getChartReference() {
		return this.chart
	}
}
