import { type GaugeChartOptions, type ChartTabularData } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'GaugeChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-gauge-chart',
	vue: `Ccv${vanilla}`
}

const gaugeOptionsSemi: GaugeChartOptions = {
	title: 'Gauge semicircular -- danger status',
	resizable: true,
	height: '250px',
	gauge: {
		type: 'semi',
		status: 'danger'
	}
}

const gaugeOptionsCircular: GaugeChartOptions = {
	title: 'Gauge circular -- warning status',
	resizable: true,
	height: '250px',
	gauge: {
		status: 'warning',
		type: 'full'
	}
}

const gaugeOptionsCircularNoDelta: GaugeChartOptions = {
	title: 'Gauge circular without delta -- custom color',
	resizable: true,
	height: '250px',
	gauge: {
		type: 'full'
	},
	color: {
		scale: {
			value: '#FFE5B4'
		}
	}
}

const gaugeData: ChartTabularData = [
	{ group: 'value', value: 42 },
	{ group: 'delta', value: -13.37 }
]

const gaugeDataNoDelta = [{ group: 'value', value: 67 }]

export const examples: Example[] = [
	{
		options: gaugeOptionsSemi,
		data: gaugeData,
		test: true
	},
	{
		options: gaugeOptionsCircular,
		data: gaugeData,
		test: true
	},
	{
		options: gaugeOptionsCircularNoDelta,
		data: gaugeDataNoDelta,
		test: true
	}
]
