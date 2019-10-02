import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Step
	stepOptions,
	stepData,
	stepTimeSeriesOptions,
	stepTimeSeriesData
} from "../../core/demo/demo-data/index";
import { addWidthAndHeight } from "./commons";

const template = `
<n-line-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#lineChart>
</n-line-chart>
`;

const stories = storiesOf("Step", module);
stories.add(stepOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stepData,
		options: addWidthAndHeight(stepOptions)
	}
}));

stories.add(stepTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: stepTimeSeriesData,
		options: addWidthAndHeight(stepTimeSeriesOptions)
	}
}));
