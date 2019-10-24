import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";

import {
	// Pie & donut
	pieOptions,
	pieData,
	donutOptions,
	donutData
} from "../../core/demo/demo-data/index";
import { addWidthAndHeight } from "./commons";

const pieStories = storiesOf("Pie", module);
pieStories.add(pieOptions.title, () => ({
	template: `
		<ibm-pie-chart
			class="n-chart"
			[data]="data"
			[options]="options"
			#pieChart>
		</ibm-pie-chart>`,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: pieData,
		options: addWidthAndHeight(pieOptions)
	}
}));

const donutStories = storiesOf("Donut", module);
donutStories.add(donutOptions.title, () => ({
	template: `
		<ibm-donut-chart
			class="n-chart"
			[data]="data"
			[options]="options"
			#donutChart>
		</ibm-donut-chart>`,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: donutData,
		options: addWidthAndHeight(donutOptions)
	}
}));
