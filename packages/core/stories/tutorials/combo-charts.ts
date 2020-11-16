import marked from "marked";

export const comboChartTutorial = {
	name: "Combo Chart Tutorial",
	content: marked(`
# Combo charts
Combo charts allow users to visually compare complex datasets by superimposing different graphing components within one chart.
Combination charts **may or may not** use dual axes although it is common that they do. For more information on dual axes with **carbon-charts**, please see this tutorial ____.

Note: Combo Charts are all combinations of **axis charts** and axis components.
___


## Getting started with Combo charts


### Using the carbon-charts defaults

There is support for using pre-existing carbon-charts graphs and combining them together within a \`ComboChart\`.
The charts that can be seamlessly combined are all different **axis charts only**.

Suggested \`ChartTypes\` to combine:
- \`LineChart\`
- \`ScatterChart\`
- \`StackedScatterChart\`
- \`AreaChart\`
- \`StackedAreaChart\`
- \`BarChart\`
- \`GroupedBarChart\`
- \`StackedBarChart\`

Below is an example of combining a carbon-charts \`AreaChart\` with a \`LineChart\`.

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

Below is an example of combining a carbon-charts \`AreaChart\` with a standalone \`Line\` class constructor.

\`\`\`
// import standanlone componentry
import {
	Line
} from ".././../src/components/index";

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

Users can omit using any defaults (chartTypes) and build up the charts with only class contructors if they choose. In the case where all the types are constructors,
ComboChart **will still render the componetry for axis-charts** in addition to the custom/standalone components in the options.
This enables the user to extend ComboChart to cover complex cases but also leaves responsibility on the developer to use the right chart combinations.

`)
};
