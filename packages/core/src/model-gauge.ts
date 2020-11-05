// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import { Tools } from "./tools";

/** The meter chart model layer which extends some of the data setting options.
 *  Meter only uses 1 dataset
 *  */

export class GaugeChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	getData() {
		return super.getData();
	}

}
