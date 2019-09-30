import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Scatter
	scatterTimeSeriesOptions,
	scatterTimeSeriesData,
	scatterOptions,
	scatterData
} from "../../core/demo/demo-data/index";
import { addWidthAndHeight } from "./commons";

const template = `
<n-scatter-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#scatterChart>
</n-scatter-chart>
`;

const stories = storiesOf("Scatter", module);
stories.add(scatterOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: scatterData,
		options: addWidthAndHeight(scatterOptions)
	}
}));

stories.add(scatterTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: scatterTimeSeriesData,
		options: addWidthAndHeight(scatterTimeSeriesOptions)
	}
}));
