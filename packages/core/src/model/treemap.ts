// Internal Imports
import { ChartModel } from './model';

/**
 * The treemap chart model layer
 */
export class TreemapChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData();

		const result = [['Child', 'Group', 'Value']];

		displayData.forEach((datum) => {
			datum.children.forEach((child) => {
				result.push([child.name, datum.name, child.value]);
			});
		});

		return result;
	}
}
