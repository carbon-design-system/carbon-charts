import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Area
	areaTimeSeriesData,
	areaTimeSeriesOptions,
} from "../../core/demo/demo-data/index";
import { addWidthAndHeight } from "./commons";

const template = `
<ibm-area-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#areaChart>
</ibm-area-chart>
`;

const stories = storiesOf("Area", module);
stories.add(areaTimeSeriesOptions.title, () => ({
	template,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: areaTimeSeriesData,
		options: addWidthAndHeight(areaTimeSeriesOptions)
	}
}));
