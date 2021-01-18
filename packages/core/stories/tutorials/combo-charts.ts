import marked from 'marked';

export const comboChartTutorial = {
	name: 'Combo charts',
	content: marked(`
# Combo charts
Combo charts allow users to visually compare complex datasets by superimposing different graphing components within one chart.
Combination charts **may or may not** use dual axes although it is common that they do. For more information on dual axes with **carbon-charts**, please see the [dual axes tutorial](/?path=/story/tutorials--dual-axes-charts).

*Note: \`ComboChart\` extends axis chart functionality and should only comprise of graphs/components that use axes.*

____

### Using the carbon-charts defaults

There is support for using pre-existing carbon-charts graphs and combining them together within a \`ComboChart\`.
The charts that can be seamlessly combined are all different **axis charts only**. This is the **recommended way to use \`ComboCharts\`**.

Supported \`ChartTypes\` to combine:
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
import { ChartTypes } from "@carbon/charts/interfaces/enums";
const verySimpleComboData = [
    { group: "Dataset 1", value: 650, date: "Tuesday" },
	{ group: "Dataset 2", value: 296, date: "Tuesday" }
	...more data
];

const comboOptions = {
	...otherOptions // global options apply to all the charts listed in chartTypes (where relevant)
	axes: {...}
	comboChartTypes: [ // takes an array of objects
		{
			type: ChartTypes.AREA // use a valid ChartType from enums
			options: {}, // component specific options (i.e, turn on the scatter points, adjust scatter radius)
			correspondingDatasets: ["Dataset 1"] // the datasets that we want to map with this type of chart
		},
		{
			type: ChartTypes.LINE // use a valid ChartType from enums
			options: {
				points: {
					enabled: false // disabling the scatter points on the LineChart here won't affect the points in the AreaChart
				}
			}, // component specific options
			correspondingDatasets: ["Dataset 2"]
		}]
};
\`\`\`

See the storybook demos for more combinations of charts and configurations.

____

### Using custom graphs & components
Custom components and **independent** carbon-charts components can also be rendered into a \`ComboChart\`. This allows
users to create their own components and combine them with the pre-existing componentry offered.

Below is an example of combining a carbon-charts \`AreaChart\` with a standalone \`Line\` class constructor.

**Reminder: \`ComboChart\` extends axis chart functionality and should only comprise of graphs/components that use axes.**


\`\`\`
// import standalone componentry
import { Line } from "@carbon/charts/components/graphs/Line";
import { options } from "@carbon/charts/configuration"; // need to include base options for the carbon-chart if you are using a component separately
import { ChartTypes } from "@carbon/charts/interfaces/enums";

const verySimpleComboData = [
    { group: "Dataset 1", value: 650, date: "Tuesday" },
	{ group: "Dataset 2", value: 296, date: "Tuesday" }
	...more data
];

const comboOptions = {
	...otherOptions // global options apply to all the charts listed in chartTypes (where relevant)
	axes: {...}
	comboChartTypes: [ // takes an array of objects
		{
			type: ChartTypes.AREA // use a valid ChartType from enums
			options: {},
			correspondingDatasets: ["Dataset 1"] // the datasets that we want to map with this type of chart
		},
		{
			type: Line // using an imported class constructor
			// add the base options for that type of chart if it is in the carbon-charts library and any additional configurations needed
			options: Object.assign({}, options.lineChart,  {
				points: {
					enabled: false // disabling the scatter points on the LineChart here won't affect the points in the AreaChart
				}
			}), // component specific options
			correspondingDatasets: ["Dataset 2"]
		}]
};
\`\`\`

Users can omit using any defaults (chartTypes) and build up the charts with independent class contructors if they choose. In the case where all the types are constructors,
ComboChart **will still render some additional componetry for axis-charts** in addition to the custom/standalone components in the options.

Keep in mind that when using components/graphs independently, the library will not enforce any type checking.
This enables the user to extend \`ComboChart\` to cover complex cases but also leaves responsibility on the developers to use the right chart combinations.

`),
};
