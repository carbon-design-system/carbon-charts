import { type BarChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts-react'

const vanilla = 'GroupedBarChart'
export const chartTypesGrouped: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-grouped-bar-chart',
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
	}
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
	}
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
	}
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
	}
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
	}
}

// grouped bar - empty state
const groupedBarEmptyStateOptions: BarChartOptions = {
	title: 'Vertical grouped bar (empty state)',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.LABELS
		}
	}
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
	}
}


// grouped horizontal bar - empty state
const groupedHorizontalBarEmptyStateOptions: BarChartOptions = {
	title: 'Horizontal grouped bar (empty state)',
	axes: {
		left: {
			scaleType: ScaleTypes.LABELS
		},
		bottom: {}
	}
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
	}
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
	}
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
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 8000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 67000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 15000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 45213 }
]

const groupedBarTimeSeriesDenseData: ChartTabularData = [
	{ group: 'Dataset 1', date: new Date(2019, 0, 1), value: 10000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 2), value: 65000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 3), value: 30000 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 6), value: 49213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 7), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 8), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 9), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 10), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 11), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 12), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 13), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 14), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 15), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 16), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 18), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 19), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 20), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 21), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 22), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 23), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 24), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 25), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 26), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 27), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 28), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 29), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 30), value: 51213 },
	{ group: 'Dataset 1', date: new Date(2019, 0, 31), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 1), value: 8000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 2), value: 67000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 3), value: 15000 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 6), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 7), value: 45213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 8), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 9), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 10), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 11), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 12), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 13), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 14), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 15), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 16), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 17), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 18), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 19), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 20), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 21), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 22), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 23), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 24), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 25), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 26), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 27), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 28), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 29), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 30), value: 51213 },
	{ group: 'Dataset 2', date: new Date(2019, 0, 31), value: 51213 }
]

const groupedBarSelectedGroupsData: ChartTabularData = groupedBarData

const groupedHorizontalBarData: ChartTabularData = groupedBarData

const noData: ChartTabularData = []

export const examplesGrouped = [
  {
    options: groupedBarSelectedGroupsOptions,
    data: groupedBarSelectedGroupsData
  },
  {
    options: groupedBarOptions,
    data: groupedBarData
  },
  {
    options: groupedBarTimeSeriesOptions,
    data: groupedBarTimeSeriesData
  },
  {
    options: groupedBarTimeSeriesDenseOptions,
    data: groupedBarTimeSeriesDenseData
  },
  {
    options: groupedBarEmptyStateOptions,
    data: noData
  },
  {
    options: groupedBarSkeletonOptions,
    data: noData
  },
  {
    options: groupedHorizontalBarOptions,
    data: groupedHorizontalBarData
  },
  {
    options: groupedBarHorizontalTimeSeriesOptions,
    data: groupedBarTimeSeriesData
  },
  {
    options: groupedHorizontalBarEmptyStateOptions,
    data: noData
  },
  {
    options: groupedHorizontalBarSkeletonOptions,
    data: noData
  }
]