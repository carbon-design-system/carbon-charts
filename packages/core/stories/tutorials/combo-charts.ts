import marked from "marked";

export const comboChartTutorial = {
	name: "Combo Chart Tutorial",
	content: marked(`
# Combo charts
Combo charts allow users to visually compare different types of data by superimposing the different graphing components within one chart.
Combination charts **may or may not** use dual axes although it is common that they do. For more information on dual axes with **carbon-charts**, please see this tutorial ____.

___


## Getting started with combo charts


### Using the carbon-charts defaults

There is support for using pre-existing carbon-charts graphs and combining them together within a Combo Chart.
The charts that can be seamlessly combined are all different **axis charts only**.

Suggested ChartTypes to combine:
	- LineChart
	- ScatterChart
	- StackedScatterChart
	- AreaChart
	- StackedAreaChart
	- BarChart
	- GroupedBarChart
	- StackedBarChart

Below is an example of combining a carbon-charts **AreaChart** with a **LineChart**.

\`\`\`
const verySimpleComboData = [
    { group: "Dataset 1", value: 650, date: "Tuesday" },
	{ group: "Dataset 2", value: 296, date: "Tuesday" }
	...more data
];

const comboOptions = {
	...otherOptions // global options apply to all the charts listed in chartTypes (where relevant)
	axes: {...}
	chartTypes: [ // takes an array of objects
		{
			type: "area" // use a valid ChartType from enums
			options: {}, // component specific options (i.e, turn on the scatter points, adjust scatter radius)
			datasets: ["Dataset 1"] // the datasets that we want to map with this type of chart
		},
		{
			type: "line" // use a valid ChartType from enums
			options: {
				points: {
					enabled: false; // disable the point on the LineChart won't affect the points in the AreaChart
				}
			}, // component specific options
			datasets: ["Dataset 2"]
		}]
};
\`\`\`

See the storybook demos for more combinations of charts and configurations.


### Using custom graphs & components
Custom components and **independent** carbon-charts components can also be rendered into a Combo Chart. This allows
users to create their own components and combine them with the pre-existing componentry offered.


Below is an example of combining a carbon-charts **AreaChart** with a standalone \`Line\` constructor.

\`\`\`
const verySimpleComboData = [
    { group: "Dataset 1", value: 650, date: "Tuesday" },
	{ group: "Dataset 2", value: 296, date: "Tuesday" }
	...more data
];

const comboOptions = {
	...otherOptions // global options apply to all the charts listed in chartTypes (where relevant)
	axes: {...}
	chartTypes: [ // takes an array of objects
		{
			type: "area" // use a valid ChartType from enums
			options: {},
			datasets: ["Dataset 1"] // the datasets that we want to map with this type of chart
		},
		{
			type: Line // using an imported class constructor
			options: {
				points: {
					enabled: false; // disable the point on the LineChart won't affect the points in the AreaChart
				}
			}, // component specific options
			datasets: ["Dataset 2"]
		}]
};
\`\`\`
`)
};
