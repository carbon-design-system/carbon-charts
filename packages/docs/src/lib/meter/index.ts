import { type MeterChartOptions, type ChartTabularData } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'MeterChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: ['MeterChartComponent', 'ibm-meter-chart'],
	vue: `Ccv${vanilla}`
}

const meterOptionsWithStatus: MeterChartOptions = {
	title: 'Meter Chart - with statuses',
	meter: {
		peak: 80,
		status: {
			ranges: [
				{ range: [0, 50], status: 'success' },
				{ range: [50, 60], status: 'warning' },
				{ range: [60, 100], status: 'danger' }
			]
		}
	},
	height: '100px'
}

const meterOptionsCustomColor: MeterChartOptions = {
	title: 'Meter Chart - statuses and custom color',
	meter: {
		peak: 70,
		status: {
			ranges: [
				{ range: [0, 40], status: 'success' },
				{ range: [40, 60], status: 'warning' },
				{ range: [60, 100], status: 'danger' }
			]
		}
	},
	color: {
		scale: {
			'Dataset 1': '#925699'
		}
	},
	height: '100px'
}

const meterOptionsNoStatus: MeterChartOptions = {
	title: 'Meter Chart - no status',
	meter: {
		peak: 70
	},
	height: '100px'
}

const propMeterOptions: MeterChartOptions = {
	title: 'Proportional Meter Chart',
	height: '130px',
	meter: {
		proportional: {
			total: 2000,
			unit: 'GB'
		}
	},
	color: {
		pairing: {
			option: 2
		}
	}
}

const propMeterStatusOptions: MeterChartOptions = {
	title: 'Proportional Meter Chart - peak and statuses',
	height: '130px',
	meter: {
		peak: 1800,
		proportional: {
			total: 2000,
			unit: 'GB'
		},
		status: {
			ranges: [
				{
					range: [0, 800],
					status: 'success'
				},
				{
					range: [800, 1800],
					status: 'warning'
				},
				{
					range: [1800, 2000],
					status: 'danger'
				}
			]
		}
	},
	color: {
		pairing: {
			option: 2
		}
	}
}

const propMeterTruncationOptions: MeterChartOptions = {
	title: 'Proportional Meter Chart (truncated)',
	height: '130px',
	meter: {
		proportional: {
			total: 2000,
			unit: 'MB',
			totalFormatter: (total: number) => `custom total string for: ${total}`,
			breakdownFormatter: (x: { datasetsTotal: number }) =>
				`You are using ${x.datasetsTotal} GB of the space this label is really long will need to be truncated with a tooltip Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
		}
	}
}

const meterData: ChartTabularData = [
	{
		group: 'Dataset 1',
		value: 56
	}
]

const propMeterData: ChartTabularData = [
	{ group: 'emails', value: 202 },
	{ group: 'photos', value: 654 },
	{ group: 'text messages', value: 723 },
	{ group: 'other', value: 120 }
]

export const examples: Example[] = [
	{
		options: meterOptionsWithStatus,
		data: meterData,
		tags: ['test']
	},
	{
		options: meterOptionsCustomColor,
		data: meterData,
		tags: ['test']
	},
	{
		options: meterOptionsNoStatus,
		data: meterData,
		tags: ['test']
	},
	{
		options: propMeterOptions,
		data: propMeterData,
		tags: ['test']
	},
	{
		options: propMeterStatusOptions,
		data: propMeterData,
		tags: ['test']
	},
	{
		options: propMeterTruncationOptions,
		data: propMeterData,
		tags: ['test']
	}
]
