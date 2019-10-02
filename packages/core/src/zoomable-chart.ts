import { Chart } from "./chart";
import {
	ChartConfig,
	ZoomableChartOptions
} from "./interfaces/index";

export class ZoomableChart extends Chart {
	protected services: any = Object.assign(this.services, {
		// Additional services that might be needed
		// For these types of charts
	});

	constructor(holder: Element, chartConfigs: ChartConfig<ZoomableChartOptions>) {
		super(holder, chartConfigs);
	}
}
