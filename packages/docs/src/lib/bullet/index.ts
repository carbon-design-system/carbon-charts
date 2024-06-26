import { type BulletChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'BulletChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-bullet-chart',
	vue: `Ccv${vanilla}`
}

const options: BulletChartOptions = {
	title: 'Basic bullet',
	axes: {
		bottom: {
			mapsTo: 'value',
			extendLinearDomainBy: 'marker'
		},
		left: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'title'
		},
		right: {
			scaleType: ScaleTypes.LABELS_RATIO,
			mapsTo: 'title'
		}
	},
	height: '251px'
}

const data: ChartTabularData = [
	{
		title: 'Item E',
		group: 'D3',
		ranges: [350, 650, 980],
		marker: 1575,
		value: 400
	},
	{
		title: 'Item D',
		group: 'D2',
		ranges: [750, 1200, null],
		marker: 1725,
		value: 2100
	},
	{
		title: 'Item C',
		group: 'D3',
		ranges: [350, 500, 1005],
		marker: 1340,
		value: 550
	},
	{
		title: 'Item B',
		group: 'D1',
		ranges: [300, 895, 1600],
		marker: 1455,
		value: 1000
	},
	{
		title: 'Item A',
		group: 'D1',
		ranges: [800, 1000, 1400],
		marker: 1275,
		value: 250
	}
]

export const examples: Example[] = [
	{
		options,
		data,
		test: true
	}
]
