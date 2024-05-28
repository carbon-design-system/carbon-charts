import { type BubbleChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'BubbleChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-boxplot-chart',
	vue: `Ccv${vanilla}`
}

const bubbleDoubleLinearOptions: BubbleChartOptions = {
	title: 'Bubble (linear)',
	axes: {
		bottom: {
			title: 'No. of employees',
			mapsTo: 'sales',
			includeZero: false
		},
		left: {
			title: 'Annual sales',
			mapsTo: 'profit',
			includeZero: false
		}
	},
	bubble: {
		radiusMapsTo: 'surplus',
		radiusLabel: 'Surplus'
	},
	legend: {
		additionalItems: [
			{
				type: 'radius',
				name: 'Surplus'
			}
		]
	},
	height: '400px'
}

const bubbleDiscreteOptions: BubbleChartOptions = {
	title: 'Bubble (discrete)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		left: {
			mapsTo: 'value'
		}
	},
	bubble: {
		radiusMapsTo: 'surplus'
	},
	height: '400px'
}

const bubbleTimeSeriesOptions: BubbleChartOptions = {
	title: 'Bubble (time series)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value'
		}
	},
	bubble: {
		radiusMapsTo: 'surplus'
	},
	height: '400px'
}

const bubbleEmptyStateOptions: BubbleChartOptions = {
	title: 'Bubble (empty state)',
	axes: {
		bottom: {
			title: 'No. of employees',
			mapsTo: 'sales',
			includeZero: false
		},
		left: {
			title: 'Annual sales',
			mapsTo: 'profit',
			includeZero: false
		}
	},
	bubble: {
		radiusMapsTo: 'surplus'
	},
	height: '400px'
}

const bubbleSkeletonOptions: BubbleChartOptions = {
	title: 'Bubble (skeleton)',
	axes: {
		bottom: {
			title: 'No. of employees',
			mapsTo: 'sales',
			includeZero: false
		},
		left: {
			title: 'Annual sales',
			mapsTo: 'profit',
			includeZero: false
		}
	},
	bubble: {
		radiusMapsTo: 'surplus'
	},
	data: {
		loading: true
	},
	height: '400px'
}

const bubbleDualDiscreteOptions: BubbleChartOptions = {
	title: 'Bubble (dual discrete axes)',
	axes: {
		bottom: {
			title: 'Problems',
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'problem'
		},
		left: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'product',
			title: 'Products'
		}
	},
	bubble: {
		radiusMapsTo: 'value'
	},
	height: '400px'
}

const bubbleDoubleLinearData: ChartTabularData = [
	{ group: 'Dataset 1', sales: 10000, profit: 32100, surplus: 50000 },
	{ group: 'Dataset 1', sales: 12000, profit: 23500, surplus: 34000 },
	{ group: 'Dataset 1', sales: 14000, profit: 53100, surplus: 63000 },
	{ group: 'Dataset 1', sales: 15000, profit: 42300, surplus: 43000 },
	{ group: 'Dataset 1', sales: 16000, profit: 12300, surplus: 55000 },
	{ group: 'Dataset 2', sales: 11000, profit: 12400, surplus: 25000 },
	{ group: 'Dataset 2', sales: 13000, profit: 34500, surplus: 35000 },
	{ group: 'Dataset 2', sales: 13500, profit: 23100, surplus: 55000 },
	{ group: 'Dataset 2', sales: 15500, profit: 63200, surplus: 35000 },
	{ group: 'Dataset 2', sales: 15750, profit: 24300, surplus: 64000 }
]

const bubbleDiscreteData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 8000, surplus: 50000 },
	{ group: 'Dataset 1', key: 'More', value: 23500, surplus: 15000 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100, surplus: 32000 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300, surplus: 53000 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300, surplus: 34000 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200, surplus: 23000 },
	{ group: 'Dataset 2', key: 'More', value: 53200, surplus: 31000 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300, surplus: 13000 },
	{ group: 'Dataset 2', key: 'Restocking', value: 13400, surplus: 55000 },
	{ group: 'Dataset 2', key: 'Misc', value: 0, surplus: 12000 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200, surplus: 32000 },
	{ group: 'Dataset 3', key: 'More', value: 18400, surplus: 12000 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210, surplus: 18000 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400, surplus: 21000 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100, surplus: 22000 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000, surplus: 32000 },
	{ group: 'Dataset 4', key: 'More', value: 4000, surplus: 32000 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000, surplus: 43000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, surplus: 43000 },
	{ group: 'Dataset 4', key: 'Misc', value: 7000, surplus: 21000 }
]

const bubbleTimeSeriesData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2023-01-01',
		value: 50000,
		surplus: 1108792759.4591982
	},
	{
		group: 'Dataset 1',
		date: '2023-01-05',
		value: 65000,
		surplus: 590247271.3872744
	},
	{
		group: 'Dataset 1',
		date: '2023-01-08',
		value: null,
		surplus: 9219.520929038921
	},
	{
		group: 'Dataset 1',
		date: '2023-01-13',
		value: 49213,
		surplus: 1144546546.5725653
	},
	{
		group: 'Dataset 1',
		date: '2023-01-17',
		value: 51213,
		surplus: 1206431312.2321992
	},
	{
		group: 'Dataset 2',
		date: '2023-01-02',
		value: 0,
		surplus: 9107.915339546651
	},
	{
		group: 'Dataset 2',
		date: '2023-01-06',
		value: 57312,
		surplus: 1297879289.3455367
	},
	{
		group: 'Dataset 2',
		date: '2023-01-08',
		value: 27432,
		surplus: 254653461.2692332
	},
	{
		group: 'Dataset 2',
		date: '2023-01-15',
		value: 70323,
		surplus: 791440614.5922209
	},
	{
		group: 'Dataset 2',
		date: '2023-01-19',
		value: 21300,
		surplus: 87235499.55803385
	},
	{
		group: 'Dataset 3',
		date: '2023-01-01',
		value: 40000,
		surplus: 99661858.42808129
	},
	{
		group: 'Dataset 3',
		date: '2023-01-05',
		value: null,
		surplus: 4582.283257286785
	},
	{
		group: 'Dataset 3',
		date: '2023-01-08',
		value: 18000,
		surplus: 388038660.7993739
	},
	{
		group: 'Dataset 3',
		date: '2023-01-13',
		value: 39213,
		surplus: 281485241.99383223
	},
	{
		group: 'Dataset 3',
		date: '2023-01-17',
		value: 61213,
		surplus: 77655008.12585072
	},
	{
		group: 'Dataset 4',
		date: '2023-01-02',
		value: 20000,
		surplus: 138468385.58061224
	},
	{
		group: 'Dataset 4',
		date: '2023-01-06',
		value: 37312,
		surplus: 703848952.2932228
	},
	{
		group: 'Dataset 4',
		date: '2023-01-08',
		value: 51432,
		surplus: 721135448.0965896
	},
	{
		group: 'Dataset 4',
		date: '2023-01-15',
		value: 25332,
		surplus: 524200058.75680393
	},
	{
		group: 'Dataset 4',
		date: '2023-01-19',
		value: null,
		surplus: 4347.704175756872
	}
]

const noData: ChartTabularData = []

const bubbleDualDiscreteData: ChartTabularData = [
	{ group: '2014', product: 'Cloud', value: 162, problem: 'Skills' },
	{ group: '2014', product: 'Mainframe', value: 340, problem: 'Skills' },
	{ group: '2014', product: 'Cloud', value: 202, problem: 'Software' },
	{ group: '2014', product: 'Mainframe', value: 64, problem: 'Software' },
	{ group: '2014', product: 'Cloud', value: 102, problem: 'Staffing' },
	{ group: '2014', product: 'Mainframe', value: 88, problem: 'Staffing' },
	{ group: '2016', product: 'Cloud', value: 136, problem: 'Skills' },
	{ group: '2016', product: 'Mainframe', value: 74, problem: 'Skills' },
	{ group: '2016', product: 'Cloud', value: 45, problem: 'Software' },
	{ group: '2016', product: 'Mainframe', value: 24, problem: 'Software' },
	{ group: '2016', product: 'Cloud', value: 36, problem: 'Staffing' },
	{ group: '2016', product: 'Mainframe', value: 44, problem: 'Staffing' },
	{ group: '2018', product: 'Cloud', value: 78, problem: 'Skills' },
	{ group: '2018', product: 'Mainframe', value: 94, problem: 'Skills' },
	{ group: '2018', product: 'Cloud', value: 56, problem: 'Software' },
	{ group: '2018', product: 'Mainframe', value: 104, problem: 'Software' },
	{ group: '2018', product: 'Cloud', value: 146, problem: 'Staffing' },
	{ group: '2018', product: 'Mainframe', value: 274, problem: 'Staffing' }
]

export const examples: Example[] = [
	{
		options: bubbleDoubleLinearOptions,
		data: bubbleDoubleLinearData
	},
	{
		options: bubbleTimeSeriesOptions,
		data: bubbleTimeSeriesData
	},
	{
		options: bubbleDiscreteOptions,
		data: bubbleDiscreteData
	},
	{
		options: bubbleDualDiscreteOptions,
		data: bubbleDualDiscreteData
	},
	{
		options: bubbleEmptyStateOptions,
		data: noData
	},
	{
		options: bubbleSkeletonOptions,
		data: noData
	}
]
