import { type HistogramChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'HistogramChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-histogram-chart',
	vue: `Ccv${vanilla}`
}

const histogramContinueOptions: HistogramChartOptions = {
	title: 'Histogram (linear)',
	axes: {
		bottom: {
			title: 'Age',
			mapsTo: 'age',
			bins: 10,
			limitDomainToBins: true
		},
		left: {
			title: 'No. of participants',
			scaleType: ScaleTypes.LINEAR,
			stacked: true,
			binned: true
		}
	},
	height: '400px'
}

const histogramAlwaysRulerTooltipOptions: HistogramChartOptions = {
	title: 'Histogram (tooltip.alwaysShowRulerTooltip=true)',
	axes: {
		bottom: {
			title: 'Age',
			mapsTo: 'age',
			bins: 10,
			limitDomainToBins: true
		},
		left: {
			title: 'No. of participants',
			scaleType: ScaleTypes.LINEAR,
			stacked: true,
			binned: true
		}
	},
	tooltip: {
		alwaysShowRulerTooltip: true
	},
	height: '400px'
}

const histogramContinueWithBinsNumberOptions: HistogramChartOptions = {
	title: 'Histogram (defined bins number) (linear)',
	axes: {
		bottom: {
			title: 'US $ (million)',
			mapsTo: 'value',
			bins: (870 - 200) / 10,
			limitDomainToBins: true
		},
		left: {
			title: 'No. of transactions',
			scaleType: ScaleTypes.LINEAR,
			binned: true
		}
	},
	height: '400px'
}

const histogramContinueWithBinsOptions: HistogramChartOptions = {
	title: 'Histogram (defined bins) (linear)',
	axes: {
		bottom: {
			title: 'Age',
			mapsTo: 'age',
			bins: [20, 40, 50, 60, 90],
			limitDomainToBins: true
		},
		left: {
			title: 'No. of participants',
			scaleType: ScaleTypes.LINEAR,
			stacked: true,
			binned: true
		}
	},
	height: '400px'
}

const histogramContinueData: ChartTabularData = [
	{ group: 'Dataset 1', age: 20 },
	{ group: 'Dataset 2', age: 21 },
	{ group: 'Dataset 2', age: 23 },
	{ group: 'Dataset 3', age: 21 },
	{ group: 'Dataset 3', age: 23 },
	{ group: 'Dataset 3', age: 24 },
	{ group: 'Dataset 1', age: 30 },
	{ group: 'Dataset 2', age: 34 },
	{ group: 'Dataset 1', age: 35 },
	{ group: 'Dataset 3', age: 30 },
	{ group: 'Dataset 1', age: 40 },
	{ group: 'Dataset 2', age: 43 },
	{ group: 'Dataset 1', age: 45 },
	{ group: 'Dataset 1', age: 46 },
	{ group: 'Dataset 3', age: 40 },
	{ group: 'Dataset 3', age: 43 },
	{ group: 'Dataset 3', age: 45 },
	{ group: 'Dataset 1', age: 48 },
	{ group: 'Dataset 1', age: 50 },
	{ group: 'Dataset 2', age: 55 },
	{ group: 'Dataset 2', age: 66 },
	{ group: 'Dataset 2', age: 58 },
	{ group: 'Dataset 1', age: 70 },
	{ group: 'Dataset 1', age: 78 },
	{ group: 'Dataset 3', age: 71 },
	{ group: 'Dataset 3', age: 75 },
	{ group: 'Dataset 2', age: 83 },
	{ group: 'Dataset 2', age: 86 },
	{ group: 'Dataset 1', age: 87 }
]

const histogramContinueWithBinsNumberData: ChartTabularData = [
	{ group: 'Dataset 1', value: 200 },
	{ group: 'Dataset 1', value: 210 },
	{ group: 'Dataset 1', value: 230 },
	{ group: 'Dataset 1', value: 210 },
	{ group: 'Dataset 1', value: 230 },
	{ group: 'Dataset 1', value: 240 },
	{ group: 'Dataset 1', value: 250 },
	{ group: 'Dataset 1', value: 255 },
	{ group: 'Dataset 1', value: 290 },
	{ group: 'Dataset 1', value: 300 },
	{ group: 'Dataset 1', value: 320 },
	{ group: 'Dataset 1', value: 330 },
	{ group: 'Dataset 1', value: 320 },
	{ group: 'Dataset 1', value: 330 },
	{ group: 'Dataset 1', value: 320 },
	{ group: 'Dataset 1', value: 330 },
	{ group: 'Dataset 1', value: 340 },
	{ group: 'Dataset 1', value: 350 },
	{ group: 'Dataset 1', value: 300 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 420 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 450 },
	{ group: 'Dataset 1', value: 460 },
	{ group: 'Dataset 1', value: 465 },
	{ group: 'Dataset 1', value: 468 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 450 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 480 },
	{ group: 'Dataset 1', value: 500 },
	{ group: 'Dataset 1', value: 550 },
	{ group: 'Dataset 1', value: 660 },
	{ group: 'Dataset 1', value: 580 },
	{ group: 'Dataset 1', value: 700 },
	{ group: 'Dataset 1', value: 780 },
	{ group: 'Dataset 1', value: 710 },
	{ group: 'Dataset 1', value: 750 },
	{ group: 'Dataset 1', value: 830 },
	{ group: 'Dataset 1', value: 860 },
	{ group: 'Dataset 1', value: 870 },
	{ group: 'Dataset 1', value: 200 },
	{ group: 'Dataset 1', value: 210 },
	{ group: 'Dataset 1', value: 230 },
	{ group: 'Dataset 1', value: 210 },
	{ group: 'Dataset 1', value: 230 },
	{ group: 'Dataset 1', value: 240 },
	{ group: 'Dataset 1', value: 290 },
	{ group: 'Dataset 1', value: 300 },
	{ group: 'Dataset 1', value: 340 },
	{ group: 'Dataset 1', value: 345 },
	{ group: 'Dataset 1', value: 350 },
	{ group: 'Dataset 1', value: 380 },
	{ group: 'Dataset 1', value: 380 },
	{ group: 'Dataset 1', value: 275 },
	{ group: 'Dataset 1', value: 260 },
	{ group: 'Dataset 1', value: 262 },
	{ group: 'Dataset 1', value: 223 },
	{ group: 'Dataset 1', value: 218 },
	{ group: 'Dataset 1', value: 333 },
	{ group: 'Dataset 1', value: 385 },
	{ group: 'Dataset 1', value: 300 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 444 },
	{ group: 'Dataset 1', value: 433 },
	{ group: 'Dataset 1', value: 450 },
	{ group: 'Dataset 1', value: 375 },
	{ group: 'Dataset 1', value: 455 },
	{ group: 'Dataset 1', value: 458 },
	{ group: 'Dataset 1', value: 460 },
	{ group: 'Dataset 1', value: 477 },
	{ group: 'Dataset 1', value: 480 },
	{ group: 'Dataset 1', value: 484 },
	{ group: 'Dataset 1', value: 400 },
	{ group: 'Dataset 1', value: 430 },
	{ group: 'Dataset 1', value: 450 },
	{ group: 'Dataset 1', value: 480 },
	{ group: 'Dataset 1', value: 500 },
	{ group: 'Dataset 1', value: 550 },
	{ group: 'Dataset 1', value: 660 },
	{ group: 'Dataset 1', value: 618 },
	{ group: 'Dataset 1', value: 720 },
	{ group: 'Dataset 1', value: 621 },
	{ group: 'Dataset 1', value: 823 },
	{ group: 'Dataset 1', value: 525 },
	{ group: 'Dataset 1', value: 630 },
	{ group: 'Dataset 1', value: 635 },
	{ group: 'Dataset 1', value: 637 },
	{ group: 'Dataset 1', value: 644 },
	{ group: 'Dataset 1', value: 580 },
	{ group: 'Dataset 1', value: 570 },
	{ group: 'Dataset 1', value: 575 },
	{ group: 'Dataset 1', value: 578 },
	{ group: 'Dataset 1', value: 582 },
	{ group: 'Dataset 1', value: 591 },
	{ group: 'Dataset 1', value: 700 },
	{ group: 'Dataset 1', value: 780 },
	{ group: 'Dataset 1', value: 710 },
	{ group: 'Dataset 1', value: 750 },
	{ group: 'Dataset 1', value: 830 },
	{ group: 'Dataset 1', value: 860 },
	{ group: 'Dataset 1', value: 870 }
]

export const examples: Example[] = [
	{
		options: histogramContinueOptions,
		data: histogramContinueData,
		tags: ['test']
	},
	{
		options: histogramAlwaysRulerTooltipOptions,
		data: histogramContinueData,
		tags: ['test']
	},
	{
		options: histogramContinueWithBinsNumberOptions,
		data: histogramContinueWithBinsNumberData,
		tags: ['test']
	},
	{
		options: histogramContinueWithBinsOptions,
		data: histogramContinueData,
		tags: ['test']
	}
]
