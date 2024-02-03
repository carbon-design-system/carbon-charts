import { ScaleTypes } from '@/interfaces'

export const lineTimeSeriesData15seconds = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 59, 15),
		value: 15
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 59, 30),
		value: 15
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 59, 45),
		value: 7
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0, 0),
		value: 2
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0, 15),
		value: 9
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0, 30),
		value: 13
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0, 45),
		value: 8
	}
]

export const lineTimeSeries15secondsOptions = {
	title: 'Line (time series) - Time interval 15seconds',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// minute
export const lineTimeSeriesDataMinute = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 21, 23, 40),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 21, 23, 50),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 21, 23, 55),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 22, 0, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 22, 0, 5),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 22, 0, 7),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 4, 22, 0, 10),
		value: 10
	}
]

export const lineTimeSeriesMinuteOptions = {
	title: 'Line (time series) - Time interval minute',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// 30minutes
export const lineTimeSeriesData30minutes = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 30),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 30),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 1, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 1, 30),
		value: 10
	}
]

export const lineTimeSeries30minutesOptions = {
	title: 'Line (time series) - Time interval 30minutes',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// hourly with default ticks formats
export const lineTimeSeriesDataHourlyDefaultTicksFormats = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 22, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 10, 23, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 0, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 1, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 2, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 3, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 11, 11, 4, 0),
		value: 10
	}
]

export const lineTimeSeriesHourlyDefaultLocaleOptions = {
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
	}
}

// hourly with custom ticks formats
export const lineTimeSeriesDataHourlyCustomTicksFormats =
	lineTimeSeriesDataHourlyDefaultTicksFormats

export const lineTimeSeriesHourlyCustomTicksFormatsOptions = {
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
			hourly: { primary: 'MMM d, HH:mm', secondary: 'HH:mm' }
		}
	},
	legend: {
		clickable: false
	}
}

// daily
export const lineTimeSeriesDataDaily = [
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 30),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 31),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 1),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 2),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 3),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 4),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 5),
		value: 10
	}
]

export const lineTimeSeriesDailyOptions = {
	title: 'Line (time series) - Time interval daily',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// weekly
export const lineTimeSeriesDataWeekly = [
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 30),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 31),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 1),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 2),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 3),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 4),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 5),
		value: 10
	}
]

export const lineTimeSeriesWeeklyOptions = {
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
	}
}

// monthly with default locale
export const lineTimeSeriesDataMonthlyDefaultLocale = [
	{
		group: 'Dataset 1',
		date: new Date(2019, 9),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 10),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 11),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 1),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 2),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 3),
		value: 10
	}
]

export const lineTimeSeriesMonthlyDefaultLocaleOptions = {
	title: 'Line (time series) - Time interval monthly with default locale',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// monthly with custom locale
export const lineTimeSeriesDataMonthlyCustomLocale = lineTimeSeriesDataMonthlyDefaultLocale

export const lineTimeSeriesMonthlyCustomLocaleOptions = {
	title: 'Line (time series) - Time interval monthly with French locale',
	axes: {
		left: {
			ticks: {
				formatter: (ticks: number) => ticks.toLocaleString('fr-FR')
			}
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			ticks: {
				formatter: (ticks: Date) =>
					ticks.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })
			}
		}
	},
	tooltip: {
		valueFormatter: (value: any, category: string) => {
			if (category == 'x-value')
				return value.toLocaleDateString('fr-FR', { month: 'long', day: 'numeric' })
			if (category == 'y-value') return value.toLocaleString('fr-FR')
			return value
		}
	},
	legend: {
		clickable: false
	}
}

// quarterly
export const lineTimeSeriesDataQuarterly = [
	{
		group: 'Dataset 1',
		date: new Date(2018, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2018, 3),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2018, 6),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2018, 9),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 3),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 6),
		value: 10
	}
]

export const lineTimeSeriesQuarterlyOptions = {
	title: 'Line (time series) - Time interval quarterly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// time-interval override
export const lineTimeSeriesDataIntervalOverride = {
	labels: ['Qty'],
	datasets: [
		{
			label: 'Dataset 1',
			data: [
				{ date: new Date(2018, 0), value: 10 },
				{ date: new Date(2018, 3), value: 10 },
				{ date: new Date(2018, 6), value: 10 },
				{ date: new Date(2018, 9), value: 10 },
				{ date: new Date(2019, 0), value: 10 },
				{ date: new Date(2019, 3), value: 10 },
				{ date: new Date(2019, 6), value: 10 }
			]
		}
	]
}

export const lineTimeSeriesIntervalOverrideOptions = {
	title: 'Line (time series) - Time interval override',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	timeScale: {
		timeInterval: 'monthly'
	},
	legend: {
		clickable: false
	}
}

// yearly
export const lineTimeSeriesDataYearly = [
	{
		group: 'Dataset 1',
		date: new Date(1977, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1978, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1979, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1980, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1981, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1982, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(1983, 0),
		value: 10
	}
]

export const lineTimeSeriesYearlyOptions = {
	title: 'Line (time series) - Time interval yearly',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// single datum
export const lineTimeSeriesDataSingleDatum = [
	{
		group: 'Dataset 1',
		date: new Date('2020-01-06T19:43:16Z'),
		value: 10
	}
]

export const lineTimeSeriesSingleDatumOptions = {
	title: 'Line (time series) - Single datum',
	axes: {
		left: {},
		bottom: {
			scaleType: ScaleTypes.TIME
		}
	},
	legend: {
		clickable: false
	}
}

// addSpaceOnEdges = 0
export const lineTimeSeriesNoExtendedDomainData = [
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 30),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2019, 11, 31),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 1),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 2),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 3),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 4),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 5),
		value: 10
	}
]

export const lineTimeSeriesNoExtendedDomainOptions = {
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
	}
}

// bug two identical labels
export const lineTimeSeriesDataTwoIdenticalLabels = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 23, 23, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 1, 9, 23, 0),
		value: 10
	}
]

export const lineTimeSeriesTwoIdenticalLabelsOptions = {
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
	}
}

export const lineTimeSeriesTwoIdenticalLabels2Options = {
	title: 'Line (time series) - Two identical labels 2',
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
	}
}

// bug all labels in primary format
export const lineTimeSeriesDataAllLabelsInPrimaryFormat = [
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 23, 1, 0),
		value: 10
	},
	{
		group: 'Dataset 1',
		date: new Date(2020, 0, 29, 1, 0),
		value: 10
	}
]

export const lineTimeSeriesAllLabelsInPrimaryFormatOptions = {
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
	}
}
