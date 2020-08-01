import * as barDemos from "./bar";
import * as bubbleDemos from "./bubble";
import * as donutDemos from "./donut";
import * as lineDemos from "./line";
import * as networkDemos from "./network";
import * as pieDemos from "./pie";
import * as scatterDemos from "./scatter";
import * as stepDemos from "./step";
import * as timeSeriesAxisDemos from "./time-series-axis";

export * from "./bar";
export * from "./bubble";
export * from "./donut";
export * from "./line";
export * from "./network";
export * from "./pie";
export * from "./scatter";
export * from "./step";

import {
	createChartSandbox,
	createReactChartApp,
	createAngularChartApp,
	createVueChartApp,
	createVanillaChartApp
} from "./create-codesandbox";

import { Tools } from "@carbon/charts/tools";

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
	},
	NetworkChart: {
		vanilla: "NetworkChart"
	}
};

let allDemoGroups = [
	{
		title: "Bar (vertical)",
		demos: [
			{
				options: barDemos.simpleBarOptions,
				data: barDemos.simpleBarData,
				chartType: chartTypes.SimpleBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.simpleBarTimeSeriesOptions,
				data: barDemos.simpleBarTimeSeriesData,
				chartType: chartTypes.SimpleBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.simpleBarFixedDomainOptions,
				data: barDemos.simpleBarData,
				chartType: chartTypes.SimpleBarChart
			},
			{
				options: barDemos.groupedBarOptions,
				data: barDemos.groupedBarData,
				chartType: chartTypes.GroupedBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.stackedBarOptions,
				data: barDemos.stackedBarData,
				chartType: chartTypes.StackedBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.stackedBarTimeSeriesOptions,
				data: barDemos.stackedBarTimeSeriesData,
				chartType: chartTypes.StackedBarChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Bar (horizontal)",
		demos: [
			{
				options: barDemos.simpleHorizontalBarOptions,
				data: barDemos.simpleHorizontalBarData,
				chartType: chartTypes.SimpleBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.simpleHorizontalBarTimeSeriesOptions,
				data: barDemos.simpleHorizontalBarTimeSeriesData,
				chartType: chartTypes.SimpleBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.groupedHorizontalBarOptions,
				data: barDemos.groupedHorizontalBarData,
				chartType: chartTypes.GroupedBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.stackedHorizontalBarOptions,
				data: barDemos.stackedHorizontalBarData,
				chartType: chartTypes.StackedBarChart,
				isDemoExample: true
			},
			{
				options: barDemos.stackedHorizontalBarTimeSeriesOptions,
				data: barDemos.stackedHorizontalBarTimeSeriesData,
				chartType: chartTypes.StackedBarChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Bubble",
		demos: [
			{
				options: bubbleDemos.bubbleOptions,
				data: bubbleDemos.bubbleData,
				chartType: chartTypes.BubbleChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Donut",
		demos: [
			{
				options: donutDemos.donutOptions,
				data: donutDemos.donutData,
				chartType: chartTypes.DonutChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Line",
		demos: [
			{
				options: lineDemos.lineTimeSeriesOptions,
				data: lineDemos.lineTimeSeriesData,
				chartType: chartTypes.LineChart,
				isDemoExample: true
			},
			{
				options: lineDemos.lineOptions,
				data: lineDemos.lineData,
				chartType: chartTypes.LineChart,
				isDemoExample: true
			},
			{
				options: lineDemos.lineTimeSeriesRotatedTicksOptions,
				data: lineDemos.lineTimeSeriesDataRotatedTicks,
				chartType: chartTypes.LineChart
			}
		]
	},
	{
		title: "Pie",
		demos: [
			{
				options: pieDemos.pieOptions,
				data: pieDemos.pieData,
				chartType: chartTypes.PieChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Scatter",
		demos: [
			{
				options: scatterDemos.scatterTimeSeriesOptions,
				data: scatterDemos.scatterTimeSeriesData,
				chartType: chartTypes.ScatterChart,
				isDemoExample: true
			},
			{
				options: scatterDemos.scatterOptions,
				data: scatterDemos.scatterData,
				chartType: chartTypes.ScatterChart,
				isDemoExample: true
			}
		]
	},
	{
		title: "Step",
		demos: [
			{
				options: stepDemos.stepOptions,
				data: stepDemos.stepData,
				chartType: chartTypes.LineChart,
				isDemoExample: true
			},
			{
				options: stepDemos.stepTimeSeriesOptions,
				data: stepDemos.stepTimeSeriesData,
				chartType: chartTypes.LineChart,
				isDemoExample: true
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
			}
		]
	},
	{
		title: "Network",
		demos: [
			{
				options: networkDemos.networkOptions,
				data: networkDemos.networkData,
				chartType: chartTypes.NetworkChart
			}
		]
	}
] as any;

const formatTitleString = str => (
	str.replace(/[^\w\s]/gi, "")
		.replace(/\s\s+/g, " ")
		.toLowerCase()
		.replace(/\s+/g, "-")
);

// add codesandbox and code to demos
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
		demo.codesandbox.vanilla = createChartSandbox(createVanillaChartApp(demo));

		if (!demo.code) {
			demo.code = {};
		}
		demo.code.angular = createAngularChartApp(demo);

		return demo;
	});

	return demoGroup;
});

// in the storybook we want to show all the demos
export const storybookDemoGroups = Tools.clone(allDemoGroups);

// in the demo page we want to show only demos with isDemoExample = true
export const demoGroups = Tools.clone(allDemoGroups).map(demoGroup => {
	demoGroup.demos = demoGroup.demos.filter(demo => demo.isDemoExample);
	return demoGroup;
}).filter(demoGroup => demoGroup.demos.length); // remove demoGroup if it's children are all with isDemoExample = false
