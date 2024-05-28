import { type HeatmapChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'HeatmapChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-heatmap-chart',
	vue: `Ccv${vanilla}`
}

const heatmapOptions: HeatmapChartOptions = {
	title: 'Heatmap',
	axes: {
		bottom: {
			title: 'Letters',
			mapsTo: 'letter',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			title: 'Months',
			mapsTo: 'month',
			scaleType: ScaleTypes.LABELS
		}
	},
	heatmap: {
		colorLegend: { title: 'Legend title' }
	},
	height: '400px',
	width: '960px'
}

const heatmapQuantizeLegendOption: HeatmapChartOptions = {
	title: 'Heatmap (Quantize legend)',
	axes: {
		bottom: {
			title: 'Letters',
			mapsTo: 'letter',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			title: 'Months',
			mapsTo: 'month',
			scaleType: ScaleTypes.LABELS
		}
	},
	heatmap: {
		colorLegend: { title: 'Legend title', type: 'quantize' }
	},
	height: '400px',
	width: '960px'
}

const heatmapPositiveNegativeOptions = Object.assign({}, heatmapOptions, {
	title: 'Heatmap (Divergent)',
	heatmap: {
		colorLegend: { title: 'Legend title', type: 'quantize' }
	}
})

const heatmapDomainOptions: HeatmapChartOptions = {
	title: 'Heatmap (Axis order option)',
	axes: {
		bottom: {
			title: 'Letters',
			mapsTo: 'letter',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			title: 'Months',
			mapsTo: 'month',
			scaleType: ScaleTypes.LABELS,
			domain: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			]
		}
	},
	heatmap: {
		colorLegend: { title: 'Legend title' }
	},
	height: '400px',
	width: '960px'
}

const heatmapMissingDataOptions: HeatmapChartOptions = {
	title: 'Heatmap (Missing data)',
	axes: {
		bottom: {
			title: 'Letters',
			mapsTo: 'letter',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			title: 'Months',
			mapsTo: 'month',
			scaleType: ScaleTypes.LABELS
		}
	},
	heatmap: {
		colorLegend: { title: 'Legend title' }
	},
	height: '400px',
	width: '960px'
}

const heatmapData: ChartTabularData = [
	{
		letter: 'A',
		month: 'January',
		value: 41
	},
	{
		letter: 'B',
		month: 'January',
		value: 7
	},
	{
		letter: 'C',
		month: 'January',
		value: 66
	},
	{
		letter: 'D',
		month: 'January',
		value: 85
	},
	{
		letter: 'E',
		month: 'January',
		value: 70
	},
	{
		letter: 'F',
		month: 'January',
		value: 98
	},
	{
		letter: 'G',
		month: 'January',
		value: 90
	},
	{
		letter: 'H',
		month: 'January',
		value: 66
	},
	{
		letter: 'I',
		month: 'January',
		value: 0
	},
	{
		letter: 'J',
		month: 'January',
		value: 13
	},
	{
		letter: 'A',
		month: 'February',
		value: 16
	},
	{
		letter: 'B',
		month: 'February',
		value: 5
	},
	{
		letter: 'C',
		month: 'February',
		value: 6
	},
	{
		letter: 'D',
		month: 'February',
		value: 48
	},
	{
		letter: 'E',
		month: 'February',
		value: 72
	},
	{
		letter: 'F',
		month: 'February',
		value: 26
	},
	{
		letter: 'G',
		month: 'February',
		value: 70
	},
	{
		letter: 'H',
		month: 'February',
		value: 99
	},
	{
		letter: 'I',
		month: 'February',
		value: 79
	},
	{
		letter: 'J',
		month: 'February',
		value: 83
	},
	{
		letter: 'A',
		month: 'March',
		value: 62
	},
	{
		letter: 'B',
		month: 'March',
		value: 57
	},
	{
		letter: 'C',
		month: 'March',
		value: 90
	},
	{
		letter: 'D',
		month: 'March',
		value: 68
	},
	{
		letter: 'E',
		month: 'March',
		value: 84
	},
	{
		letter: 'F',
		month: 'March',
		value: 21
	},
	{
		letter: 'G',
		month: 'March',
		value: 54
	},
	{
		letter: 'H',
		month: 'March',
		value: 25
	},
	{
		letter: 'I',
		month: 'March',
		value: 42
	},
	{
		letter: 'J',
		month: 'March',
		value: 62
	},
	{
		letter: 'A',
		month: 'April',
		value: 15
	},
	{
		letter: 'B',
		month: 'April',
		value: 52
	},
	{
		letter: 'C',
		month: 'April',
		value: 15
	},
	{
		letter: 'D',
		month: 'April',
		value: 22
	},
	{
		letter: 'E',
		month: 'April',
		value: 59
	},
	{
		letter: 'F',
		month: 'April',
		value: 36
	},
	{
		letter: 'G',
		month: 'April',
		value: 5
	},
	{
		letter: 'H',
		month: 'April',
		value: 18
	},
	{
		letter: 'I',
		month: 'April',
		value: 42
	},
	{
		letter: 'J',
		month: 'April',
		value: 72
	},
	{
		letter: 'A',
		month: 'May',
		value: 30
	},
	{
		letter: 'B',
		month: 'May',
		value: 39
	},
	{
		letter: 'C',
		month: 'May',
		value: 69
	},
	{
		letter: 'D',
		month: 'May',
		value: 73
	},
	{
		letter: 'E',
		month: 'May',
		value: 2
	},
	{
		letter: 'F',
		month: 'May',
		value: 15
	},
	{
		letter: 'G',
		month: 'May',
		value: 86
	},
	{
		letter: 'H',
		month: 'May',
		value: 23
	},
	{
		letter: 'I',
		month: 'May',
		value: 65
	},
	{
		letter: 'J',
		month: 'May',
		value: 0
	},
	{
		letter: 'A',
		month: 'June',
		value: 51
	},
	{
		letter: 'B',
		month: 'June',
		value: 30
	},
	{
		letter: 'C',
		month: 'June',
		value: 7
	},
	{
		letter: 'D',
		month: 'June',
		value: 74
	},
	{
		letter: 'E',
		month: 'June',
		value: 44
	},
	{
		letter: 'F',
		month: 'June',
		value: 62
	},
	{
		letter: 'G',
		month: 'June',
		value: 65
	},
	{
		letter: 'H',
		month: 'June',
		value: 35
	},
	{
		letter: 'I',
		month: 'June',
		value: 95
	},
	{
		letter: 'J',
		month: 'June',
		value: 59
	},
	{
		letter: 'A',
		month: 'July',
		value: 89
	},
	{
		letter: 'B',
		month: 'July',
		value: 50
	},
	{
		letter: 'C',
		month: 'July',
		value: 35
	},
	{
		letter: 'D',
		month: 'July',
		value: 45
	},
	{
		letter: 'E',
		month: 'July',
		value: 93
	},
	{
		letter: 'F',
		month: 'July',
		value: 19
	},
	{
		letter: 'G',
		month: 'July',
		value: 52
	},
	{
		letter: 'H',
		month: 'July',
		value: 81
	},
	{
		letter: 'I',
		month: 'July',
		value: 72
	},
	{
		letter: 'J',
		month: 'July',
		value: 99
	},
	{
		letter: 'A',
		month: 'August',
		value: 54
	},
	{
		letter: 'B',
		month: 'August',
		value: 41
	},
	{
		letter: 'C',
		month: 'August',
		value: 75
	},
	{
		letter: 'D',
		month: 'August',
		value: 10
	},
	{
		letter: 'E',
		month: 'August',
		value: 0
	},
	{
		letter: 'F',
		month: 'August',
		value: 93
	},
	{
		letter: 'G',
		month: 'August',
		value: 3
	},
	{
		letter: 'H',
		month: 'August',
		value: 80
	},
	{
		letter: 'I',
		month: 'August',
		value: 88
	},
	{
		letter: 'J',
		month: 'August',
		value: 27
	},
	{
		letter: 'A',
		month: 'September',
		value: 81
	},
	{
		letter: 'B',
		month: 'September',
		value: 36
	},
	{
		letter: 'C',
		month: 'September',
		value: 77
	},
	{
		letter: 'D',
		month: 'September',
		value: 1
	},
	{
		letter: 'E',
		month: 'September',
		value: 45
	},
	{
		letter: 'F',
		month: 'September',
		value: 23
	},
	{
		letter: 'G',
		month: 'September',
		value: 1
	},
	{
		letter: 'H',
		month: 'September',
		value: 13
	},
	{
		letter: 'I',
		month: 'September',
		value: 61
	},
	{
		letter: 'J',
		month: 'September',
		value: 87
	},
	{
		letter: 'A',
		month: 'October',
		value: 5
	},
	{
		letter: 'B',
		month: 'October',
		value: 29
	},
	{
		letter: 'C',
		month: 'October',
		value: 49
	},
	{
		letter: 'D',
		month: 'October',
		value: 81
	},
	{
		letter: 'E',
		month: 'October',
		value: 5
	},
	{
		letter: 'F',
		month: 'October',
		value: 6
	},
	{
		letter: 'G',
		month: 'October',
		value: 3
	},
	{
		letter: 'H',
		month: 'October',
		value: 72
	},
	{
		letter: 'I',
		month: 'October',
		value: 27
	},
	{
		letter: 'J',
		month: 'October',
		value: 99
	},
	{
		letter: 'A',
		month: 'November',
		value: 25
	},
	{
		letter: 'B',
		month: 'November',
		value: 11
	},
	{
		letter: 'C',
		month: 'November',
		value: 54
	},
	{
		letter: 'D',
		month: 'November',
		value: 90
	},
	{
		letter: 'E',
		month: 'November',
		value: 21
	},
	{
		letter: 'F',
		month: 'November',
		value: 5
	},
	{
		letter: 'G',
		month: 'November',
		value: 41
	},
	{
		letter: 'H',
		month: 'November',
		value: 4
	},
	{
		letter: 'I',
		month: 'November',
		value: 31
	},
	{
		letter: 'J',
		month: 'November',
		value: 22
	},
	{
		letter: 'A',
		month: 'December',
		value: 99
	},
	{
		letter: 'B',
		month: 'December',
		value: 54
	},
	{
		letter: 'C',
		month: 'December',
		value: 85
	},
	{
		letter: 'D',
		month: 'December',
		value: 39
	},
	{
		letter: 'E',
		month: 'December',
		value: 45
	},
	{
		letter: 'F',
		month: 'December',
		value: 24
	},
	{
		letter: 'G',
		month: 'December',
		value: 87
	},
	{
		letter: 'H',
		month: 'December',
		value: 69
	},
	{
		letter: 'I',
		month: 'December',
		value: 59
	},
	{
		letter: 'J',
		month: 'December',
		value: 44
	}
]

const heatmapMissingData: ChartTabularData = [
	{
		letter: 'A',
		month: 'January',
		value: 41
	},
	{
		letter: 'B',
		month: 'January',
		value: 7
	},
	{
		letter: 'C',
		month: 'January',
		value: 66
	},
	{
		letter: 'D',
		month: 'January',
		value: 85
	},
	{
		letter: 'E',
		month: 'January',
		value: 70
	},
	{
		letter: 'F',
		month: 'January',
		value: 98
	},
	{
		letter: 'G',
		month: 'January',
		value: 90
	},
	{
		letter: 'H',
		month: 'January',
		value: 66
	},
	{
		letter: 'I',
		month: 'January',
		value: 0
	},
	{
		letter: 'J',
		month: 'January',
		value: 13
	},
	{
		letter: 'A',
		month: 'February',
		value: 16
	},
	{
		letter: 'B',
		month: 'February',
		value: 5
	},
	{
		letter: 'C',
		month: 'February',
		value: 6
	},
	{
		letter: 'D',
		month: 'February',
		value: 48
	},
	{
		letter: 'J',
		month: 'February',
		value: 83
	},
	{
		letter: 'A',
		month: 'March',
		value: 62
	},
	{
		letter: 'B',
		month: 'March',
		value: 57
	},
	{
		letter: 'C',
		month: 'March',
		value: 90
	},
	{
		letter: 'D',
		month: 'March',
		value: 68
	},
	{
		letter: 'E',
		month: 'March',
		value: 84
	},
	{
		letter: 'F',
		month: 'March',
		value: 21
	},
	{
		letter: 'I',
		month: 'March',
		value: 42
	},
	{
		letter: 'A',
		month: 'April',
		value: 15
	},
	{
		letter: 'B',
		month: 'April',
		value: 52
	},
	{
		letter: 'D',
		month: 'April',
		value: 22
	},
	{
		letter: 'E',
		month: 'April',
		value: 59
	},
	{
		letter: 'G',
		month: 'April',
		value: 5
	},
	{
		letter: 'I',
		month: 'April',
		value: 42
	},
	{
		letter: 'J',
		month: 'April',
		value: 72
	},
	{
		letter: 'B',
		month: 'May',
		value: 39
	},
	{
		letter: 'C',
		month: 'May',
		value: 69
	},
	{
		letter: 'E',
		month: 'May',
		value: 2
	},
	{
		letter: 'F',
		month: 'May',
		value: 15
	},
	{
		letter: 'H',
		month: 'May',
		value: 23
	},
	{
		letter: 'I',
		month: 'May',
		value: 65
	},
	{
		letter: 'A',
		month: 'June',
		value: 51
	},
	{
		letter: 'B',
		month: 'June',
		value: 30
	},
	{
		letter: 'I',
		month: 'June',
		value: 95
	},
	{
		letter: 'J',
		month: 'June',
		value: 59
	},
	{
		letter: 'A',
		month: 'July',
		value: 89
	},
	{
		letter: 'B',
		month: 'July',
		value: 50
	},
	{
		letter: 'C',
		month: 'July',
		value: 35
	},
	{
		letter: 'D',
		month: 'July',
		value: 45
	},
	{
		letter: 'E',
		month: 'July',
		value: 93
	},
	{
		letter: 'F',
		month: 'July',
		value: 19
	},
	{
		letter: 'G',
		month: 'July',
		value: 52
	},
	{
		letter: 'H',
		month: 'July',
		value: 81
	},
	{
		letter: 'I',
		month: 'July',
		value: 72
	},
	{
		letter: 'J',
		month: 'July',
		value: 99
	},
	{
		letter: 'A',
		month: 'August',
		value: 54
	},
	{
		letter: 'D',
		month: 'August',
		value: 10
	},
	{
		letter: 'E',
		month: 'August',
		value: 0
	},
	{
		letter: 'F',
		month: 'August',
		value: 93
	},
	{
		letter: 'G',
		month: 'August',
		value: 3
	},
	{
		letter: 'H',
		month: 'August',
		value: 80
	},
	{
		letter: 'I',
		month: 'August',
		value: 88
	},
	{
		letter: 'J',
		month: 'August',
		value: 27
	},
	{
		letter: 'B',
		month: 'September',
		value: 36
	},
	{
		letter: 'C',
		month: 'September',
		value: 77
	},
	{
		letter: 'D',
		month: 'September',
		value: 1
	},
	{
		letter: 'E',
		month: 'September',
		value: 45
	},
	{
		letter: 'F',
		month: 'September',
		value: 23
	},
	{
		letter: 'G',
		month: 'September',
		value: 1
	},
	{
		letter: 'H',
		month: 'September',
		value: 13
	},
	{
		letter: 'I',
		month: 'September',
		value: 61
	},
	{
		letter: 'J',
		month: 'September',
		value: 87
	},
	{
		letter: 'A',
		month: 'October',
		value: 5
	},
	{
		letter: 'B',
		month: 'October',
		value: 29
	},
	{
		letter: 'C',
		month: 'October',
		value: 49
	},
	{
		letter: 'D',
		month: 'October',
		value: 81
	},
	{
		letter: 'E',
		month: 'October',
		value: 5
	},
	{
		letter: 'F',
		month: 'October',
		value: 6
	},
	{
		letter: 'J',
		month: 'October',
		value: 99
	},
	{
		letter: 'A',
		month: 'November',
		value: 25
	},
	{
		letter: 'B',
		month: 'November',
		value: 11
	},
	{
		letter: 'C',
		month: 'November',
		value: 54
	},
	{
		letter: 'F',
		month: 'November',
		value: 5
	},
	{
		letter: 'G',
		month: 'November',
		value: 41
	},
	{
		letter: 'H',
		month: 'November',
		value: 4
	},
	{
		letter: 'I',
		month: 'November',
		value: 31
	},
	{
		letter: 'J',
		month: 'November',
		value: 22
	},
	{
		letter: 'A',
		month: 'December',
		value: 99
	},
	{
		letter: 'B',
		month: 'December',
		value: 54
	},
	{
		letter: 'C',
		month: 'December',
		value: 85
	},
	{
		letter: 'D',
		month: 'December',
		value: 39
	},
	{
		letter: 'E',
		month: 'December',
		value: 45
	},
	{
		letter: 'F',
		month: 'December',
		value: 24
	},
	{
		letter: 'G',
		month: 'December',
		value: 87
	}
]

const heatmapPositiveNegativeData = [
	{ letter: 'A', month: 'January', value: -4.1 },
	{ letter: 'B', month: 'January', value: 0.7 },
	{ letter: 'C', month: 'January', value: 6.6 },
	{ letter: 'D', month: 'January', value: -8.5 },
	{ letter: 'E', month: 'January', value: 7 },
	{ letter: 'F', month: 'January', value: -9.8 },
	{ letter: 'G', month: 'January', value: 9 },
	{ letter: 'H', month: 'January', value: -6.6 },
	{ letter: 'I', month: 'January', value: 0 },
	{ letter: 'J', month: 'January', value: -1.3 },
	{ letter: 'A', month: 'February', value: -1.6 },
	{ letter: 'B', month: 'February', value: -0.5 },
	{ letter: 'C', month: 'February', value: -0.6 },
	{ letter: 'D', month: 'February', value: -4.8 },
	{ letter: 'E', month: 'February', value: -7.2 },
	{ letter: 'F', month: 'February', value: -2.6 },
	{ letter: 'G', month: 'February', value: 7 },
	{ letter: 'H', month: 'February', value: -9.9 },
	{ letter: 'I', month: 'February', value: -7.9 },
	{ letter: 'J', month: 'February', value: 8.3 },
	{ letter: 'A', month: 'March', value: -6.2 },
	{ letter: 'B', month: 'March', value: -5.7 },
	{ letter: 'C', month: 'March', value: 9 },
	{ letter: 'D', month: 'March', value: -6.8 },
	{ letter: 'E', month: 'March', value: -8.4 },
	{ letter: 'F', month: 'March', value: -2.1 },
	{ letter: 'G', month: 'March', value: -5.4 },
	{ letter: 'H', month: 'March', value: 2.5 },
	{ letter: 'I', month: 'March', value: 4.2 },
	{ letter: 'J', month: 'March', value: 6.2 },
	{ letter: 'A', month: 'April', value: -1.5 },
	{ letter: 'B', month: 'April', value: -5.2 },
	{ letter: 'C', month: 'April', value: 1.5 },
	{ letter: 'D', month: 'April', value: 2.2 },
	{ letter: 'E', month: 'April', value: 5.9 },
	{ letter: 'F', month: 'April', value: -3.6 },
	{ letter: 'G', month: 'April', value: 0.5 },
	{ letter: 'H', month: 'April', value: -1.8 },
	{ letter: 'I', month: 'April', value: -4.2 },
	{ letter: 'J', month: 'April', value: -7.2 },
	{ letter: 'A', month: 'May', value: -3 },
	{ letter: 'B', month: 'May', value: 3.9 },
	{ letter: 'C', month: 'May', value: 6.9 },
	{ letter: 'D', month: 'May', value: 7.3 },
	{ letter: 'E', month: 'May', value: -0.2 },
	{ letter: 'F', month: 'May', value: -1.5 },
	{ letter: 'G', month: 'May', value: -8.6 },
	{ letter: 'H', month: 'May', value: -2.3 },
	{ letter: 'I', month: 'May', value: 6.5 },
	{ letter: 'J', month: 'May', value: 0 },
	{ letter: 'A', month: 'June', value: 5.1 },
	{ letter: 'B', month: 'June', value: -3 },
	{ letter: 'C', month: 'June', value: 0.7 },
	{ letter: 'D', month: 'June', value: -7.4 },
	{ letter: 'E', month: 'June', value: -4.4 },
	{ letter: 'F', month: 'June', value: -6.2 },
	{ letter: 'G', month: 'June', value: 6.5 },
	{ letter: 'H', month: 'June', value: 3.5 },
	{ letter: 'I', month: 'June', value: -9.5 },
	{ letter: 'J', month: 'June', value: 5.9 },
	{ letter: 'A', month: 'July', value: -8.9 },
	{ letter: 'B', month: 'July', value: 5 },
	{ letter: 'C', month: 'July', value: -3.5 },
	{ letter: 'D', month: 'July', value: -4.5 },
	{ letter: 'E', month: 'July', value: 9.3 },
	{ letter: 'F', month: 'July', value: -1.9 },
	{ letter: 'G', month: 'July', value: 5.2 },
	{ letter: 'H', month: 'July', value: 8.1 },
	{ letter: 'I', month: 'July', value: 7.2 },
	{ letter: 'J', month: 'July', value: 9.9 },
	{ letter: 'A', month: 'August', value: 5.4 },
	{ letter: 'B', month: 'August', value: 4.1 },
	{ letter: 'C', month: 'August', value: 7.5 },
	{ letter: 'D', month: 'August', value: 1 },
	{ letter: 'E', month: 'August', value: 0 },
	{ letter: 'F', month: 'August', value: -9.3 },
	{ letter: 'G', month: 'August', value: -0.3 },
	{ letter: 'H', month: 'August', value: 8 },
	{ letter: 'I', month: 'August', value: 8.8 },
	{ letter: 'J', month: 'August', value: 2.7 },
	{ letter: 'A', month: 'September', value: 8.1 },
	{ letter: 'B', month: 'September', value: -3.6 },
	{ letter: 'C', month: 'September', value: 7.7 },
	{ letter: 'D', month: 'September', value: -0.1 },
	{ letter: 'E', month: 'September', value: -4.5 },
	{ letter: 'F', month: 'September', value: 2.3 },
	{ letter: 'G', month: 'September', value: -0.1 },
	{ letter: 'H', month: 'September', value: 1.3 },
	{ letter: 'I', month: 'September', value: 6.1 },
	{ letter: 'J', month: 'September', value: 8.7 },
	{ letter: 'A', month: 'October', value: 0.5 },
	{ letter: 'B', month: 'October', value: -2.9 },
	{ letter: 'C', month: 'October', value: 4.9 },
	{ letter: 'D', month: 'October', value: 8.1 },
	{ letter: 'E', month: 'October', value: 0.5 },
	{ letter: 'F', month: 'October', value: 0.6 },
	{ letter: 'G', month: 'October', value: -0.3 },
	{ letter: 'H', month: 'October', value: -7.2 },
	{ letter: 'I', month: 'October', value: 2.7 },
	{ letter: 'J', month: 'October', value: 9.9 },
	{ letter: 'A', month: 'November', value: 2.5 },
	{ letter: 'B', month: 'November', value: -1.1 },
	{ letter: 'C', month: 'November', value: 5.4 },
	{ letter: 'D', month: 'November', value: 9 },
	{ letter: 'E', month: 'November', value: -2.1 },
	{ letter: 'F', month: 'November', value: -0.5 },
	{ letter: 'G', month: 'November', value: -4.1 },
	{ letter: 'H', month: 'November', value: 0.4 },
	{ letter: 'I', month: 'November', value: -3.1 },
	{ letter: 'J', month: 'November', value: 2.2 },
	{ letter: 'A', month: 'December', value: 9.9 },
	{ letter: 'B', month: 'December', value: 5.4 },
	{ letter: 'C', month: 'December', value: -8.5 },
	{ letter: 'D', month: 'December', value: 3.9 },
	{ letter: 'E', month: 'December', value: -4.5 },
	{ letter: 'F', month: 'December', value: -2.4 },
	{ letter: 'G', month: 'December', value: 8.7 },
	{ letter: 'H', month: 'December', value: -6.9 },
	{ letter: 'I', month: 'December', value: -5.9 },
	{ letter: 'J', month: 'December', value: -4.4 }
]

export const examples: Example[] = [
	{
		options: heatmapOptions,
		data: heatmapData
	},
	{
		options: heatmapQuantizeLegendOption,
		data: heatmapData
	},
	{
		options: heatmapPositiveNegativeOptions,
		data: heatmapPositiveNegativeData
	},
	{
		options: heatmapMissingDataOptions,
		data: heatmapMissingData
	},
	{
		options: heatmapDomainOptions,
		data: heatmapData
	}
]
