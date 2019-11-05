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
	lineTimeSeriesData,
	lineData,
	lineOptions,
	// Network,
	networkData,
	networkOptions,
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
	// Advanced charts
	{
		id: "network",
		options: networkOptions,
		data: networkData
	},
	// Basic charts
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
		id: "line-time-series",
		options: lineTimeSeriesOptions,
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
		id: "scatter-time-series",
		options: scatterTimeSeriesOptions,
		data: scatterTimeSeriesData
	}
];
