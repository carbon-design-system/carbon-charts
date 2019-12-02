import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Horizontal bar
	groupedHorizontalBarOptions,
	groupedHorizontalBarData,
	simpleHorizontalBarOptions,
	simpleHorizontalBarData,
	simpleHorizontalBarTimeSeriesOptions,
	simpleHorizontalBarTimeSeriesData,
	stackedHorizontalBarTimeSeriesOptions,
	stackedHorizontalBarTimeSeriesData,
	stackedHorizontalBarData,
	stackedHorizontalBarOptions,
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

const stories = storiesOf("Bar (Horizontal)", module);
stories.add(simpleHorizontalBarOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: simpleHorizontalBarData,
		options: addWidthAndHeight(simpleHorizontalBarOptions)
	}
}));

stories.add(simpleHorizontalBarTimeSeriesOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: simpleHorizontalBarTimeSeriesData,
		options: addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions)
	}
}));

stories.add(groupedHorizontalBarOptions.title, () => ({
	template: template("grouped"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: groupedHorizontalBarData,
		options: addWidthAndHeight(groupedHorizontalBarOptions)
	}
}));

stories.add(stackedHorizontalBarOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stackedHorizontalBarData,
		options: addWidthAndHeight(stackedHorizontalBarOptions)
	}
}));

stories.add(stackedHorizontalBarTimeSeriesOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stackedHorizontalBarTimeSeriesData,
		options: addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions)
	}
}));
