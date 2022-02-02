// Internal Imports
import { ChartModelCartesian } from './cartesian-charts';

/**
 * Alluvial chart model layer
 */
export class AlluvialChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services);
	}

	createTabularDataArray() {
		const displayData = this.getDisplayData();

		// Sort array by source to get a close depiction of the alluvial chart
		displayData.sort((a, b) => a['source'].localeCompare(b['source']));

		const result = [
			['Source', 'Target', 'Value'],
			...displayData.map((datum) => [
				datum['source'],
				datum['target'],
				datum['value'],
			]),
		];

		return result;
	}
}
