import { type BarChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'StackedBarChart'

export const chartTypesStacked: ChartTypes = {
	vanilla,
	svelte: 'BarChartStacked',
	react: vanilla,
	angular: 'ibm-stacked-bar-chart',
	vue: `Ccv${vanilla}`
}

const stackedBarOptions: BarChartOptions = {
	title: 'Vertical stacked bar (discrete)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		}
	},
	height: '400px'
}

const stackedBarAlwaysRulerTooltipOptions: BarChartOptions = {
	title: 'Stacked bar (tooltip.alwaysShowRulerTooltip=true)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		}
	},
	tooltip: {
		alwaysShowRulerTooltip: true
	},
	height: '400px'
}

const stackedBarNegativeOptions: BarChartOptions = Object.assign({}, stackedBarOptions, {
	title: 'Vertical stacked bar (divergent)'
})

const stackedHorizontalBarOptions: BarChartOptions = {
	title: 'Horizontal stacked bar (discrete)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {
			stacked: true
		}
	},
	height: '400px'
}

const stackedBarTimeSeriesOptions: BarChartOptions = {
	title: 'Vertical stacked bar (time series)',
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
	height: '400px'
}

const stackedBarShortIntervalTimeSeriesOptions: BarChartOptions = {
	title: 'Vertical stacked bar (short interval time series)',
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
	height: '400px'
}

const stackedBarTimeSeriesOptionsCustomTicks: BarChartOptions = {
	title: 'Custom ticks (stacked bar)',
	axes: {
		left: {
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			ticks: {
				values: [new Date(2023, 0, 17)]
			}
		}
	},
	height: '400px'
}

// Stacked horizontal bar (time series)
const stackedHorizontalBarTimeSeriesOptions: BarChartOptions = {
	title: 'Horizontal stacked bar (time series)',
	axes: {
		left: {
			scaleType: ScaleTypes.TIME
		},
		bottom: {
			stacked: true
		}
	},
	height: '400px'
}

// stacked bar - empty state
const stackedBarEmptyStateOptions: BarChartOptions = {
	title: 'Vertical stacked bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	},
	height: '400px'
}

// stacked bar - skeleton
const stackedBarSkeletonOptions: BarChartOptions = {
	title: 'Vertical stacked bar (skeleton)',
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

// stacked horizontal bar - empty state
const stackedHorizontalBarEmptyStateOptions: BarChartOptions = {
	title: 'Horizontal stacked bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	},
	height: '400px'
}

// stacked horizontal bar - skeleton
const stackedHorizontalBarSkeletonOptions: BarChartOptions = {
	title: 'Horizontal stacked bar (skeleton)',
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

const stackedBarEmptyStateData: ChartTabularData = []
const stackedBarSkeletonData: ChartTabularData = []
const stackedHorizontalBarEmptyStateData: ChartTabularData = []
const stackedHorizontalBarSkeletonData: ChartTabularData = []

// Stacked bar
const stackedBarData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: 29123 },
	{ group: 'Dataset 1', key: 'Sold', value: 35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: 21312 },
	{ group: 'Dataset 2', key: 'Sold', value: 56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: 12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: 12312 },
	{ group: 'Dataset 3', key: 'Misc', value: 34234 },
	{ group: 'Dataset 4', key: 'Qty', value: 32423 },
	{ group: 'Dataset 4', key: 'More', value: 21313 },
	{ group: 'Dataset 4', key: 'Sold', value: 64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24134 },
	{ group: 'Dataset 4', key: 'Misc', value: 32423 }
]

const stackedBarNegativeData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 65000 },
	{ group: 'Dataset 1', key: 'More', value: 29123 },
	{ group: 'Dataset 1', key: 'Sold', value: 35213 },
	{ group: 'Dataset 1', key: 'Restocking', value: 51213 },
	{ group: 'Dataset 1', key: 'Misc', value: 16932 },
	{ group: 'Dataset 2', key: 'Qty', value: 32432 },
	{ group: 'Dataset 2', key: 'More', value: 21312 },
	{ group: 'Dataset 2', key: 'Sold', value: 56456 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21312 },
	{ group: 'Dataset 2', key: 'Misc', value: 34234 },
	{ group: 'Dataset 3', key: 'Qty', value: 12312 },
	{ group: 'Dataset 3', key: 'More', value: 23232 },
	{ group: 'Dataset 3', key: 'Sold', value: 34232 },
	{ group: 'Dataset 3', key: 'Restocking', value: 12312 },
	{ group: 'Dataset 3', key: 'Misc', value: 34234 },
	{ group: 'Dataset 4', key: 'Qty', value: -32423 },
	{ group: 'Dataset 4', key: 'More', value: -21313 },
	{ group: 'Dataset 4', key: 'Sold', value: -64353 },
	{ group: 'Dataset 4', key: 'Restocking', value: -24134 },
	{ group: 'Dataset 4', key: 'Misc', value: -32423 }
]

const stackedHorizontalBarData = stackedBarData

const stackedBarTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-05', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-13', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-03', value: 75000 },
	{ group: 'Dataset 2', date: '2023-01-06', value: 57312 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 21432 },
	{ group: 'Dataset 2', date: '2023-01-15', value: 70323 },
	{ group: 'Dataset 2', date: '2023-01-19', value: 21300 },
	{ group: 'Dataset 3', date: '2023-01-01', value: 50000 },
	{ group: 'Dataset 3', date: '2023-01-05', value: 15000 },
	{ group: 'Dataset 3', date: '2023-01-08', value: 20000 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 39213 },
	{ group: 'Dataset 3', date: '2023-01-17', value: 61213 },
	{ group: 'Dataset 4', date: '2023-01-02', value: 10 },
	{ group: 'Dataset 4', date: '2023-01-06', value: 37312 },
	{ group: 'Dataset 4', date: '2023-01-08', value: 51432 },
	{ group: 'Dataset 4', date: '2023-01-15', value: 40323 },
	{ group: 'Dataset 4', date: '2023-01-19', value: 31300 }
]

const stackedBarShortIntervalTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01T08:05:06.111Z', value: 0 },
	{ group: 'Dataset 1', date: '2023-01-01T08:05:06.222Z', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-01T08:05:06.333Z', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-01T08:05:06.444Z', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-01T08:05:06.555Z', value: 0 },
	{ group: 'Dataset 2', date: '2023-01-01T08:05:06.111Z', value: 0 },
	{ group: 'Dataset 2', date: '2023-01-01T08:05:06.222Z', value: 57312 },
	{ group: 'Dataset 2', date: '2023-01-01T08:05:06.333Z', value: 21432 },
	{ group: 'Dataset 2', date: '2023-01-01T08:05:06.444Z', value: 70323 },
	{ group: 'Dataset 2', date: '2023-01-01T08:05:06.555Z', value: 0 },
	{ group: 'Dataset 3', date: '2023-01-01T08:05:06.111Z', value: 0 },
	{ group: 'Dataset 3', date: '2023-01-01T08:05:06.222Z', value: 15000 },
	{ group: 'Dataset 3', date: '2023-01-01T08:05:06.333Z', value: 20000 },
	{ group: 'Dataset 3', date: '2023-01-01T08:05:06.444Z', value: 39213 },
	{ group: 'Dataset 3', date: '2023-01-01T08:05:06.555Z', value: 0 },
	{ group: 'Dataset 4', date: '2023-01-01T08:05:06.111Z', value: 0 },
	{ group: 'Dataset 4', date: '2023-01-01T08:05:06.222Z', value: 37312 },
	{ group: 'Dataset 4', date: '2023-01-01T08:05:06.333Z', value: 51432 },
	{ group: 'Dataset 4', date: '2023-01-01T08:05:06.444Z', value: 40323 },
	{ group: 'Dataset 4', date: '2023-01-01T08:05:06.555Z', value: 0 }
]

const stackedBarTimeSeriesDataCustomTicks = stackedBarTimeSeriesData

const stackedHorizontalBarTimeSeriesData = stackedBarTimeSeriesData

export const examplesStacked: Example[] = [
	{
		options: stackedBarOptions,
		data: stackedBarData,
		tags: ['test']
	},
	{
		options: stackedBarAlwaysRulerTooltipOptions,
		data: stackedBarData,
		tags: ['test']
	},
	{
		options: stackedBarNegativeOptions,
		data: stackedBarNegativeData,
		tags: ['test']
	},
	{
		options: stackedBarTimeSeriesOptions,
		data: stackedBarTimeSeriesData,
		tags: ['test']
	},
	{
		options: stackedBarShortIntervalTimeSeriesOptions,
		data: stackedBarShortIntervalTimeSeriesData,
		tags: ['test']
	},
	{
		options: stackedBarEmptyStateOptions,
		data: stackedBarEmptyStateData,
		tags: ['empty']
	},
	{
		options: stackedBarSkeletonOptions,
		data: stackedBarSkeletonData,
		tags: ['skeleton']
	},
	{
		options: stackedHorizontalBarOptions,
		data: stackedHorizontalBarData,
		tags: ['test']
	},
	{
		options: stackedHorizontalBarTimeSeriesOptions,
		data: stackedHorizontalBarTimeSeriesData,
		tags: ['test']
	},
	{
		options: stackedHorizontalBarEmptyStateOptions,
		data: stackedHorizontalBarEmptyStateData,
		tags: ['empty']
	},
	{
		options: stackedHorizontalBarSkeletonOptions,
		data: stackedHorizontalBarSkeletonData,
		tags: ['skeleton']
	},
	{
		data: stackedBarTimeSeriesDataCustomTicks,
		options: stackedBarTimeSeriesOptionsCustomTicks,
		tags: ['axes']
	}
]
