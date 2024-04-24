import { type PieChartOptions, type ChartTabularData, Alignments } from '@carbon/charts'

const vanilla = 'PieChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-pie-chart',
	vue: `Ccv${vanilla}`
}

const pieOptions: PieChartOptions = {
	title: 'Pie',
	resizable: true,
	height: '400px'
}

const pieCenteredOptions: PieChartOptions = {
	title: 'Pie (centered)',
	resizable: true,
	legend: {
		alignment: Alignments.CENTER
	},
	pie: {
		alignment: Alignments.CENTER
	},
	height: '400px'
}

const pieMapToOptions: PieChartOptions = {
	title: 'Pie (value maps to count)',
	resizable: true,
	pie: {
		valueMapsTo: 'count'
	},
	height: '400px'
}

const pieEmptyStateOptions: PieChartOptions = {
	title: 'Pie (empty state)',
	resizable: true
}

const pieSkeletonOptions: PieChartOptions = {
	title: 'Pie (skeleton)',
	resizable: true,
	data: {
		loading: true
	},
	height: '400px'
}

export const pieData: ChartTabularData = [
	{ group: '2V2N 9KYPM version 1', value: 20000 },
	{ group: 'L22I P66EP L22I P66EP L22I P66EP', value: 65000 },
	{ group: 'JQAI 2M4L1', value: 75000 },
	{ group: 'J9DZ F37AP', value: 1200 },
	{ group: 'YEL48 Q6XK YEL48', value: 10000 },
	{ group: 'Misc', value: 25000 }
]

export const pieDataMapsTo: ChartTabularData = [
	{ group: '2V2N 9KYPM version 1', count: 28000 },
	{ group: 'L22I P66EP L22I P66EP L22I P66EP', count: 65000 },
	{ group: 'JQAI 2M4L1', count: 75000 },
	{ group: 'J9DZ F37AP', count: 3200 },
	{ group: 'YEL48 Q6XK YEL48', count: 15000 },
	{ group: 'Misc', count: 25000 }
]

const noData: ChartTabularData = []

export const examples: Example[] = [
	{
		options: pieOptions,
		data: pieData
	},
	{
		options: pieCenteredOptions,
		data: pieData
	},
	{
		options: pieMapToOptions,
		data: pieDataMapsTo
	},
	{
		options: pieEmptyStateOptions,
		data: noData
	},
	{
		options: pieSkeletonOptions,
		data: noData
	}
]