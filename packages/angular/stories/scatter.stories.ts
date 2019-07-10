import { storiesOf } from "@storybook/angular";

import { colors } from "./helpers/commons";

import { ChartsModule } from "../src/charts.module";
import { ScatterComponent } from "./scatter/scatter.component";

import { scatterData, lineOptions } from "./../../core/demo/demo-data/line";

const scatterStories = storiesOf("Scatter", module);
scatterStories.add("Basic", () => ({
	component: ScatterComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		scatterData: scatterData,
		scatterOptions: lineOptions
	}
}));
