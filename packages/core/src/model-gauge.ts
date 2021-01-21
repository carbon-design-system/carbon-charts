// Internal Imports
import { ChartModel } from './model';

/** The gauge chart model layer */
export class GaugeChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	getDataGroups() {
		return super.getDataGroups().filter((item) => item.name !== 'delta');
	}
}
