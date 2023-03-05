// Internal Imports
import { ChartModel } from './model';
import * as Tools from '../tools';

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
			if (Array.isArray(datum.children)) {
				datum.children.forEach((child) => {
					result.push([child.name, datum.name, child.value]);
				});
			} else if (
				Tools.getProperty(datum.name) !== null &&
				Tools.getProperty(datum.value)
			) {
				result.push(['–', datum.name, datum.value]);
			}
		});

		return result;
	}
}
