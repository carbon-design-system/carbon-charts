import { ScatterChart } from '@/charts'
import type { ScatterChartOptions } from '@/interfaces/charts'
import { createChartHolder } from './tools'
import { ChartTabularData } from '@/interfaces/model'
import { groupedBarData, groupedBarOptions } from '@/demo/charts/bar'

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
