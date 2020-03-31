// Internal Imports
import { ChartModel } from "./model";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class PieChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	sanitize(data) {
		const tabularData = this.getTabularData(data);

		// Sort data based on value
		return tabularData.sort((a, b) => b.value - a.value);
	}
}
