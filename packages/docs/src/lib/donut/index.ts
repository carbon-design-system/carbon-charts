import { type DonutChartOptions, type ChartTabularData, Alignments } from '@carbon/charts'
import { pieData, pieDataMapsTo } from '../pie'
import type { ChartTypes, Example } from '../types'

const vanilla = 'DonutChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-donut-chart',
	vue: `Ccv${vanilla}`
}

const donutOptions: DonutChartOptions = {
	title: 'Donut',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	},
	height: '400px'
}

const donutCenteredOptions: DonutChartOptions = {
	title: 'Donut (centered)',
	resizable: true,
	legend: {
		alignment: Alignments.CENTER
	},
	donut: {
		center: {
			label: 'Browsers'
		},
		alignment: Alignments.CENTER
	},
	height: '400px'
}

const donutMapsToOptions: DonutChartOptions = {
	title: 'Donut (value maps to count)',
	resizable: true,
	pie: {
		valueMapsTo: 'count'
	},
	height: '400px'
}

const donutEmptyStateOptions: DonutChartOptions = {
	title: 'Donut (empty state)',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	},
	height: '400px'
}

const donutSkeletonOptions: DonutChartOptions = {
	title: 'Donut (skeleton)',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	},
	data: {
		loading: true
	},
	height: '400px'
}

const noData: ChartTabularData = []

export const examples: Example[] = [
	{
		options: donutOptions,
		data: pieData,
		test: true
	},
	{
		options: donutCenteredOptions,
		data: pieData,
		test: true
	},
	{
		options: donutMapsToOptions,
		data: pieDataMapsTo,
		test: true
	},
	{
		options: donutEmptyStateOptions,
		data: noData
	},
	{
		options: donutSkeletonOptions,
		data: noData
	}
]
