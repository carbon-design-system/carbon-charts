import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Line
	lineTimeSeriesOptions,
	lineTimeSeriesData,
	lineData,
	lineOptions
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

const stories = storiesOf("Line", module);
stories.add(lineOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: lineData,
		options: addWidthAndHeight(lineOptions)
	}
}));

stories.add(lineTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: lineTimeSeriesData,
		options: addWidthAndHeight(lineTimeSeriesOptions)
	}
}));
