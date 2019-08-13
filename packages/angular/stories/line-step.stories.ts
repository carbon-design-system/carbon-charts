import { storiesOf } from "@storybook/angular";

import { ChartsModule } from "../src/charts.module";
import { LineComponent } from "./line/line.component";
import { AreaComponent } from "./area/area.component";

import {
	curvedLineData,
	curvedLineOptions,
	areaData,
	lineData,
	lineOptions
} from "./line-demo-data";

const lineStories = storiesOf("Line", module);
lineStories.add("Basic", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: lineData,
		lineOptions: lineOptions
	}
}));

lineStories.add("Area", () => ({
	component: AreaComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		areaData: areaData,
		lineOptions: lineOptions
	}
}));

lineStories.add("Natural Curve", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: curvedLineData,
		lineOptions: curvedLineOptions
	}
}));

lineStories.add("Bundle Curve", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: curvedLineData,
		lineOptions: Object.assign({}, curvedLineOptions, {curve: "curveBundle"})
	}
}));

lineStories.add("Monotone Y Curve", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: curvedLineData,
		lineOptions: Object.assign({}, curvedLineOptions, {curve: "curveMonotoneY"})
	}
}));

lineStories.add("Monotone X Curve", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: curvedLineData,
		lineOptions: Object.assign({}, curvedLineOptions, {curve: "curveMonotoneX"})
	}
}));

const stepStories = storiesOf("Step", module);
stepStories.add("Middle", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: lineData,
		lineOptions: Object.assign({}, lineOptions, {curve: "curveStep"})
	}
}));

stepStories.add("Before", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: lineData,
		lineOptions: Object.assign({}, lineOptions, {curve: "curveStepBefore"})
	}
}));

stepStories.add("After", () => ({
	component: LineComponent,
	moduleMetadata: {
		imports: [ChartsModule]
	},
	props: {
		lineData: lineData,
		lineOptions: Object.assign({}, lineOptions, {curve: "curveStepAfter"})
	}
}));
