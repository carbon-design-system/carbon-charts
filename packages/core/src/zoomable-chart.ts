import { Chart } from "./chart";
import {
	ChartConfig,
	ZoomableChartOptions
} from "./interfaces/index";

import * as Configuration from "./configuration";

import { Tools } from "./tools";

export class ZoomableChart extends Chart {
	constructor(holder: Element, chartConfigs: ChartConfig<ZoomableChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.merge(
				Tools.clone(Configuration.options.zoomableChart),
				chartConfigs.options
			)
		);
	}
}
