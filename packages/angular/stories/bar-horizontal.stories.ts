import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

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

const stories = storiesOf("Bar (Horizontal)", module).addDecorator(withKnobs);
stories.add(simpleHorizontalBarOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", simpleHorizontalBarData),
		options: object("Options", addWidthAndHeight(simpleHorizontalBarOptions))
	}
}));

stories.add(simpleHorizontalBarTimeSeriesOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", simpleHorizontalBarTimeSeriesData),
		options: object("Options", addWidthAndHeight(simpleHorizontalBarTimeSeriesOptions))
	}
}));

stories.add(groupedHorizontalBarOptions.title, () => ({
	template: template("grouped"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", groupedHorizontalBarData),
		options: object("Options", addWidthAndHeight(groupedHorizontalBarOptions))
	}
}));

stories.add(stackedHorizontalBarOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stackedHorizontalBarData),
		options: object("Options", addWidthAndHeight(stackedHorizontalBarOptions))
	}
}));

stories.add(stackedHorizontalBarTimeSeriesOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stackedHorizontalBarTimeSeriesData),
		options: object("Options", addWidthAndHeight(stackedHorizontalBarTimeSeriesOptions))
	}
}));
