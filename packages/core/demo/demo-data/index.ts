import * as barDemos from "./bar";
import * as bubbleDemos from "./bubble";
import * as donutDemos from "./donut";
import * as lineDemos from "./line";
import * as pieDemos from "./pie";
import * as scatterDemos from "./scatter";
import * as stepDemos from "./step";
import * as timeSeriesAxisDemos from "./time-series-axis";

export * from "./bar";
export * from "./bubble";
export * from "./donut";
export * from "./line";
export * from "./pie";
export * from "./scatter";
export * from "./step";

import {
	createChartSandbox,
	createReactChartApp,
	createAngularChartApp,
	createVueChartApp
} from "./create-codesandbox";

export const chartTypes = {
	SimpleBarChart: {
		vanilla: "SimpleBarChart",
		angular: "ibm-simple-bar-chart",
		vue: "ccv-simple-bar-chart"
	},
	GroupedBarChart: {
		vanilla: "GroupedBarChart",
		angular: "ibm-grouped-bar-chart",
		vue: "ccv-grouped-bar-chart"
	},
	StackedBarChart: {
		vanilla: "StackedBarChart",
		angular: "ibm-stacked-bar-chart",
		vue: "ccv-stacked-bar-chart"
	},
	BubbleChart: {
		vanilla: "BubbleChart",
		angular: "ibm-bubble-chart",
		vue: "ccv-bubble-chart"
	},
	LineChart: {
		vanilla: "LineChart",
		angular: "ibm-line-chart",
		vue: "ccv-line-chart"
	},
	ScatterChart: {
		vanilla: "ScatterChart",
		angular: "ibm-scatter-chart",
		vue: "ccv-scatter-chart"
	},
	PieChart: {
		vanilla: "PieChart",
		angular: "ibm-pie-chart",
		vue: "ccv-pie-chart"
	},
	DonutChart: {
		vanilla: "DonutChart",
		angular: "ibm-donut-chart",
		vue: "ccv-donut-chart"
	}
};

let allDemoGroups = [
	{
		title: "Bar (vertical)",
		demos: [
			{
				options: barDemos.simpleBarOptions,
				data: barDemos.simpleBarData,
				chartType: chartTypes.SimpleBarChart
			},
			{
				options: barDemos.simpleBarTimeSeriesOptions,
				data: barDemos.simpleBarTimeSeriesData,
				chartType: chartTypes.SimpleBarChart
			},
			{
				options: barDemos.groupedBarOptions,
				data: barDemos.groupedBarData,
				chartType: chartTypes.GroupedBarChart
			},
			{
				options: barDemos.stackedBarOptions,
				data: barDemos.stackedBarData,
				chartType: chartTypes.StackedBarChart
			},
			{
				options: barDemos.stackedBarTimeSeriesOptions,
				data: barDemos.stackedBarTimeSeriesData,
				chartType: chartTypes.StackedBarChart
			}
		]
	},
	{
		title: "Bar (horizontal)",
		demos: [
			{
				options: barDemos.simpleHorizontalBarOptions,
				data: barDemos.simpleHorizontalBarData,
				chartType: chartTypes.SimpleBarChart
			},
			{
				options: barDemos.simpleHorizontalBarTimeSeriesOptions,
				data: barDemos.simpleHorizontalBarTimeSeriesData,
				chartType: chartTypes.SimpleBarChart
			},
			{
				options: barDemos.groupedHorizontalBarOptions,
				data: barDemos.groupedHorizontalBarData,
				chartType: chartTypes.GroupedBarChart
			},
			{
				options: barDemos.stackedHorizontalBarOptions,
				data: barDemos.stackedHorizontalBarData,
				chartType: chartTypes.StackedBarChart
			},
			{
				options: barDemos.stackedHorizontalBarTimeSeriesOptions,
				data: barDemos.stackedHorizontalBarTimeSeriesData,
				chartType: chartTypes.StackedBarChart
			}
		]
	},
	{
		title: "Bubble",
		demos: [
			{
				options: bubbleDemos.bubbleOptions,
				data: bubbleDemos.bubbleData,
				chartType: chartTypes.BubbleChart
			}
		]
	},
	{
		title: "Donut",
		demos: [
			{
				options: donutDemos.donutOptions,
				data: donutDemos.donutData,
				chartType: chartTypes.DonutChart
			}
		]
	},
	{
		title: "Line",
		demos: [
			{
				options: lineDemos.lineTimeSeriesOptions,
				data: lineDemos.lineTimeSeriesData,
				chartType: chartTypes.LineChart
			},
			{
				options: lineDemos.lineOptions,
				data: lineDemos.lineData,
				chartType: chartTypes.LineChart
			},
		]
	},
	{
		title: "Pie",
		demos: [
			{
				options: pieDemos.pieOptions,
				data: pieDemos.pieData,
				chartType: chartTypes.PieChart
			}
		]
	},
	{
		title: "Scatter",
		demos: [
			{
				options: scatterDemos.scatterTimeSeriesOptions,
				data: scatterDemos.scatterTimeSeriesData,
				chartType: chartTypes.ScatterChart
			},
			{
				options: scatterDemos.scatterOptions,
				data: scatterDemos.scatterData,
				chartType: chartTypes.ScatterChart
			}
		]
	},
	{
		title: "Step",
		demos: [
			{
				options: stepDemos.stepOptions,
				data: stepDemos.stepData,
				chartType: chartTypes.LineChart
			},
			{
				options: stepDemos.stepTimeSeriesOptions,
				data: stepDemos.stepTimeSeriesData,
				chartType: chartTypes.LineChart
			}
		]
	},
	{
		title: "Time series axis",
		demos: [
			{
				options: timeSeriesAxisDemos.lineTimeSeries15secondsOptions,
				data: timeSeriesAxisDemos.lineTimeSeriesData15seconds,
				chartType: chartTypes.LineChart
			},
			{
				options: timeSeriesAxisDemos.lineTimeSeriesMinuteOptions,
				data: timeSeriesAxisDemos.lineTimeSeriesDataMinute,
				chartType: chartTypes.LineChart
			},
			{
				options: timeSeriesAxisDemos.lineTimeSeries30minutesOptions,
				data: timeSeriesAxisDemos.lineTimeSeriesData30minutes,
				chartType: chartTypes.LineChart
			},
			{
				options: timeSeriesAxisDemos.lineTimeSeriesHourlyDefaultLocaleOptions,
				data: timeSeriesAxisDemos.lineTimeSeriesDataHourlyDefaultTicksFormats,
				chartType: chartTypes.LineChart
			},
			{
				options: timeSeriesAxisDemos.lineTimeSeriesHourlyCustomTicksFormatsOptions,
				data: timeSeriesAxisDemos.lineTimeSeriesDataHourlyCustomTicksFormats,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataDaily,
				options: timeSeriesAxisDemos.lineTimeSeriesDailyOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataWeekly,
				options: timeSeriesAxisDemos.lineTimeSeriesWeeklyOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataMonthlyDefaultLocale,
				options: timeSeriesAxisDemos.lineTimeSeriesMonthlyDefaultLocaleOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataMonthlyCustomLocale,
				options: timeSeriesAxisDemos.lineTimeSeriesMonthlyCustomLocaleOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataQuarterly,
				options: timeSeriesAxisDemos.lineTimeSeriesQuarterlyOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataYearly,
				options: timeSeriesAxisDemos.lineTimeSeriesYearlyOptions,
				chartType: chartTypes.LineChart
			},
			{
				data: timeSeriesAxisDemos.lineTimeSeriesDataSingleDatum,
				options: timeSeriesAxisDemos.lineTimeSeriesSingleDatumOptions,
				chartType: chartTypes.LineChart
			},
		]
	}
] as any;

const formatTitleString = str => (
	str.replace(/[^\w\s]/gi, "")
		.replace(/\s\s+/g, " ")
		.toLowerCase()
		.replace(/\s+/g, "-")
);

allDemoGroups = allDemoGroups.map(demoGroup => {
	demoGroup.demos = demoGroup.demos.map(demo => {
		demo.title = demo.options.title;
		demo.id = `${formatTitleString(demoGroup.title)}--${formatTitleString(demo.options.title)}`;
		demo.options.height = "400px";

		if (!demo.codesandbox) {
			demo.codesandbox = {};
		}
		demo.codesandbox.react = createChartSandbox(createReactChartApp(demo));
		demo.codesandbox.vue = createChartSandbox(createVueChartApp(demo));

		if (!demo.code) {
			demo.code = {};
		}
		demo.code.angular = createAngularChartApp(demo);

		return demo;
	});

	return demoGroup;
});

export const demoGroups = allDemoGroups;
