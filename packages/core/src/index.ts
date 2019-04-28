require("./polyfills");

import { BaseChart } from "./base-chart";
import { BaseAxisChart } from "./base-axis-chart";

import { PieChart } from "./pie-chart";
import { DonutChart, DonutCenter } from "./donut-chart";
import { BarChart } from "./bar-chart";
import { LineChart } from "./line-chart";
import { ComboChart } from "./combo-chart";
import { ScatterChart } from "./scatter-chart";

import colors from "./services/colors";
import * as Configuration from "./configuration";
const defaultColors = Configuration.options.BASE.colors;

import * as themes from "./services/themes";

export {
	colors,
	defaultColors,
	themes,
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
