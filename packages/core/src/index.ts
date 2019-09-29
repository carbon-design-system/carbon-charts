import {
	SimpleBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
} from "./charts/index";

import * as colorPalettes from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = colorPalettes.DEFAULT;

export {
	defaultColors,
	colorPalettes,
	SimpleBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart
};
