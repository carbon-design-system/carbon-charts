import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
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
} from "../../core/demo/demo-data/index";
import { addWidthAndHeight } from "./commons";

const template = barType => `
<ibm-${barType}-bar-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#${barType}BarChart>
</ibm-${barType}-bar-chart>
`;

const stories = storiesOf("Bar", module);
stories.add(simpleBarOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: simpleBarData,
		options: addWidthAndHeight(simpleBarOptions)
	}
}));

stories.add(simpleBarTimeSeriesOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: simpleBarTimeSeriesData,
		options: addWidthAndHeight(simpleBarTimeSeriesOptions)
	}
}));

stories.add(groupedBarOptions.title, () => ({
	template: template("grouped"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: groupedBarData,
		options: addWidthAndHeight(groupedBarOptions)
	}
}));

stories.add(stackedBarOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stackedBarData,
		options: addWidthAndHeight(stackedBarOptions)
	}
}));

stories.add(stackedBarTimeSeriesOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stackedBarTimeSeriesData,
		options: addWidthAndHeight(stackedBarTimeSeriesOptions)
	}
}));
