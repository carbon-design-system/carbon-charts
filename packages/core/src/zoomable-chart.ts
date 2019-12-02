import { Chart } from "./chart";
import {
	ChartConfig,
	ZoomableChartOptions
} from "./interfaces/index";

export class ZoomableChart extends Chart {
	constructor(holder: Element, chartConfigs: ChartConfig<ZoomableChartOptions>) {
		super(holder, chartConfigs);
	}
}
