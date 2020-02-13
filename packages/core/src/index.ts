import {
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	MapChart
} from "./charts/index";

// Configs & interfaces
import * as configurations from "./configuration";
import * as interfaces from "./interfaces";

import * as colorPalettes from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = colorPalettes.DEFAULT;

export {
	interfaces,
	configurations,
	defaultColors,
	colorPalettes,
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	MapChart
};
