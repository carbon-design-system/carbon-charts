import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

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
<ibm-line-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#lineChart>
</ibm-line-chart>
`;

const stories = storiesOf("Step", module);
stories.addDecorator(withKnobs);

stories.add(stepOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stepData),
		options: object("Options", addWidthAndHeight(stepOptions))
	}
}));

stories.add(stepTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", stepTimeSeriesData),
		options: object("Options", addWidthAndHeight(stepTimeSeriesOptions))
	}
}));
