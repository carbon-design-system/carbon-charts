import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../../../src/charts.module";
import { BarComponent } from "../bar/bar.component";

import {
	groupedBarData,
	groupedBarOptions,
	simpleBarData,
	simpleBarOptions,
	stackedBarData,
	stackedBarOptions
} from "./bar-demo-data";

const barStories = storiesOf("Bar", module);
barStories.add("Label-based legend", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: simpleBarData,
		barOptions: simpleBarOptions
	}
}));

barStories.add("Label-based legend (Accessible)", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: simpleBarData,
		barOptions: Object.assign({}, simpleBarOptions, {accessibility: true})
	}
}));

barStories.add("Grouped", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: groupedBarData,
		barOptions: groupedBarOptions
	}
}));

barStories.add("Grouped (Accessible)", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: groupedBarData,
		barOptions: Object.assign({}, groupedBarOptions, {accessibility: true})
	}
}));

barStories.add("Stacked", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: stackedBarData,
		barOptions: stackedBarOptions
	}
}));

barStories.add("Stacked (Accessible)", () => ({
	component: BarComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		barData: stackedBarData,
		barOptions: Object.assign({}, stackedBarOptions, {accessibility: true})
	}
}));
