import { type RadarChartOptions, type ChartTabularData, Alignments } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'RadarChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: ['RadarChartComponent', 'ibm-radar-chart'],
	vue: `Ccv${vanilla}`
}

const radarOptions: RadarChartOptions = {
	title: 'Radar',
	radar: {
		axes: {
			angle: 'feature',
			value: 'score'
		}
	},
	data: {
		groupMapsTo: 'product'
	},
	height: '400px'
}

const radarCenteredOptions: RadarChartOptions = {
	title: 'Radar (centered)',
	radar: {
		axes: {
			angle: 'feature',
			value: 'score'
		},
		alignment: Alignments.CENTER
	},
	data: {
		groupMapsTo: 'product'
	},
	legend: {
		alignment: Alignments.CENTER
	},
	height: '400px'
}

const radarWithMissingDataOptions: RadarChartOptions = {
	title: 'Radar - Missing datapoints',
	height: '400px'
}

const radarDenseOptions: RadarChartOptions = {
	title: 'Radar - Dense',
	radar: {
		axes: {
			angle: 'activity',
			value: 'hoursAvg'
		}
	},
	data: {
		groupMapsTo: 'month'
	},
	height: '400px'
}

const radarShowAllLabelsOptions: RadarChartOptions = {
	title: 'Radar - Display all labels',
	radar: {
		axes: {
			angle: 'category',
			value: 'value'
		},
		showAllLabels: true
	},
	data: {
		groupMapsTo: 'group'
	},
	height: '400px'
}

const radarData: ChartTabularData = [
	{ product: 'Product 1', feature: 'Price', score: 60 },
	{ product: 'Product 1', feature: 'Usability', score: 92 },
	{ product: 'Product 1', feature: 'Availability', score: 5 },
	{ product: 'Product 1', feature: 'Performance', score: 85 },
	{ product: 'Product 1', feature: 'Quality', score: 60 },
	{ product: 'Product 2', feature: 'Price', score: 70 },
	{ product: 'Product 2', feature: 'Usability', score: 63 },
	{ product: 'Product 2', feature: 'Availability', score: 78 },
	{ product: 'Product 2', feature: 'Performance', score: 50 },
	{ product: 'Product 2', feature: 'Quality', score: 30 }
]

const radarWithMissingDataData: ChartTabularData = [
	{ group: 'Sugar', key: 'London', value: 25 },
	{ group: 'Oil', key: 'London', value: 6 },
	{ group: 'Water', key: 'London', value: 12 },
	{ group: 'Sugar', key: 'Milan', value: 13 },
	{ group: 'Oil', key: 'Milan', value: 6 },
	{ group: 'Water', key: 'Milan', value: 28 },
	{ group: 'Sugar', key: 'Paris', value: 19 },
	{ group: 'Oil', key: 'Paris', value: 16 },
	{ group: 'Water', key: 'Paris', value: 10 },
	{ group: 'Sugar', key: 'New York', value: 11 },
	{ group: 'Oil', key: 'New York', value: 18 },
	{ group: 'Water', key: 'New York', value: 8 },
	{ group: 'Sugar', key: 'Sydney', value: 12 },
	{ group: 'Oil', key: 'Sydney', value: 16 }
]

const radarDenseData: ChartTabularData = [
	{ month: 'January', activity: 'Eating', hoursAvg: 2 },
	{ month: 'January', activity: 'Drinking', hoursAvg: 6 },
	{ month: 'January', activity: 'Sleeping', hoursAvg: 6 },
	{ month: 'January', activity: 'Working', hoursAvg: 8 },
	{ month: 'January', activity: 'Walking', hoursAvg: 1 },
	{ month: 'January', activity: 'Running', hoursAvg: 0.5 },
	{ month: 'January', activity: 'Cycling', hoursAvg: 1 },
	{ month: 'January', activity: 'Swimming', hoursAvg: 0 },
	{ month: 'February', activity: 'Eating', hoursAvg: 1.5 },
	{ month: 'February', activity: 'Drinking', hoursAvg: 9 },
	{ month: 'February', activity: 'Sleeping', hoursAvg: 7 },
	{ month: 'February', activity: 'Working', hoursAvg: 9 },
	{ month: 'February', activity: 'Walking', hoursAvg: 2 },
	{ month: 'February', activity: 'Running', hoursAvg: 2 },
	{ month: 'February', activity: 'Cycling', hoursAvg: 0 },
	{ month: 'February', activity: 'Swimming', hoursAvg: 1.5 },
	{ month: 'March', activity: 'Eating', hoursAvg: 3 },
	{ month: 'March', activity: 'Drinking', hoursAvg: 5 },
	{ month: 'March', activity: 'Sleeping', hoursAvg: 5 },
	{ month: 'March', activity: 'Working', hoursAvg: 6 },
	{ month: 'March', activity: 'Walking', hoursAvg: 3 },
	{ month: 'March', activity: 'Running', hoursAvg: 9 },
	{ month: 'March', activity: 'Cycling', hoursAvg: 1 },
	{ month: 'March', activity: 'Swimming', hoursAvg: 7 },
	{ month: 'April', activity: 'Eating', hoursAvg: 5 },
	{ month: 'April', activity: 'Drinking', hoursAvg: 1 },
	{ month: 'April', activity: 'Sleeping', hoursAvg: 4 },
	{ month: 'April', activity: 'Working', hoursAvg: 2 },
	{ month: 'April', activity: 'Walking', hoursAvg: 5 },
	{ month: 'April', activity: 'Running', hoursAvg: 4 },
	{ month: 'April', activity: 'Cycling', hoursAvg: 6 },
	{ month: 'April', activity: 'Swimming', hoursAvg: 3 },
	{ month: 'May', activity: 'Eating', hoursAvg: 7 },
	{ month: 'May', activity: 'Drinking', hoursAvg: 0 },
	{ month: 'May', activity: 'Sleeping', hoursAvg: 5 },
	{ month: 'May', activity: 'Working', hoursAvg: 4 },
	{ month: 'May', activity: 'Walking', hoursAvg: 8 },
	{ month: 'May', activity: 'Running', hoursAvg: 2 },
	{ month: 'May', activity: 'Cycling', hoursAvg: 3 },
	{ month: 'May', activity: 'Swimming', hoursAvg: 1 }
]

const radarShowAllLabelsData: ChartTabularData = [
	{ group: 'Group 1', category: 'Mathematics', value: 4 },
	{ group: 'Group 1', category: 'Reading', value: 5 },
	{ group: 'Group 1', category: 'Writing', value: 3 },
	{ group: 'Group 1', category: 'Science', value: 4 },
	{ group: 'Group 1', category: 'Critical Thinking', value: 3 },
	{ group: 'Group 1', category: 'Creativity', value: 4 },
	{ group: 'Group 1', category: 'Teamwork', value: 5 },
	{ group: 'Group 1', category: 'Communication', value: 4 },
	{ group: 'Group 2', category: 'Mathematics', value: 3 },
	{ group: 'Group 2', category: 'Reading', value: 4 },
	{ group: 'Group 2', category: 'Writing', value: 4 },
	{ group: 'Group 2', category: 'Science', value: 2 },
	{ group: 'Group 2', category: 'Critical Thinking', value: 4 },
	{ group: 'Group 2', category: 'Creativity', value: 3 },
	{ group: 'Group 2', category: 'Teamwork', value: 3 },
	{ group: 'Group 2', category: 'Communication', value: 4 }
]

export const examples: Example[] = [
	{
		data: radarData,
		options: radarOptions,
		tags: ['test']
	},
	{
		data: radarData,
		options: radarCenteredOptions,
		tags: ['test']
	},
	{
		data: radarWithMissingDataData,
		options: radarWithMissingDataOptions,
		tags: ['test']
	},
	{
		data: radarDenseData,
		options: radarDenseOptions,
		tags: ['test']
	},
	{
		data: radarShowAllLabelsData,
		options: radarShowAllLabelsOptions,
		tags: ['test']
	}
]
