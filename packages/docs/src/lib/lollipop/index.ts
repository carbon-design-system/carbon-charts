import { type LollipopChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
const vanilla = 'LollipopChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-lollipop-chart',
	vue: `Ccv${vanilla}`
}

const lollipopDiscreteOptions: LollipopChartOptions = {
	title: 'Lollipop (discrete)',
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

const lollipopDiscretePresentationOptions: LollipopChartOptions = {
	title: 'Lollipop (horizontal) - presentation',
	axes: {
		left: {
			title: '2019 Annual Sales Figures',
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		bottom: {
			mapsTo: 'value'
		}
	},
	points: {
		radius: 7
	},
	height: '400px'
}

const lollipopDiscreteData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 34200 },
	{ group: 'Dataset 3', key: 'Sold', value: 41200 },
	{ group: 'Dataset 4', key: 'Restocking', value: 22000 }
]

export const examples: Example[] = [
  {
    options: lollipopDiscreteOptions,
    data: lollipopDiscreteData
  },
  {
    options: lollipopDiscretePresentationOptions,
    data: lollipopDiscreteData
  }
]