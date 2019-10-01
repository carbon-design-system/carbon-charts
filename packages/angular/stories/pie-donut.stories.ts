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
	template: `<n-pie-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#pieChart>
</n-pie-chart>`,
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
	template: `<n-donut-chart
	class="n-chart"
	[data]="data"
	[options]="options"
	#donutChart>
</n-donut-chart>`,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		data: donutData,
		options: addWidthAndHeight(donutOptions)
	}
}));
