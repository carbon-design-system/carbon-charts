import "./styles/style.scss";

import {
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart
} from "./charts/index";

import * as colorPalettes from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = colorPalettes.DEFAULT;

export {
	defaultColors,
	colorPalettes,
	// BaseChart,
	// BaseAxisChart,
	StackedBarChart,
	LineChart,
	ScatterChart,
	PieChart
};
