// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import { Tools } from "./tools";
import * as colorPalettes from "./services/colorPalettes";

// D3 Imports
import { scaleOrdinal } from "d3-scale";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class SimpleBarChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}
}
