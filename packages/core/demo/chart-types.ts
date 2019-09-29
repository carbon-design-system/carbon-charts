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
	// Line
	curvedLineOptions,
	curvedLineData,
	lineData,
	lineOptions,
	lineTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} = require("./demo-data/index");

export const chartTypes = [
	// {
	// 	id: "grouped-bar",
	// 	name: "Grouped Bar",
	// 	options: groupedBarOptions,
	// 	data: groupedBarData
	// },
	{
		id: "simple-bar",
		name: "Simple Bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	{
		id: "simple-bar-time-series",
		name: "Simple Bar (Time Series)",
		options: simpleBarTimeSeriesOptions,
		data: simpleBarTimeSeriesData
	},
	{
		id: "stacked-bar",
		name: "Stacked Bar",
		options: stackedBarOptions,
		data: stackedBarData
	},
	{
		id: "stacked-bar-time-series",
		name: "Stacked Bar (Time Series)",
		options: stackedBarTimeSeriesOptions,
		data: stackedBarTimeSeriesData
	},
	{
		id: "curved-line",
		name: "Curved Line",
		options: curvedLineOptions,
		data: curvedLineData
	},
	{
		id: "line",
		name: "Line Chart (Time Series)",
		options: lineOptions,
		data: lineData
	},
	{
		id: "line-step",
		name: "Step",
		options: Object.assign({}, lineOptions, {
			title: "Step Chart (Time Series)",
			curve: "curveStepAfter"
		}),
		data: lineData
	},
	{
		id: "pie",
		name: "pie",
		options: pieOptions,
		data: pieData
	},
	{
		id: "donut",
		name: "donut",
		options: donutOptions,
		data: pieData
	},
	{
		id: "scatter",
		name: "scatter",
		options: scatterOptions,
		data: scatterData
	},
	{
		id: "scatter-time",
		name: "scatter",
		options: lineTimeSeriesOptions,
		data: scatterTimeSeriesData
	}
];
