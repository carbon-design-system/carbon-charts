export const lineTimeSeriesData15seconds12h = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2020, 11, 10, 23, 59, 15), value: 10 },
				{ date: new Date(2020, 11, 10, 23, 59, 30), value: 10 },
				{ date: new Date(2020, 11, 10, 23, 59, 45), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0, 15), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0, 30), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0, 45), value: 10 },
			]
		}
	]
};

export const lineTimeSeries15seconds12hOptions = {
	title: "Line (time series) - 15seconds 12h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			ticks: {
				timeIntervalFormats: {
					"15seconds": { localeCode: "fr" }
				},
			}
		},
	},
	curve: "curveMonotoneX"
};

// 15seconds 24h
export const lineTimeSeriesData15seconds24h = lineTimeSeriesData15seconds12h;

export const lineTimeSeries15seconds24hOptions = {
	title: "Line (time series) - 15seconds 24h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
		},
	},
	curve: "curveMonotoneX"
};

// minute 12h
export const lineTimeSeriesDataMinute12h = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2020, 4, 21, 23, 47, 0), value: 10 },
				{ date: new Date(2020, 4, 21, 23, 58, 0), value: 10 },
				{ date: new Date(2020, 4, 21, 23, 59, 0), value: 10 },
				{ date: new Date(2020, 4, 22, 0, 0, 0), value: 10 },
				{ date: new Date(2020, 4, 22, 0, 1, 0), value: 10 },
				{ date: new Date(2020, 4, 22, 0, 2, 0), value: 10 },
				{ date: new Date(2020, 4, 22, 0, 3, 0), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesMinute12hOptions = {
	title: "Line (time series) - minute 12h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// minute 24h
export const lineTimeSeriesDataMinute24h = lineTimeSeriesDataMinute12h;

export const lineTimeSeriesMinute24hOptions = {
	title: "Line (time series) - minute 24h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// 30minutes 12h
export const lineTimeSeriesData30minutes12h = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2020, 11, 10, 22, 30), value: 10 },
				{ date: new Date(2020, 11, 10, 23, 0), value: 10 },
				{ date: new Date(2020, 11, 10, 23, 30), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 30), value: 10 },
				{ date: new Date(2020, 11, 11, 1, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 1, 30), value: 10 },
			]
		}
	]
};

export const lineTimeSeries30minutes12hOptions = {
	title: "Line (time series) - 30minutes 12h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// 30minutes 24h
export const lineTimeSeriesData30minutes24h = lineTimeSeriesData30minutes12h;

export const lineTimeSeries30minutes24hOptions = {
	title: "Line (time series) - 30minutes 24h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// hourly 12h
export const lineTimeSeriesDataHourly12h = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2020, 11, 10, 22, 0), value: 10 },
				{ date: new Date(2020, 11, 10, 23, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 0, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 1, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 2, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 3, 0), value: 10 },
				{ date: new Date(2020, 11, 11, 4, 0), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesHourly12hOptions = {
	title: "Line (time series) - hourly 12h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// hourly 24h
export const lineTimeSeriesDataHourly24h = lineTimeSeriesDataHourly12h;

export const lineTimeSeriesHourly24hOptions = {
	title: "Line (time series) - hourly 24h",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// daily !showDayName
export const lineTimeSeriesDataDailyShowDayNumber = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2019, 11, 30), value: 10 },
				{ date: new Date(2019, 11, 31), value: 10 },
				{ date: new Date(2020, 0, 1), value: 10 },
				{ date: new Date(2020, 0, 2), value: 10 },
				{ date: new Date(2020, 0, 3), value: 10 },
				{ date: new Date(2020, 0, 4), value: 10 },
				{ date: new Date(2020, 0, 5), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesDailyShowDayNumberOptions = {
	title: "Line (time series) - daily show days as number",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// daily showDayName (weekly)
export const lineTimeSeriesDataDailyShowDayName = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2020, 0, 27), value: 10 },
				{ date: new Date(2020, 0, 28), value: 10 },
				{ date: new Date(2020, 0, 29), value: 10 },
				{ date: new Date(2020, 0, 30), value: 10 },
				{ date: new Date(2020, 1, 1), value: 10 },
				{ date: new Date(2020, 1, 2), value: 10 },
				{ date: new Date(2020, 1, 3), value: 10 },
				{ date: new Date(2020, 1, 4), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesDailyShowDayNameOptions = {
	title: "Line (time series) - daily show days name",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			ticks: { showDayName: true },
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// monthly
export const lineTimeSeriesDataMonthly = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2018, 9), value: 10 },
				{ date: new Date(2018, 10), value: 10 },
				{ date: new Date(2018, 11), value: 10 },
				{ date: new Date(2019, 0), value: 10 },
				{ date: new Date(2019, 1), value: 10 },
				{ date: new Date(2019, 2), value: 10 },
				{ date: new Date(2019, 3), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesMonthlyOptions = {
	title: "Line (time series) - monthly",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// quarterly
export const lineTimeSeriesDataQuarterly = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2017, 0), value: 10 },
				{ date: new Date(2017, 3), value: 10 },
				{ date: new Date(2017, 6), value: 10 },
				{ date: new Date(2017, 9), value: 10 },
				{ date: new Date(2018, 0), value: 10 },
				{ date: new Date(2018, 3), value: 10 },
				{ date: new Date(2018, 6), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesQuarterlyOptions = {
	title: "Line (time series) - quarterly",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};

// yearly
export const lineTimeSeriesDataYearly = {
	labels: ["Qty"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(1977, 0), value: 10 },
				{ date: new Date(1978, 0), value: 10 },
				{ date: new Date(1979, 0), value: 10 },
				{ date: new Date(1980, 0), value: 10 },
				{ date: new Date(1981, 0), value: 10 },
				{ date: new Date(1982, 0), value: 10 },
				{ date: new Date(1983, 0), value: 10 },
			]
		}
	]
};

export const lineTimeSeriesYearlyOptions = {
	title: "Line (time series) - yearly",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true,
			timeScale: { addSpaceOnEdges: 0 },
		},
	},
	curve: "curveMonotoneX"
};
