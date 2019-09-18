const {
	// Bar
	groupedBarOptions,
	groupedBarData,
	simpleBarOptions,
	simpleBarData,
	stackedBarData,
	stackedBarOptions,
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
	scatterData,
	// Combo
	comboData,
	comboOptions
} = require("./demo-data/index");

export const chartTypes = [
	{
		id: "grouped-bar",
		name: "Grouped Bar",
		options: groupedBarOptions,
		data: groupedBarData
	},
	{
		id: "simple-bar",
		name: "Bar",
		options: simpleBarOptions,
		data: simpleBarData
	},
	{
		id: "combo",
		name: "Combo",
		options: comboOptions,
		data: comboData
	},
	{
		id: "stacked-bar",
		name: "Bar",
		options: stackedBarOptions,
		data: stackedBarData
	},
	{
		id: "simple-bar-accessible",
		name: "Accessible Bar",
		options: Object.assign({}, simpleBarOptions, {accessibility: true}),
		data: simpleBarData
	},
	{
		id: "stacked-bar-accessible",
		name: "Bar",
		options: Object.assign({}, stackedBarOptions, {accessibility: true}),
		data: stackedBarData
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
