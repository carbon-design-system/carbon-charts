import { type ScatterChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import { lineTimeSeriesData } from '../line'
import type { ChartTypes, Example } from '../types'

const vanilla = 'ScatterChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-scatter-chart',
	vue: `Ccv${vanilla}`
}

const doubleLinearScatterOptions: ScatterChartOptions = {
	title: 'Scatter (linear x & y)',
	axes: {
		bottom: {
			title: 'No. of employees',
			mapsTo: 'employees',
			scaleType: ScaleTypes.LINEAR
		},
		left: {
			title: 'Annual sales',
			mapsTo: 'sales',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const scatterDiscreteOptions: ScatterChartOptions = {
	title: 'Scatter (discrete)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		left: {
			mapsTo: 'value'
		}
	},
	height: '400px'
}

const scatterTimeSeriesOptions: ScatterChartOptions = {
	title: 'Scatter (time series)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value'
		}
	},
	height: '400px'
}

const scatterEmptyStateOptions: ScatterChartOptions = {
	title: 'Scatter (empty state)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value'
		}
	},
	height: '400px'
}

const scatterSkeletonOptions: ScatterChartOptions = {
	title: 'Scatter (skeleton)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value'
		}
	},
	data: {
		loading: true
	},
	height: '400px'
}

const scatterDualAxesOptions: ScatterChartOptions = {
	title: 'Scatter (dual axes)',
	axes: {
		bottom: {
			mapsTo: 'date',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			title: 'order count',
			mapsTo: 'orderCount',
			scaleType: ScaleTypes.LINEAR
		},
		right: {
			title: 'product count',
			mapsTo: 'productCount',
			scaleType: ScaleTypes.LINEAR,
			correspondingDatasets: ['Products']
		}
	},
	height: '400px'
}

const scatterAlwaysRulerTooltipOptions: ScatterChartOptions = {
	title: 'Scatter (tooltip.alwaysShowRulerTooltip=true)',
	axes: {
		bottom: {
			title: 'No. of employees',
			mapsTo: 'employees',
			scaleType: ScaleTypes.LINEAR
		},
		left: {
			title: 'Annual sales',
			mapsTo: 'sales',
			scaleType: ScaleTypes.LINEAR
		}
	},
	tooltip: {
		alwaysShowRulerTooltip: true
	},
	height: '400px'
}

const doubleLinearScatterData: ChartTabularData = [
	{ group: 'Dataset 1', employees: 5000, sales: 32100 },
	{ group: 'Dataset 1', employees: 3000, sales: 25100 },
	{ group: 'Dataset 1', employees: 8000, sales: 12100 },
	{ group: 'Dataset 1', employees: 4000, sales: 53100 },
	{ group: 'Dataset 2', employees: 5000, sales: 32100 },
	{ group: 'Dataset 2', employees: 2000, sales: 34100 },
	{ group: 'Dataset 2', employees: 4000, sales: 23100 },
	{ group: 'Dataset 2', employees: 7000, sales: 14100 },
	{ group: 'Dataset 2', employees: 6000, sales: 53100 }
]

const scatterDiscreteData: ChartTabularData = [
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
	{ group: 'Dataset 4', key: 'Restocking', value: 24000 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000 }
]

const scatterDualAxesData: ChartTabularData = [
	{ group: 'Orders', date: 'January', orderCount: 121 },
	{ group: 'Orders', date: 'February', orderCount: 321 },
	{ group: 'Orders', date: 'March', orderCount: 370 },
	{ group: 'Orders', date: 'April', orderCount: 329 },
	{ group: 'Orders', date: 'May', orderCount: 121 },
	{ group: 'Products', date: 'January', productCount: 26100 },
	{ group: 'Products', date: 'February', productCount: 25100 },
	{ group: 'Products', date: 'March', productCount: 28100 },
	{ group: 'Products', date: 'April', productCount: 15900 },
	{ group: 'Products', date: 'May', productCount: 34100 }
]

const noData: ChartTabularData = []

export const examples: Example[] = [
	{
		options: doubleLinearScatterOptions,
		data: doubleLinearScatterData,
		tags: ['test']
	},
	{
		options: scatterTimeSeriesOptions,
		data: lineTimeSeriesData,
		tags: ['test']
	},
	{
		options: scatterDiscreteOptions,
		data: scatterDiscreteData,
		tags: ['test']
	},
	{
		options: scatterDualAxesOptions,
		data: scatterDualAxesData,
		tags: ['test']
	},
	{
		options: scatterAlwaysRulerTooltipOptions,
		data: doubleLinearScatterData,
		tags: ['test']
	},
	{
		options: scatterEmptyStateOptions,
		data: noData
	},
	{
		options: scatterSkeletonOptions,
		data: noData
	}
]
