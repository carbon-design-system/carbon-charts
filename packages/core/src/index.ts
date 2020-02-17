import {
	// Basic charts
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	BubbleChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	// Advanced charts
	NetworkChart
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
	// Basic charts
	SimpleBarChart,
	GroupedBarChart,
	StackedBarChart,
	BubbleChart,
	LineChart,
	ScatterChart,
	PieChart,
	DonutChart,
	// Advanced charts
	NetworkChart
};
