import { storiesOf } from "@storybook/angular";
import { withKnobs, object } from "@storybook/addon-knobs";

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
<ibm-scatter-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#scatterChart>
</ibm-scatter-chart>
`;

const stories = storiesOf("Scatter", module);
stories.addDecorator(withKnobs);

stories.add(scatterOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data:  object("Data", scatterData),
		options: object("Options", addWidthAndHeight(scatterOptions))
	}
}));

stories.add(scatterTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: object("Data", scatterTimeSeriesData),
		options: object("Options", addWidthAndHeight(scatterTimeSeriesOptions))
	}
}));
