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

	protected setColorClassNames() {
		// monochrome
		const numberOfColors = 1;

		const colorPairingOptions = Tools.getProperty(
			this.getOptions(),
			'color',
			'pairing'
		);
		let pairingOption = Tools.getProperty(colorPairingOptions, 'option');
		const colorPairingCounts = Configuration.color.pairingOptions;

		// Use default palette if user choice is not in range
		pairingOption =
			pairingOption <= colorPairingCounts[`${numberOfColors}-color`]
				? pairingOption
				: 1;

		// Create color classes for graph, tooltip and stroke use
		const colorPairing = this.allDataGroups.map(
			(dataGroup, index) =>
				`${numberOfColors}-${pairingOption}-1`
		);

		// Create default color classnames
		this.colorClassNames = scaleOrdinal()
			.range(colorPairing)
			.domain(this.allDataGroups);
	}

}
