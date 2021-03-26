// Internal Imports
import { ChartModel } from './model';
import * as Configuration from './configuration';
import { Tools } from './tools';

// D3 Imports
import { scaleOrdinal } from 'd3-scale';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	// update the hierarchy level
	updateHierarchyLevel(depth: number) {
		this.setOptions({ circlePack: { hierarchyLevel: depth } });
	}

	getHierarchyLevel() {
		return (
			Tools.getProperty(
				this.getOptions(),
				'circlePack',
				'hierarchyLevel'
			) || Configuration.circlePack.hierarchyLevel
		);
	}
}
