import { type AreaChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import { addZoomBarToOptions } from '../zoombar'
import type { AxisChartOptions } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'AreaChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-area-chart',
	vue: `Ccv${vanilla}`
}

const options: AreaChartOptions = {
	title: 'Time Series',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const optionsCurved: AreaChartOptions = {
	title: 'Time Series (Natural Curve)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveNatural',
	height: '400px'
}

const optionsDiscrete: AreaChartOptions = {
	title: 'Discrete Domain',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const optionsBounded: AreaChartOptions = {
	title: 'Time Series (Natural Curve, Bounded)',
	legend: {
		enabled: false
	},
	bounds: {
		upperBoundMapsTo: 'max',
		lowerBoundMapsTo: 'min'
	},
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveNatural',
	height: '400px'
}

const optionsSkeleton: AreaChartOptions = {
	...optionsBounded,
	title: 'Skeleton',
	data: {
		loading: true
	}
}

const optionsEmpty: AreaChartOptions = {
	title: 'No Data',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	},
	height: '400px'
}

const optionsMultipleBounded = {
	title: 'Multiple Bounded Areas (Natural Curve)',
	legend: {
		enabled: false
	},
	bounds: {
		upperBoundMapsTo: 'max',
		lowerBoundMapsTo: 'min'
	},
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: 'time',
			highlights: {
				highlightStartMapsTo: 'startHighlight',
				highlightEndMapsTo: 'endHighlight',
				labelMapsTo: 'label',
				data: [
					{
						startHighlight: new Date(2023, 0, 3),
						label: 'Custom formatter',
						endHighlight: new Date(2023, 0, 8)
					},
					{
						startHighlight: new Date(2023, 0, 13),
						label: 'Custom formatter',
						endHighlight: new Date(2023, 0, 14)
					}
				]
			}
		},
		left: {
			mapsTo: 'value',
			scaleType: 'linear'
		}
	},
	curve: 'curveNatural',
	height: '400px'
}

const optionsZoomBar: AreaChartOptions = addZoomBarToOptions(
	Object.assign({}, optionsMultipleBounded) as AxisChartOptions
)

const optionsSpark: AreaChartOptions = {
	title: 'Sparkline',
	height: '150px',
	grid: {
		x: {
			enabled: false
		},
		y: {
			enabled: false
		}
	},
	axes: {
		bottom: {
			visible: false,
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			visible: false,
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR
		}
	},
	color: {
		gradient: {
			enabled: true
		}
	},
	points: {
		enabled: false
	},
	legend: {
		enabled: false
	}
}

const data: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 0 },
	{ group: 'Dataset 1', date: '2023-01-06', value: 57312 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 21432 },
	{ group: 'Dataset 1', date: '2023-01-15', value: 70323 },
	{ group: 'Dataset 1', date: '2023-01-19', value: 21300 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 50000 },
	{ group: 'Dataset 2', date: '2023-01-05', value: 15000 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-13', value: 39213 },
	{ group: 'Dataset 2', date: '2023-01-19', value: 61213 },
	{ group: 'Dataset 3', date: '2023-01-02', value: 10 },
	{ group: 'Dataset 3', date: '2023-01-06', value: 37312 },
	{ group: 'Dataset 3', date: '2023-01-08', value: 51432 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 40323 },
	{ group: 'Dataset 3', date: '2023-01-19', value: 31300 }
]

const dataDiscrete: ChartTabularData = [
	{ group: 'Dataset 1', value: 10000, key: 'a' },
	{ group: 'Dataset 1', value: 65000, key: 'b' },
	{ group: 'Dataset 1', value: 10000, key: 'c' },
	{ group: 'Dataset 1', value: 49213, key: 'd' },
	{ group: 'Dataset 1', value: 51213, key: 'e' },
	{ group: 'Dataset 2', value: 20000, key: 'a' },
	{ group: 'Dataset 2', value: 25000, key: 'b' },
	{ group: 'Dataset 2', value: 60000, key: 'c' },
	{ group: 'Dataset 2', value: 30213, key: 'd' },
	{ group: 'Dataset 2', value: 55213, key: 'e' },
	{ group: 'Dataset 3', value: 30000, key: 'a' },
	{ group: 'Dataset 3', value: 20000, key: 'b' },
	{ group: 'Dataset 3', value: 40000, key: 'c' },
	{ group: 'Dataset 3', value: 60213, key: 'd' },
	{ group: 'Dataset 3', value: 25213, key: 'e' }
]

const dataCurved: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 0 },
	{ group: 'Dataset 1', date: '2023-01-06', value: -37312 },
	{ group: 'Dataset 1', date: '2023-01-08', value: -22392 },
	{ group: 'Dataset 1', date: '2023-01-15', value: -52576 },
	{ group: 'Dataset 1', date: '2023-01-19', value: 20135 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 47263 },
	{ group: 'Dataset 2', date: '2023-01-05', value: 14178 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 23094 },
	{ group: 'Dataset 2', date: '2023-01-13', value: 45281 },
	{ group: 'Dataset 2', date: '2023-01-19', value: -63954 }
]

const dataBounded: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2023-01-01',
		value: 47263,
		min: 40000,
		max: 50000
	},
	{
		group: 'Dataset 1',
		date: '2023-01-05',
		value: 14178,
		min: 10000,
		max: 20000
	},
	{
		group: 'Dataset 1',
		date: '2023-01-08',
		value: 23094,
		min: 10000,
		max: 25000
	},
	{
		group: 'Dataset 1',
		date: '2023-01-13',
		value: 45281,
		min: 42000,
		max: 50000
	},
	{
		group: 'Dataset 1',
		date: '2023-01-19',
		value: -63954,
		min: -70000,
		max: -10000
	}
]

const sparkLineData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2019-05-21T19:21:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:22:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:23:00.000Z', value: 5 },
	{ group: 'Dataset 1', date: '2019-05-21T19:24:00.000Z', value: 1 },
	{ group: 'Dataset 1', date: '2019-05-21T19:25:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:26:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:27:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:28:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:29:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:30:00.000Z', value: 0 },
	{ group: 'Dataset 1', date: '2019-05-21T19:31:00.000Z', value: 5 },
	{ group: 'Dataset 1', date: '2019-05-21T19:32:00.000Z', value: 5 },
	{ group: 'Dataset 1', date: '2019-05-21T19:33:00.000Z', value: 6 },
	{ group: 'Dataset 1', date: '2019-05-21T19:34:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:35:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:36:00.000Z', value: 6 },
	{ group: 'Dataset 1', date: '2019-05-21T19:38:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:39:00.000Z', value: 6 },
	{ group: 'Dataset 1', date: '2019-05-21T19:40:00.000Z', value: 0 },
	{ group: 'Dataset 1', date: '2019-05-21T19:41:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:42:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:43:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:44:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:45:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:46:00.000Z', value: 2 },
	{ group: 'Dataset 1', date: '2019-05-21T19:47:00.000Z', value: 4 },
	{ group: 'Dataset 1', date: '2019-05-21T19:48:00.000Z', value: 1 },
	{ group: 'Dataset 1', date: '2019-05-21T19:49:00.000Z', value: 1 },
	{ group: 'Dataset 1', date: '2019-05-21T19:50:00.000Z', value: 3 },
	{ group: 'Dataset 1', date: '2019-05-21T19:51:00.000Z', value: 2 }
]

export const examples: Example[] = [
	{
		data,
		options
	},
	{
		data: sparkLineData,
		options: optionsSpark
	},
	{
		data: dataDiscrete,
		options: optionsDiscrete
	},
	{
		data: dataCurved,
		options: optionsCurved
	},
	{
		data: dataBounded,
		options: optionsBounded
	},
	{
		data: dataBounded,
		options: optionsMultipleBounded
	},
	{
		data: dataBounded,
		options: optionsZoomBar
	},
	{
		data: dataBounded,
		options: optionsSkeleton
	},
	{ data: [], options: optionsEmpty }
]
