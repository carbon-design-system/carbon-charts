import { type StackedAreaChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'StackedAreaChart'
export const chartTypesStacked: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-stacked-area-chart',
	vue: `Ccv${vanilla}`
}

const options: StackedAreaChartOptions = {
	title: 'Time Series',
	axes: {
		left: {
			stacked: true,
			scaleType: ScaleTypes.LINEAR,
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const optionsPercentage = {
	title: 'Time Series (Percentage)',
	axes: {
		left: {
			stacked: true,
			percentage: true,
			ticks: {
				formatter: (d: number) => `${d}%`
			}
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const optionsUneven = {
	title: 'Time Series (Uneven Data)',
	axes: {
		left: {
			stacked: true
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const data: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-05', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-13', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-05', value: 25000 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 60000 },
	{ group: 'Dataset 2', date: '2023-01-13', value: 30213 },
	{ group: 'Dataset 2', date: '2023-01-17', value: 55213 },
	{ group: 'Dataset 3', date: '2023-01-01', value: 30000 },
	{ group: 'Dataset 3', date: '2023-01-05', value: 20000 },
	{ group: 'Dataset 3', date: '2023-01-08', value: 40000 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 60213 },
	{ group: 'Dataset 3', date: '2023-01-17', value: 25213 }
]

const dataUneven: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-13', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-05', value: 25000 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 60000 },
	{ group: 'Dataset 2', date: '2023-01-17', value: 55213 },
	{ group: 'Dataset 3', date: '2023-01-01', value: 30000 },
	{ group: 'Dataset 3', date: '2023-01-05', value: 20000 },
	{ group: 'Dataset 3', date: '2023-01-08', value: 40000 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 60213 },
	{ group: 'Dataset 3', date: '2023-01-17', value: 25213 }
]

export const examplesStacked: Example[] = [
	{
		data,
		options
	},
	{
		data,
		options: optionsPercentage
	},
	{
		data: dataUneven,
		options: optionsUneven
	}
]
