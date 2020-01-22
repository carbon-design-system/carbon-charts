const {
	// Bar
	groupedBarOptions,
	groupedBarData,
	groupedHorizontalBarOptions,
	groupedHorizontalBarData,
	simpleBarOptions,
	simpleBarData,
	simpleHorizontalBarOptions,
	simpleHorizontalBarData,
	simpleBarTimeSeriesOptions,
	simpleBarTimeSeriesData,
	simpleHorizontalBarTimeSeriesOptions,
	simpleHorizontalBarTimeSeriesData,
	stackedBarOptions,
	stackedBarData,
	stackedHorizontalBarOptions,
	stackedHorizontalBarData,
	stackedBarTimeSeriesOptions,
	stackedBarTimeSeriesData,
	stackedHorizontalBarTimeSeriesOptions,
	stackedHorizontalBarTimeSeriesData,
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
	// Step
	stepOptions,
	stepData,
	stepTimeSeriesOptions,
	stepTimeSeriesData,
	// Area
	areaTimeSeriesData,
	areaTimeSeriesOptions,
	areaTimeSeriesCurvedData,
	areaTimeSeriesCurvedOptions,
	// Scatter
	scatterTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} = require("./demo-data/index");

export const chartTypes = [
	{
		id: "area-time-series-curved",
		options: areaTimeSeriesCurvedOptions,
		data: areaTimeSeriesCurvedData
	},
	{
		id: "area-time-series",
		options: areaTimeSeriesOptions,
		data: areaTimeSeriesData
	},
	{
		id: "simple-bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	{
		id: "simple-horizontal-bar-time-series",
		options: simpleHorizontalBarTimeSeriesOptions,
		data: simpleHorizontalBarTimeSeriesData
	},
	{
		id: "simple-horizontal-bar",
		options: simpleHorizontalBarOptions,
		data: simpleHorizontalBarData
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
		id: "grouped-bar",
		options: groupedBarOptions,
		data: groupedBarData
	},
	{
		id: "grouped-horizontal-bar",
		options: groupedHorizontalBarOptions,
		data: groupedHorizontalBarData
	},
	{
		id: "stacked-bar",
		options: stackedBarOptions,
		data: stackedBarData
	},
	{
		id: "stacked-horizontal-bar",
		options: stackedHorizontalBarOptions,
		data: stackedHorizontalBarData
	},
	{
		id: "simple-bar-time-series",
		options: simpleBarTimeSeriesOptions,
		data: simpleBarTimeSeriesData
	},
	{
		id: "stacked-bar-time-series",
		options: stackedBarTimeSeriesOptions,
		data: stackedBarTimeSeriesData
	},
	{
		id: "stacked-horizontal-bar-time-series",
		options: stackedHorizontalBarTimeSeriesOptions,
		data: stackedHorizontalBarTimeSeriesData
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
