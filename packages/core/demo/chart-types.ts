const {
	// Bar
	groupedBarOptions,
	groupedBarData,
	simpleBarOptions,
	simpleBarData,
	simpleBarTimeSeriesOptions,
	simpleBarTimeSeriesData,
	stackedBarData,
	stackedBarOptions,
	stackedBarTimeSeriesOptions,
	stackedBarTimeSeriesData,
	// Pie & donut
	pieOptions,
	pieData,
	donutOptions,
	donutData,
	// Line
	lineTimeSeriesOptions,
	lineTimeSeriesWithCustomStroke,
	lineTimeSeriesData,
	lineData,
	lineOptions,
	// Step
	stepOptions,
	stepData,
	stepTimeSeriesOptions,
	stepTimeSeriesData,
	// Scatter
	scatterTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} = require("./demo-data/index");

export const chartTypes = [
	{
		id: "grouped-bar",
		options: groupedBarOptions,
		data: groupedBarData
	},
	{
		id: "simple-bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	{
		id: "scatter-time-series",
		options: scatterTimeSeriesOptions,
		data: scatterTimeSeriesData
	},
	{
		id: "scatter",
		options: scatterOptions,
		data: scatterData
	},
	{
		id: "simple-bar-time-series",
		options: simpleBarTimeSeriesOptions,
		data: simpleBarTimeSeriesData
	},
	{
		id: "stacked-bar",
		options: stackedBarOptions,
		data: stackedBarData
	},
	{
		id: "stacked-bar-time-series",
		options: stackedBarTimeSeriesOptions,
		data: stackedBarTimeSeriesData
	},
	{
		id: "pie",
		options: pieOptions,
		data: pieData
	},
	{
		id: "donut",
		options: donutOptions,
		data: donutData
	},
	{
		id: "line-time-series",
		options: lineTimeSeriesOptions,
		data: lineTimeSeriesData
	},
	{
		id: "line-time-series-customstroke",
		options: lineTimeSeriesWithCustomStroke,
		data: lineTimeSeriesData
	},
	{
		id: "line",
		options: lineOptions,
		data: lineData
	},
	{
		id: "line-step",
		options: stepOptions,
		data: stepData
	},
	{
		id: "line-step-time-series",
		options: stepTimeSeriesOptions,
		data: stepTimeSeriesData
	}
];
