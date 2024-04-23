import { type BarChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts-react'

const vanilla = 'StackedBarChart'

export const chartTypesStacked: ChartTypes = {
	vanilla,
	svelte: vanilla,
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
				values: [new Date(2019, 0, 17)]
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
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 5), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 75000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 21432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 21300 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1), value: 50000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 5), value: 15000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 8), value: 20000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 13), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 17), value: 61213 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 2), value: 10 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 6), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 8), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 15), value: 40323 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 19), value: 31300 }
]

const stackedBarShortIntervalTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 57312 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 21432 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 70323 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 15000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 20000 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 39213 },
	{ group: 'Dataset 3', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 111), value: 0 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 222), value: 37312 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 333), value: 51432 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 444), value: 40323 },
	{ group: 'Dataset 4', date: new Date(2019, 0, 1, 8, 5, 6, 555), value: 0 }
]

const stackedBarTimeSeriesDataCustomTicks = stackedBarTimeSeriesData

const stackedHorizontalBarTimeSeriesData = stackedBarTimeSeriesData

export const examplesStacked: Example[] = [
  {
    options: stackedBarOptions,
    data: stackedBarData
  },
  {
    options: stackedBarNegativeOptions,
    data: stackedBarNegativeData
  },
  {
    options: stackedBarTimeSeriesOptions,
    data: stackedBarTimeSeriesData
  },
  {
    options: stackedBarShortIntervalTimeSeriesOptions,
    data: stackedBarShortIntervalTimeSeriesData
  },
  {
    options: stackedBarEmptyStateOptions,
    data: stackedBarEmptyStateData
  },
  {
    options: stackedBarSkeletonOptions,
    data: stackedBarSkeletonData
  },
  {
    options: stackedHorizontalBarOptions,
    data: stackedHorizontalBarData
  },
  {
    options: stackedHorizontalBarTimeSeriesOptions,
    data: stackedHorizontalBarTimeSeriesData
  },
  {
    options: stackedHorizontalBarEmptyStateOptions,
    data: stackedHorizontalBarEmptyStateData
  },
  {
    options: stackedHorizontalBarSkeletonOptions,
    data: stackedHorizontalBarSkeletonData
  },
  {
    data: stackedBarTimeSeriesDataCustomTicks,
    options: stackedBarTimeSeriesOptionsCustomTicks
  },
  
]