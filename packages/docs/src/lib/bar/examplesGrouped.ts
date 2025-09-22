import { type BarChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'GroupedBarChart'
export const chartTypesGrouped: ChartTypes = {
	vanilla,
	svelte: 'BarChartGrouped',
	react: vanilla,
	angular: ['GroupedBarChartComponent', 'ibm-grouped-bar-chart'],
	vue: `Ccv${vanilla}`
}

// Grouped bar with selected groups option
const groupedBarSelectedGroupsOptions: BarChartOptions = {
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

const groupedBarOptions: BarChartOptions = {
	title: 'Vertical grouped bar (discrete)',
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

// Vertical Grouped Time Series
const groupedBarTimeSeriesOptions: BarChartOptions = {
	title: 'Vertical grouped bar (time series)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	},
	height: '400px'
}

// Horizontal Grouped Time Series
const groupedBarHorizontalTimeSeriesOptions: BarChartOptions = {
	title: 'Horizontal grouped bar (time series)',
	axes: {
		left: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		bottom: {
			mapsTo: 'value'
		}
	},
	height: '400px'
}

// Vertical Grouped time series with dense data
const groupedBarTimeSeriesDenseOptions: BarChartOptions = {
	title: 'Vertical grouped bar (time series - dense data)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		}
	},
	height: '400px'
}

// grouped bar - empty state
const groupedBarEmptyStateOptions: BarChartOptions = {
	title: 'Vertical grouped bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	},
	height: '400px'
}

// grouped bar - skeleton
const groupedBarSkeletonOptions: BarChartOptions = {
	title: 'Vertical grouped bar (skeleton)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	},
	data: {
		loading: true
	},
	height: '400px'
}

// grouped horizontal bar - empty state
const groupedHorizontalBarEmptyStateOptions: BarChartOptions = {
	title: 'Horizontal grouped bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	},
	height: '400px'
}

// grouped horizontal bar - skeleton
const groupedHorizontalBarSkeletonOptions: BarChartOptions = {
	title: 'Horizontal grouped bar (skeleton)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	},
	data: {
		loading: true
	},
	height: '400px'
}

const groupedHorizontalBarOptions: BarChartOptions = {
	title: 'Horizontal grouped bar (discrete)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		bottom: {
			mapsTo: 'value'
		}
	},
	height: '400px'
}

const groupedBarData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: -29123 },
	{ group: 'Dataset 1', key: 'Sold', value: -35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: -21312 },
	{ group: 'Dataset 2', key: 'Sold', value: -56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: -21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: -12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: -12312 },
	{ group: 'Dataset 3', key: 'Misc', value: -34234 },
	{ group: 'Dataset 4', key: 'Qty', value: -32423 },
	{ group: 'Dataset 4', key: 'More', value: 21313 },
	{ group: 'Dataset 4', key: 'Sold', value: 64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24134 },
	{ group: 'Dataset 4', key: 'Misc', value: 24134 }
]

const groupedBarTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-02', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-03', value: 30000 },
	{ group: 'Dataset 1', date: '2023-01-06', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-07', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 8000 },
	{ group: 'Dataset 2', date: '2023-01-02', value: 67000 },
	{ group: 'Dataset 2', date: '2023-01-03', value: 15000 },
	{ group: 'Dataset 2', date: '2023-01-06', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-07', value: 45213 }
]

const groupedBarTimeSeriesDenseData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-02', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-03', value: 30000 },
	{ group: 'Dataset 1', date: '2023-01-06', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-07', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-09', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-10', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-11', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-12', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-13', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-14', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-15', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-16', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-18', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-19', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-20', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-21', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-22', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-23', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-24', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-25', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-26', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-27', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-28', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-29', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-30', value: 51213 },
	{ group: 'Dataset 1', date: '2023-01-31', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 8000 },
	{ group: 'Dataset 2', date: '2023-01-02', value: 67000 },
	{ group: 'Dataset 2', date: '2023-01-03', value: 15000 },
	{ group: 'Dataset 2', date: '2023-01-06', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-07', value: 45213 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-09', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-10', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-11', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-12', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-13', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-14', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-15', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-16', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-18', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-19', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-20', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-21', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-22', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-23', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-24', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-25', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-26', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-27', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-28', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-29', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-30', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-31', value: 51213 }
]

const groupedBarSelectedGroupsData: ChartTabularData = groupedBarData

const groupedHorizontalBarData: ChartTabularData = groupedBarData

const groupedBarCompactOptions: BarChartOptions = {
	title: 'Grouped bar  (preserveSpaceForMissingBars=false)',
	axes: {
		left: {
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		}
	},
	bars: {
		preserveSpaceForMissingBars: false
	},
	height: '400px'
}

// Data with missing bars for some groups to demonstrate the compact feature
const groupedBarCompactData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Q1', value: 65000 },
	{ group: 'Dataset 1', key: 'Q2', value: 29123 },
	// Q3 missing for Dataset 1
	{ group: 'Dataset 1', key: 'Q4', value: 51213 },

	{ group: 'Dataset 2', key: 'Q1', value: 32432 },
	// Q2 missing for Dataset 2
	{ group: 'Dataset 2', key: 'Q3', value: 21312 },
	// Q4 missing for Dataset 2

	// Q1 missing for Dataset 3
	{ group: 'Dataset 3', key: 'Q2', value: 23232 },
	{ group: 'Dataset 3', key: 'Q3', value: 34232 },
	{ group: 'Dataset 3', key: 'Q4', value: 12312 },

	{ group: 'Dataset 4', key: 'Q1', value: 32423 },
	// Q2 and Q3 missing for Dataset 4
	{ group: 'Dataset 4', key: 'Q4', value: 24134 },

	{ group: 'Dataset 5', key: 'Q2', value: 18500 },
	{ group: 'Dataset 5', key: 'Q3', value: 42100 },
	// Q1 and Q4 missing for Dataset 5

	{ group: 'Dataset 6', key: 'Q1', value: 55600 }
	// Q2, Q3, and Q4 missing for Dataset 6
]

const noData: ChartTabularData = []

export const examplesGrouped: Example[] = [
	{
		options: groupedBarSelectedGroupsOptions,
		data: groupedBarSelectedGroupsData,
		tags: ['test', 'legend']
	},
	{
		options: groupedBarOptions,
		data: groupedBarData,
		tags: ['test']
	},
	{
		options: groupedBarCompactOptions,
		data: groupedBarCompactData,
		tags: ['test', 'compact']
	},
	{
		options: groupedBarTimeSeriesOptions,
		data: groupedBarTimeSeriesData,
		tags: ['test']
	},
	{
		options: groupedBarTimeSeriesDenseOptions,
		data: groupedBarTimeSeriesDenseData
	},
	{
		options: groupedBarEmptyStateOptions,
		data: noData,
		tags: ['empty']
	},
	{
		options: groupedBarSkeletonOptions,
		data: noData,
		tags: ['skeleton']
	},
	{
		options: groupedHorizontalBarOptions,
		data: groupedHorizontalBarData,
		tags: ['test']
	},
	{
		options: groupedBarHorizontalTimeSeriesOptions,
		data: groupedBarTimeSeriesData,
		tags: ['test']
	},
	{
		options: groupedHorizontalBarEmptyStateOptions,
		data: noData,
		tags: ['empty']
	},
	{
		options: groupedHorizontalBarSkeletonOptions,
		data: noData,
		tags: ['skeleton']
	}
]
