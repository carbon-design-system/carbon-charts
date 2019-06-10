require("./polyfills");

// import { BaseChart } from "./base-chart";
// import { BaseAxisChart } from "./base-axis-chart";

import { ScatterChart } from "./scatter-chart";

import * as colorPalettes from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = colorPalettes.DEFAULT;

export {
	defaultColors,
	colorPalettes,
	// BaseChart,
	// BaseAxisChart,
	ScatterChart
};
