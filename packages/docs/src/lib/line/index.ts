import {
	type LineChartOptions,
	type ChartTabularData,
	ScaleTypes,
	LegendPositions,
	LegendOrientations,
	TickRotations
} from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'LineChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-line-chart',
	vue: `Ccv${vanilla}`
}

const lineOptions: LineChartOptions = {
	title: 'Line (discrete)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
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

const lineLongLabelOptions: LineChartOptions = {
	title: 'Truncated labels (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
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

const lineCustomDomainOptions: LineChartOptions = {
	title: 'Custom domain (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS,
			domain: ['Qty', 'More', 'Misc']
		},
		left: {
			domain: [10000, 50000],
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const lineSelectedGroupsOptions: LineChartOptions = {
	title: 'Pre-selected groups (line)',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3']
	},
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
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

const lineCustomColorOptions: LineChartOptions = {
	title: 'Custom colors (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	color: {
		scale: {
			'Dataset 1': '#925699',
			'Dataset 2': '#525669',
			'Dataset 3': '#725699',
			'Dataset 4': '#ccc'
		}
	},
	height: '400px'
}

const lineTimeSeriesOptions: LineChartOptions = {
	title: 'Line (time series)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesWithThresholdsOptions: LineChartOptions = {
	title: 'Thresholds (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			thresholds: [
				{
					value: new Date(2019, 0, 11),
					label: 'Custom formatter',
					valueFormatter: (d: Date) =>
						new Intl.DateTimeFormat('en-CA', { month: 'short', day: '2-digit' }).format(d)
				}
			]
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR,
			thresholds: [
				{ value: 55000, label: 'Custom label', fillColor: 'orange' },
				{ value: 10000, fillColor: '#03a9f4' }
			]
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesDenseOptions: LineChartOptions = {
	title: 'Line (dense time series)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesRotatedTicksOptions: LineChartOptions = {
	title: 'Rotated ticks (line)',
	width: '400px',
	axes: {
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date',
			ticks: {
				rotation: TickRotations.ALWAYS
			}
		},
		left: {
			mapsTo: 'value'
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineLogAxisOptions: LineChartOptions = {
	title: 'Log Axis',
	width: '400px',
	axes: {
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LOG,
			includeZero: false
		}
	},
	height: '400px'
}

const lineEmptyStateOptions: LineChartOptions = {
	title: 'Line (empty state)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineSkeletonOptions: LineChartOptions = {
	title: 'Line (skeleton)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	data: {
		loading: true
	},
	height: '400px'
}

const dualLine: LineChartOptions = {
	title: 'Line + Line (dual axes)',
	axes: {
		left: {
			title: 'Temperature (°C)',
			mapsTo: 'temp'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date',
			title: 'Date'
		},
		right: {
			title: 'Rainfall (mm)',
			mapsTo: 'rainfall',
			correspondingDatasets: ['Rainfall']
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineOptionsLegendOrientation: LineChartOptions = {
	title: 'Left aligned vertical legend (line)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	legend: {
		position: LegendPositions.LEFT,
		orientation: LegendOrientations.VERTICAL
	},
	height: '400px'
}

const lineData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 }
]

const lineLongLabelData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{
		group: 'Dataset 1',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 42300
	},
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{
		group: 'Dataset 2',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 21400
	},
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{
		group: 'Dataset 3',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 1400
	},
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Qty', value: 22000 },
	{ group: 'LongLabelShouldBeTruncated', key: 'More', value: 1200 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Sold', value: 9000 },
	{
		group: 'LongLabelShouldBeTruncated',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 24000,
		audienceSize: 10
	},
	{
		group: 'LongLabelShouldBeTruncated',
		key: 'Misc',
		value: 3000,
		audienceSize: 10
	}
]

const lineSelectedGroupsData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 56000 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 }
]

export const lineTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: null },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 27432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 21300 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1), value: 40000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 5), value: null },
	{ group: 'Dataset 3', date: new Date(2019, 0, 8), value: 18000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 13), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 17), value: 61213 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 2), value: 20000 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 6), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 8), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 15), value: 25332 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 19), value: null }
]

const lineTimeSeriesDenseData: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: -10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 5), value: -12000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 10), value: -14000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: -25000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2, 2), value: -26000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: -10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3, 5), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3, 10), value: 12000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 45000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 49000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7, 15), value: 45000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9, 5), value: 52000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9, 15), value: 55000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 10), value: 50000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 12), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 80000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 14, 10), value: 85000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15, 7), value: 90000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15, 18), value: 70000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 3), value: 22000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 16), value: 24000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 35000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2, 7), value: 36000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3, 6), value: 20000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3, 18), value: 22000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 5), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7, 15), value: 52000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9), value: 60000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9, 5), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9, 10), value: 62000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 12), value: 65000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 14), value: 40000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 5), value: 45000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 10), value: 35000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15, 18), value: 30000 }
]

const lineTimeSeriesDataRotatedTicks: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 11, 30), value: 32100 },
	{ group: 'Dataset 1', date: new Date(2019, 11, 31), value: 23500 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 1), value: 53100 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 2), value: 42300 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 3), value: 12300 }
]

const lineLogAxisData: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 11, 30), value: 300100 },
	{ group: 'Dataset 1', date: new Date(2019, 11, 31), value: 235000 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 1), value: 153100 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 2), value: 142300 },
	{ group: 'Dataset 1', date: new Date(2020, 0, 3), value: 82300 }
]

const lineEmptyStateData: ChartTabularData = []
const lineSkeletonData: ChartTabularData = []

const lineTimeSeriesDualAxesData: ChartTabularData = [
	{ group: 'Temperature', date: new Date(2019, 0, 1), temp: 23 },
	{ group: 'Temperature', date: new Date(2019, 1, 1), temp: 15 },
	{ group: 'Temperature', date: new Date(2019, 2, 1), temp: 24 },
	{ group: 'Temperature', date: new Date(2019, 3, 1), temp: 33 },
	{ group: 'Temperature', date: new Date(2019, 4, 1), temp: 23 },
	{ group: 'Temperature', date: new Date(2019, 5, 1), temp: 32 },
	{ group: 'Temperature', date: new Date(2019, 6, 1), temp: 23 },
	{ group: 'Rainfall', date: new Date(2019, 0, 1), rainfall: 50 },
	{ group: 'Rainfall', date: new Date(2019, 1, 1), rainfall: 65 },
	{ group: 'Rainfall', date: new Date(2019, 2, 1), rainfall: 35 },
	{ group: 'Rainfall', date: new Date(2019, 3, 1), rainfall: 43 },
	{ group: 'Rainfall', date: new Date(2019, 4, 1), rainfall: 53 },
	{ group: 'Rainfall', date: new Date(2019, 5, 1), rainfall: 19 },
	{ group: 'Rainfall', date: new Date(2019, 6, 1), rainfall: 13 }
]

export const examples: Example[] = [
	{
		options: lineCustomDomainOptions,
		data: lineData
	},
	{
		options: lineTimeSeriesRotatedTicksOptions,
		data: lineTimeSeriesDataRotatedTicks
	},
	{
		options: lineLogAxisOptions,
		data: lineLogAxisData
	},
	{
		options: lineCustomColorOptions,
		data: lineData
	},
	{
		options: lineSelectedGroupsOptions,
		data: lineSelectedGroupsData
	},
	{
		options: lineOptionsLegendOrientation,
		data: lineData
	},
	{
		options: lineTimeSeriesWithThresholdsOptions,
		data: lineTimeSeriesData
	},
	{
		options: lineLongLabelOptions,
		data: lineLongLabelData
	},
	{
		options: lineOptions,
		data: lineData
	},
	{
		options: lineTimeSeriesOptions,
		data: lineTimeSeriesData
	},
	{
		options: lineTimeSeriesDenseOptions,
		data: lineTimeSeriesDenseData
	},
	{
		options: dualLine,
		data: lineTimeSeriesDualAxesData
	},
	{
		options: lineEmptyStateOptions,
		data: lineEmptyStateData
	},
	{
		options: lineSkeletonOptions,
		data: lineSkeletonData
	}
]
