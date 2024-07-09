import {
	type LineChartOptions,
	type ChartTabularData,
	ScaleTypes,
	LegendPositions,
	LegendOrientations,
	TickRotations,
	TimeIntervalNames
} from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'LineChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-line-chart',
	vue: `Ccv${vanilla}`
}

const lineOptions: LineChartOptions = {
	title: 'Line (discrete)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const lineLongLabelOptions: LineChartOptions = {
	title: 'Truncated labels (line)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const lineCustomDomainOptions: LineChartOptions = {
	title: 'Custom domain (line)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS,
			domain: ['Qty', 'More', 'Misc']
		},
		left: {
			domain: [10000, 50000],
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const lineSelectedGroupsOptions: LineChartOptions = {
	title: 'Pre-selected groups (line)',
	data: {
		selectedGroups: ['Dataset 1', 'Dataset 3']
	},
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	height: '400px'
}

const lineCustomColorOptions: LineChartOptions = {
	title: 'Custom colors (line)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	color: {
		scale: {
			'Dataset 1': '#925699',
			'Dataset 2': '#525669',
			'Dataset 3': '#725699',
			'Dataset 4': '#ccc'
		}
	},
	height: '400px'
}

const lineTimeSeriesOptions: LineChartOptions = {
	title: 'Line (time series)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesWithThresholdsOptions: LineChartOptions = {
	title: 'Thresholds (line)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME,
			thresholds: [
				{
					value: new Date(2023, 0, 11),
					label: 'Custom formatter',
					valueFormatter: (d: Date) =>
						new Intl.DateTimeFormat('en-CA', { month: 'short', day: '2-digit' }).format(d)
				}
			]
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR,
			thresholds: [
				{ value: 55000, label: 'Custom label', fillColor: 'orange' },
				{ value: 10000, fillColor: '#03a9f4' }
			]
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesDenseOptions: LineChartOptions = {
	title: 'Line (dense time series)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineTimeSeriesRotatedTicksOptions: LineChartOptions = {
	title: 'Rotated ticks (line)',
	axes: {
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date',
			ticks: {
				rotation: TickRotations.ALWAYS
			}
		},
		left: {
			mapsTo: 'value'
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineLogAxisOptions: LineChartOptions = {
	title: 'Log Axis',
	axes: {
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LOG,
			includeZero: false
		}
	},
	height: '400px'
}

const lineEmptyStateOptions: LineChartOptions = {
	title: 'Line (empty state)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineSkeletonOptions: LineChartOptions = {
	title: 'Line (skeleton)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	data: {
		loading: true
	},
	height: '400px'
}

const dualLine: LineChartOptions = {
	title: 'Line + Line (dual axes)',
	axes: {
		left: {
			title: 'Temperature (°C)',
			mapsTo: 'temp'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date',
			title: 'Date'
		},
		right: {
			title: 'Rainfall (mm)',
			mapsTo: 'rainfall',
			correspondingDatasets: ['Rainfall']
		}
	},
	curve: 'curveMonotoneX',
	height: '400px'
}

const lineOptionsLegendOrientation: LineChartOptions = {
	title: 'Left aligned vertical legend (line)',
	axes: {
		bottom: {
			title: '2023 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	legend: {
		position: LegendPositions.LEFT,
		orientation: LegendOrientations.VERTICAL
	},
	height: '400px'
}

const lineTimeSeriesFrenchLocale: LineChartOptions = {
	title: 'Line (time series) - Time interval monthly with French locale',
	axes: {
		left: {
			ticks: {},
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			ticks: {},
			mapsTo: 'date'
		}
	},
	tooltip: {},
	legend: {
		clickable: false
	},
	height: '400px',
	locale: {
		code: 'fr-FR'
	}
}

const lineOptionsTimeSeries15secs: LineChartOptions = {
	title: 'Line (time series) - 15 second interval',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesMinute: LineChartOptions = {
	title: 'Line (time series) - Time interval minute',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeries30mins: LineChartOptions = {
	title: 'Line (time series) - Time interval 30minutes',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesHourlyWithDefaultTicks: LineChartOptions = {
	title:
		"Line (time series) - Time interval hourly with default ticks formats ('MMM d, hh a' and 'hh a')",
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesHourlyWithCustomTicks: LineChartOptions = {
	title:
		"Line (time series) - Time interval hourly with custom ticks formats ('MMM d, HH:mm' and 'HH:mm')",
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		timeIntervalFormats: {
			hourly: {
				primary: 'MMM d, HH:mm',
				secondary: 'HH:mm'
			}
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesDaily: LineChartOptions = {
	title: 'Line (time series) - Time interval daily',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesWeekly: LineChartOptions = {
	title: 'Line (time series) - Time interval weekly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		showDayName: true
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesMonthly: LineChartOptions = {
	title: 'Line (time series) - Time interval monthly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesQuarterly: LineChartOptions = {
	title: 'Line (time series) - Time interval quarterly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesOverride: LineChartOptions = {
	title: 'Line (time series) - Time interval override',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		timeInterval: TimeIntervalNames.monthly
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesYearly: LineChartOptions = {
	title: 'Line (time series) - Time interval yearly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesSingleDatum: LineChartOptions = {
	title: 'Line (time series) - Single datum',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesEdgeSpaceZero: LineChartOptions = {
	title: 'Line (time series) - addSpaceOnEdges = 0',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		addSpaceOnEdges: 0
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesTwoIdenticalLabels: LineChartOptions = {
	title: 'Line (time series) - Two identical labels',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		addSpaceOnEdges: 0
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineTimeSeriesZoomTwoIcons: LineChartOptions = {
	title: 'Line (time series) - two icons',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			mapsTo: 'date',
			scaleType: ScaleTypes.TIME
		},
		left: {
			mapsTo: 'value',
			title: 'Conversion rate',
			scaleType: ScaleTypes.LINEAR
		}
	},
	curve: 'curveMonotoneX',
	toolbar: {
		enabled: true,
		numberOfIcons: 2,
		controls: [
			{
				type: 'Reset zoom'
			},
			{
				type: 'Zoom in'
			},
			{
				type: 'Zoom out'
			}
		]
	},
	zoomBar: {
		top: {
			enabled: true
		}
	},
	height: '400px'
}

const lineTimeSeriesZoomTwoIconsData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 50000,
		surplus: 776202545.2043447
	},
	{
		group: 'Dataset 1',
		date: '2019-01-05T05:00:00.000Z',
		value: 65000,
		surplus: 1185729357.0244992
	},
	{
		group: 'Dataset 1',
		date: '2019-01-08T05:00:00.000Z',
		value: null,
		surplus: 11613.75907479044
	},
	{
		group: 'Dataset 1',
		date: '2019-01-13T05:00:00.000Z',
		value: 49213,
		surplus: 847080513.346657
	},
	{
		group: 'Dataset 1',
		date: '2019-01-17T05:00:00.000Z',
		value: 51213,
		surplus: 1211892509.000086
	},
	{
		group: 'Dataset 2',
		date: '2019-01-02T05:00:00.000Z',
		value: 0,
		surplus: 6102.7727993504
	},
	{
		group: 'Dataset 2',
		date: '2019-01-06T05:00:00.000Z',
		value: 57312,
		surplus: 261556941.96214834
	},
	{
		group: 'Dataset 2',
		date: '2019-01-08T05:00:00.000Z',
		value: 27432,
		surplus: 14178837.917517675
	},
	{
		group: 'Dataset 2',
		date: '2019-01-15T05:00:00.000Z',
		value: 70323,
		surplus: 295263282.23943055
	},
	{
		group: 'Dataset 2',
		date: '2019-01-19T05:00:00.000Z',
		value: 21300,
		surplus: 133872100.36457807
	},
	{
		group: 'Dataset 3',
		date: '2019-01-01T05:00:00.000Z',
		value: 40000,
		surplus: 302619995.3236921
	},
	{
		group: 'Dataset 3',
		date: '2019-01-05T05:00:00.000Z',
		value: null,
		surplus: 19518.355960758956
	},
	{
		group: 'Dataset 3',
		date: '2019-01-08T05:00:00.000Z',
		value: 18000,
		surplus: 431282259.09100664
	},
	{
		group: 'Dataset 3',
		date: '2019-01-13T05:00:00.000Z',
		value: 39213,
		surplus: 788505803.1662132
	},
	{
		group: 'Dataset 3',
		date: '2019-01-17T05:00:00.000Z',
		value: 61213,
		surplus: 1273123736.0033627
	},
	{
		group: 'Dataset 4',
		date: '2019-01-02T05:00:00.000Z',
		value: 20000,
		surplus: 466576638.7877422
	},
	{
		group: 'Dataset 4',
		date: '2019-01-06T05:00:00.000Z',
		value: 37312,
		surplus: 368228069.08366436
	},
	{
		group: 'Dataset 4',
		date: '2019-01-08T05:00:00.000Z',
		value: 51432,
		surplus: 240908388.9062717
	},
	{
		group: 'Dataset 4',
		date: '2019-01-15T05:00:00.000Z',
		value: 25332,
		surplus: 422842585.96060365
	},
	{
		group: 'Dataset 4',
		date: '2019-01-19T05:00:00.000Z',
		value: null,
		surplus: 24964.179219263424
	}
]

const lineOptionsTimeSeriesLabelsInPrimaryFormat: LineChartOptions = {
	title: 'Line (time series) - All labels in primary format',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		addSpaceOnEdges: 0
	},
	legend: {
		clickable: false
	},
	height: '400px'
}

const lineOptionsTimeSeriesLabelsInPrimaryFormatData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-01-23T06:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-29T06:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesTwoIdenticalLabelsData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-01-24T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-02-10T04:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesEdgeSpaceZeroData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-12-30T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-12-31T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-02T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-03T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-04T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-05T05:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesSingleDatumData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-01-06T19:43:16.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesYearlyData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '1977-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1978-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1979-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1980-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1981-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1982-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '1983-01-01T05:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesOverrideData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2018-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-04-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-07-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-10-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-04-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-07-01T04:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesQuarterlyData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2018-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-04-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-07-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2018-10-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-04-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-07-01T04:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesMonthlyData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-10-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-11-01T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-12-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-02-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-03-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-04-01T04:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesWeeklyData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-12-30T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-12-31T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-02T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-03T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-04T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-05T05:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesDailyData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2019-12-30T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-12-31T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-01T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-02T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-03T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-04T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-01-05T05:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesHourlyWithCustomTicksData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-12-11T03:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T06:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T07:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T08:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T09:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesHourlyWithDefaultTicksData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-12-11T03:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T06:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T07:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T08:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T09:00:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeries30minsData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:30:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:30:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T06:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T06:30:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeriesMinuteData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2020-05-22T03:40:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T03:50:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T03:55:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T04:00:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T04:05:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T04:07:00.000Z',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2020-05-22T04:10:00.000Z',
		value: 10
	}
]

const lineOptionsTimeSeries15secsData = [
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:59:15.000Z',
		value: 15
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:59:30.000Z',
		value: 15
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T04:59:45.000Z',
		value: 7
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:00.000Z',
		value: 2
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:15.000Z',
		value: 9
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:30.000Z',
		value: 13
	},
	{
		group: 'Dataset 1',
		date: '2020-12-11T05:00:45.000Z',
		value: 8
	}
]

const lineData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 }
]

const lineLongLabelData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{
		group: 'Dataset 1',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 42300
	},
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 53200 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{
		group: 'Dataset 2',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 21400
	},
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{
		group: 'Dataset 3',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 1400
	},
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Qty', value: 22000 },
	{ group: 'LongLabelShouldBeTruncated', key: 'More', value: 1200 },
	{ group: 'LongLabelShouldBeTruncated', key: 'Sold', value: 9000 },
	{
		group: 'LongLabelShouldBeTruncated',
		key: '347FEDE2F7403759069E5F84B65B49D2467D8914B5184738699259AA310EB0F9',
		value: 24000,
		audienceSize: 10
	},
	{
		group: 'LongLabelShouldBeTruncated',
		key: 'Misc',
		value: 3000,
		audienceSize: 10
	}
]

const lineSelectedGroupsData: ChartTabularData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 1', key: 'More', value: 23500 },
	{ group: 'Dataset 1', key: 'Sold', value: 53100 },
	{ group: 'Dataset 1', key: 'Restocking', value: 42300 },
	{ group: 'Dataset 1', key: 'Misc', value: 12300 },
	{ group: 'Dataset 2', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 56000 },
	{ group: 'Dataset 2', key: 'Sold', value: 42300 },
	{ group: 'Dataset 2', key: 'Restocking', value: 21400 },
	{ group: 'Dataset 2', key: 'Misc', value: 0 },
	{ group: 'Dataset 3', key: 'Qty', value: 41200 },
	{ group: 'Dataset 3', key: 'More', value: 18400 },
	{ group: 'Dataset 3', key: 'Sold', value: 34210 },
	{ group: 'Dataset 3', key: 'Restocking', value: 1400 },
	{ group: 'Dataset 3', key: 'Misc', value: 42100 },
	{ group: 'Dataset 4', key: 'Qty', value: 22000 },
	{ group: 'Dataset 4', key: 'More', value: 1200 },
	{ group: 'Dataset 4', key: 'Sold', value: 9000 },
	{ group: 'Dataset 4', key: 'Restocking', value: 24000, audienceSize: 10 },
	{ group: 'Dataset 4', key: 'Misc', value: 3000, audienceSize: 10 }
]

export const lineTimeSeriesData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 50000 },
	{ group: 'Dataset 1', date: '2023-01-05', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-08', value: null },
	{ group: 'Dataset 1', date: '2023-01-13', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-02', value: 0 },
	{ group: 'Dataset 2', date: '2023-01-06', value: 57312 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 27432 },
	{ group: 'Dataset 2', date: '2023-01-15', value: 70323 },
	{ group: 'Dataset 2', date: '2023-01-19', value: 21300 },
	{ group: 'Dataset 3', date: '2023-01-01', value: 40000 },
	{ group: 'Dataset 3', date: '2023-01-05', value: null },
	{ group: 'Dataset 3', date: '2023-01-08', value: 18000 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 39213 },
	{ group: 'Dataset 3', date: '2023-01-17', value: 61213 },
	{ group: 'Dataset 4', date: '2023-01-02', value: 20000 },
	{ group: 'Dataset 4', date: '2023-01-06', value: 37312 },
	{ group: 'Dataset 4', date: '2023-01-08', value: 51432 },
	{ group: 'Dataset 4', date: '2023-01-15', value: 25332 },
	{ group: 'Dataset 4', date: '2023-01-19', value: null }
]

const lineTimeSeriesDenseData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01T00:00:00.000Z', value: -10000 },
	{ group: 'Dataset 1', date: '2023-01-01T05:00:00.000Z', value: -12000 },
	{ group: 'Dataset 1', date: '2023-01-01T10:00:00.000Z', value: -14000 },
	{ group: 'Dataset 1', date: '2023-01-02T00:00:00.000Z', value: -25000 },
	{ group: 'Dataset 1', date: '2023-01-02T02:00:00.000Z', value: -26000 },
	{ group: 'Dataset 1', date: '2023-01-03T00:00:00.000Z', value: -10000 },
	{ group: 'Dataset 1', date: '2023-01-03T05:00:00.000Z', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-03T10:00:00.000Z', value: 12000 },
	{ group: 'Dataset 1', date: '2023-01-05T00:00:00.000Z', value: 45000 },
	{ group: 'Dataset 1', date: '2023-01-07T00:00:00.000Z', value: 49000 },
	{ group: 'Dataset 1', date: '2023-01-07T15:00:00.000Z', value: 45000 },
	{ group: 'Dataset 1', date: '2023-01-09T00:00:00.000Z', value: 50000 },
	{ group: 'Dataset 1', date: '2023-01-09T05:00:00.000Z', value: 52000 },
	{ group: 'Dataset 1', date: '2023-01-09T15:00:00.000Z', value: 55000 },
	{ group: 'Dataset 1', date: '2023-01-10T00:00:00.000Z', value: 50000 },
	{ group: 'Dataset 1', date: '2023-01-12T00:00:00.000Z', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-13T00:00:00.000Z', value: 80000 },
	{ group: 'Dataset 1', date: '2023-01-14T10:00:00.000Z', value: 85000 },
	{ group: 'Dataset 1', date: '2023-01-15T07:00:00.000Z', value: 90000 },
	{ group: 'Dataset 1', date: '2023-01-15T18:00:00.000Z', value: 70000 },
	{ group: 'Dataset 2', date: '2023-01-01T00:00:00.000Z', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-01T03:00:00.000Z', value: 22000 },
	{ group: 'Dataset 2', date: '2023-01-01T16:00:00.000Z', value: 24000 },
	{ group: 'Dataset 2', date: '2023-01-02T00:00:00.000Z', value: 35000 },
	{ group: 'Dataset 2', date: '2023-01-02T07:00:00.000Z', value: 36000 },
	{ group: 'Dataset 2', date: '2023-01-03T00:00:00.000Z', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-03T06:00:00.000Z', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-03T18:00:00.000Z', value: 22000 },
	{ group: 'Dataset 2', date: '2023-01-05T00:00:00.000Z', value: 62000 },
	{ group: 'Dataset 2', date: '2023-01-06T00:00:00.000Z', value: 52000 },
	{ group: 'Dataset 2', date: '2023-01-07T00:00:00.000Z', value: 52000 },
	{ group: 'Dataset 2', date: '2023-01-07T15:00:00.000Z', value: 52000 },
	{ group: 'Dataset 2', date: '2023-01-09T00:00:00.000Z', value: 60000 },
	{ group: 'Dataset 2', date: '2023-01-09T05:00:00.000Z', value: 62000 },
	{ group: 'Dataset 2', date: '2023-01-09T10:00:00.000Z', value: 62000 },
	{ group: 'Dataset 2', date: '2023-01-12T00:00:00.000Z', value: 65000 },
	{ group: 'Dataset 2', date: '2023-01-14T00:00:00.000Z', value: 40000 },
	{ group: 'Dataset 2', date: '2023-01-15T05:00:00.000Z', value: 45000 },
	{ group: 'Dataset 2', date: '2023-01-15T10:00:00.000Z', value: 35000 },
	{ group: 'Dataset 2', date: '2023-01-15T18:00:00.000Z', value: 30000 }
]

const lineTimeSeriesFrenchLocaleData: ChartTabularData = [
	{
		group: 'Dataset 1',
		date: '2023-10-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2023-11-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2023-12-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2024-01-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2024-02-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2024-03-01',
		value: 10
	},
	{
		group: 'Dataset 1',
		date: '2019-04-01',
		value: 10
	}
]

const lineTimeSeriesDataRotatedTicks: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-12-30', value: 32100 },
	{ group: 'Dataset 1', date: '2023-12-31', value: 23500 },
	{ group: 'Dataset 1', date: '2024-01-01', value: 53100 },
	{ group: 'Dataset 1', date: '2024-01-02', value: 42300 },
	{ group: 'Dataset 1', date: '2024-01-03', value: 12300 }
]

const lineLogAxisData: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-12-30', value: 300100 },
	{ group: 'Dataset 1', date: '2023-12-31', value: 235000 },
	{ group: 'Dataset 1', date: '2024-01-01', value: 153100 },
	{ group: 'Dataset 1', date: '2024-01-02', value: 142300 },
	{ group: 'Dataset 1', date: '2024-01-03', value: 82300 }
]

const lineEmptyStateData: ChartTabularData = []
const lineSkeletonData: ChartTabularData = []

const lineTimeSeriesDualAxesData: ChartTabularData = [
	{ group: 'Temperature', date: '2023-01-01', temp: 23 },
	{ group: 'Temperature', date: '2023-02-01', temp: 15 },
	{ group: 'Temperature', date: '2023-03-01', temp: 24 },
	{ group: 'Temperature', date: '2023-04-01', temp: 33 },
	{ group: 'Temperature', date: '2023-05-01', temp: 23 },
	{ group: 'Temperature', date: '2023-06-01', temp: 32 },
	{ group: 'Temperature', date: '2023-07-01', temp: 23 },
	{ group: 'Rainfall', date: '2023-01-01', rainfall: 50 },
	{ group: 'Rainfall', date: '2023-02-01', rainfall: 65 },
	{ group: 'Rainfall', date: '2023-03-01', rainfall: 35 },
	{ group: 'Rainfall', date: '2023-04-01', rainfall: 43 },
	{ group: 'Rainfall', date: '2023-05-01', rainfall: 53 },
	{ group: 'Rainfall', date: '2023-06-01', rainfall: 19 },
	{ group: 'Rainfall', date: '2023-07-01', rainfall: 13 }
]

export const examples: Example[] = [
	{
		options: lineCustomDomainOptions,
		data: lineData,
		tags: ['test', 'axes']
	},
	{
		options: lineTimeSeriesRotatedTicksOptions,
		data: lineTimeSeriesDataRotatedTicks,
		tags: ['test', 'axes', 'time']
	},
	{
		options: lineOptionsTimeSeries15secs,
		data: lineOptionsTimeSeries15secsData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesMinute,
		data: lineOptionsTimeSeriesMinuteData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeries30mins,
		data: lineOptionsTimeSeries30minsData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesHourlyWithDefaultTicks,
		data: lineOptionsTimeSeriesHourlyWithDefaultTicksData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesHourlyWithCustomTicks,
		data: lineOptionsTimeSeriesHourlyWithCustomTicksData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesDaily,
		data: lineOptionsTimeSeriesDailyData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesWeekly,
		data: lineOptionsTimeSeriesWeeklyData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesMonthly,
		data: lineOptionsTimeSeriesMonthlyData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesQuarterly,
		data: lineOptionsTimeSeriesQuarterlyData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesYearly,
		data: lineOptionsTimeSeriesYearlyData,
		tags: ['axes', 'time']
	},

	{
		options: lineOptionsTimeSeriesOverride,
		data: lineOptionsTimeSeriesOverrideData,
		tags: ['axes', 'time']
	},
	{
		options: lineTimeSeriesFrenchLocale,
		data: lineTimeSeriesFrenchLocaleData,
		tags: ['test', 'axes', 'time', 'locale']
	},
	{
		options: lineLogAxisOptions,
		data: lineLogAxisData,
		tags: ['test', 'axes']
	},
	{
		options: lineCustomColorOptions,
		data: lineData,
		tags: ['test', 'colors']
	},
	{
		options: lineSelectedGroupsOptions,
		data: lineSelectedGroupsData,
		tags: ['test', 'legend']
	},
	{
		options: lineOptionsLegendOrientation,
		data: lineData,
		tags: ['test', 'legend']
	},
	{
		options: lineTimeSeriesWithThresholdsOptions,
		data: lineTimeSeriesData,
		tags: ['test', 'axes', 'time', 'thresholds']
	},
	{
		options: lineOptionsTimeSeriesSingleDatum,
		data: lineOptionsTimeSeriesSingleDatumData,
		tags: ['axes', 'time']
	},
	{
		options: lineLongLabelOptions,
		data: lineLongLabelData,
		tags: ['test', 'truncation']
	},
	{
		options: lineOptions,
		data: lineData,
		tags: ['test']
	},
	{
		options: lineTimeSeriesOptions,
		data: lineTimeSeriesData,
		tags: ['test', 'axes', 'time']
	},
	{
		options: lineTimeSeriesDenseOptions,
		data: lineTimeSeriesDenseData,
		tags: ['test', 'axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesEdgeSpaceZero,
		data: lineOptionsTimeSeriesEdgeSpaceZeroData,
		tags: ['axes', 'time']
	},
	{
		options: lineOptionsTimeSeriesTwoIdenticalLabels,
		data: lineOptionsTimeSeriesTwoIdenticalLabelsData,
		tags: ['axes', 'time']
	},
	{
		options: dualLine,
		data: lineTimeSeriesDualAxesData,
		tags: ['test', 'axes', 'time', 'dual']
	},
	{
		options: lineOptionsTimeSeriesLabelsInPrimaryFormat,
		data: lineOptionsTimeSeriesLabelsInPrimaryFormatData,
		tags: ['axes', 'time']
	},
	{
		options: lineTimeSeriesZoomTwoIcons,
		data: lineTimeSeriesZoomTwoIconsData,
		tags: ['time', 'zoombar', 'toolbar']
	},
	{
		options: lineEmptyStateOptions,
		data: lineEmptyStateData,
		tags: ['empty']
	},
	{
		options: lineSkeletonOptions,
		data: lineSkeletonData,
		tags: ['skeleton']
	}
]
