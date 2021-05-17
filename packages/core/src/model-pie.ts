// Internal Imports
import { ChartModel } from './model';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class PieChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	getTabularData(data) {
		const tabularData = super.getTabularData(data);

		// if the data was changed to tabular format
		// update the group to the key so the slices render with the correct tooltips and colors
		if (data !== tabularData) {
			// If a label was set for the overall dataset, reassign it to key value
			tabularData.forEach((d) => {
				if (d.key && d.key !== d.group) {
					d.group = d.key;
				}
			});
		}

		return tabularData;
	}

	sanitize(data) {
		const tabularData = this.getTabularData(data);

		// Sort data based on value
		return tabularData.sort((a, b) => b.value - a.value);
	}
}
