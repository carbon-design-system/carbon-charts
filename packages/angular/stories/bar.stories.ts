import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

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
stories.addDecorator(withKnobs);

stories.add(simpleBarOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", simpleBarData),
		options: object("Options", addWidthAndHeight(simpleBarOptions))
	}
}));

stories.add(simpleBarTimeSeriesOptions.title, () => ({
	template: template("simple"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", simpleBarTimeSeriesData),
		options: object("Options", addWidthAndHeight(simpleBarTimeSeriesOptions))
	}
}));

stories.add(groupedBarOptions.title, () => ({
	template: template("grouped"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", groupedBarData),
		options: object("Options", addWidthAndHeight(groupedBarOptions))
	}
}));

stories.add(stackedBarOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stackedBarData),
		options: object("Options", addWidthAndHeight(stackedBarOptions))
	}
}));

stories.add(stackedBarTimeSeriesOptions.title, () => ({
	template: template("stacked"),
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stackedBarTimeSeriesData),
		options: object("Options", addWidthAndHeight(stackedBarTimeSeriesOptions))
	}
}));
