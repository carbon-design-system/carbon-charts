import { type StackedAreaChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'
import { addZoomBarToOptions } from '../zoombar'

const vanilla = 'StackedAreaChart'
export const chartTypesStacked: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: ['StackedAreaChartComponent', 'ibm-stacked-area-chart'],
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

const optionsPercentage: StackedAreaChartOptions = {
	title: 'Time Series (Percentage)',
	axes: {
		left: {
			stacked: true,
			percentage: true,
			ticks: {
				formatter: (tick: number | Date) => `${tick as number}%`
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

const optionsUneven: StackedAreaChartOptions = {
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

const areaStackedToolbarChanges: StackedAreaChartOptions = {
	title: 'Vertical stacked area (time series) w/toolbar override',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	},
	toolbar: {
		enabled: true,
		numberOfIcons: 3,
		controls: [
			{
				type: 'Zoom in'
			},
			{
				type: 'Zoom out'
			},
			{
				type: 'Reset zoom'
			},
			{
				type: 'Custom',
				text: 'Custom button',
				iconSVG: {
					content:
						'<path d="M23,13H18v2h5v2H19a2,2,0,0,0-2,2v2a2,2,0,0,0,2,2h6V15A2,2,0,0,0,23,13Zm0,8H19V19h4Z"/>\n\t\t\t\t<path d="M13,9H9a2,2,0,0,0-2,2V23H9V18h4v5h2V11A2,2,0,0,0,13,9ZM9,16V11h4v5Z"/><rect data-name="&lt;Transparent Rectangle&gt;" width="32" height="32" style="fill: none"/>'
				}
			}
		]
	},
	zoomBar: {
		top: {
			enabled: true
		}
	},
	height: '400px'
}

const areaStackedToolbarChangesData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 10000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-05T05:00:00.000Z',
		value: 65000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-08T05:00:00.000Z',
		value: 10000
	},
	{
		group: 'Dataset 1',
		date: '2019-01-13T05:00:00.000Z',
		value: 49213
	},
	{
		group: 'Dataset 1',
		date: '2019-01-17T05:00:00.000Z',
		value: 51213
	},
	{
		group: 'Dataset 2',
		date: '2019-01-03T05:00:00.000Z',
		value: 75000
	},
	{
		group: 'Dataset 2',
		date: '2019-01-06T05:00:00.000Z',
		value: 57312
	},
	{
		group: 'Dataset 2',
		date: '2019-01-08T05:00:00.000Z',
		value: 21432
	},
	{
		group: 'Dataset 2',
		date: '2019-01-15T05:00:00.000Z',
		value: 70323
	},
	{
		group: 'Dataset 2',
		date: '2019-01-19T05:00:00.000Z',
		value: 21300
	},
	{
		group: 'Dataset 3',
		date: '2019-01-01T05:00:00.000Z',
		value: 50000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-05T05:00:00.000Z',
		value: 15000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-08T05:00:00.000Z',
		value: 20000
	},
	{
		group: 'Dataset 3',
		date: '2019-01-13T05:00:00.000Z',
		value: 39213
	},
	{
		group: 'Dataset 3',
		date: '2019-01-17T05:00:00.000Z',
		value: 61213
	},
	{
		group: 'Dataset 4',
		date: '2019-01-02T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 4',
		date: '2019-01-06T05:00:00.000Z',
		value: 37312
	},
	{
		group: 'Dataset 4',
		date: '2019-01-08T05:00:00.000Z',
		value: 51432
	},
	{
		group: 'Dataset 4',
		date: '2019-01-15T05:00:00.000Z',
		value: 40323
	},
	{
		group: 'Dataset 4',
		date: '2019-01-19T05:00:00.000Z',
		value: 31300
	}
]

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
		options,
		tags: ['test']
	},
	{
		data,
		options: optionsPercentage,
		tags: ['test']
	},
	{
		data: dataUneven,
		options: optionsUneven,
		tags: ['test']
	},
	{
		data: areaStackedToolbarChangesData,
		options: areaStackedToolbarChanges,
		tags: ['test', 'toolbar', 'time', 'zoombar']
	}
]
