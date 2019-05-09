require("./polyfills");

import { BaseChart } from "./base-chart";
import { BaseAxisChart } from "./base-axis-chart";

import { PieChart } from "./pie-chart";
import { DonutChart, DonutCenter } from "./donut-chart";
import { BarChart } from "./bar-chart";
import { LineChart } from "./line-chart";
import { ComboChart } from "./combo-chart";
import { ScatterChart } from "./scatter-chart";

import * as colorPalettes from "./services/colorPalettes";
// TODO 1.0 - Remove deprecated API
const defaultColors = colorPalettes.DEFAULT;

export {
	defaultColors,
	colorPalettes,
	BaseChart,
	BaseAxisChart,
	PieChart,
	DonutChart,
	DonutCenter,
	BarChart,
	LineChart,
	ComboChart,
	ScatterChart
};
