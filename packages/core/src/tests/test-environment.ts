import { ScatterChart } from '@/charts'
import type { BarChartOptions, ScatterChartOptions } from '@/interfaces/charts'
import { createChartHolder } from './tools'
import { type ChartTabularData } from '@/interfaces/model'
import { ScaleTypes } from '@/interfaces/enums'

const groupedBarData: ChartTabularData = []
const groupedBarOptions: BarChartOptions = {
	title: 'Pre-selected groups (grouped bar)',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3']
	},
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		}
	},
	height: '400px'
}

type ChartOptionsUpdater = (options: ScatterChartOptions) => ScatterChartOptions

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

	render(animate = false) {
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
	setChartOptions(func: ChartOptionsUpdater) {
		this.chartOptions = func(this.chartOptions)
	}

	getChartReference() {
		return this.chart
	}
}
