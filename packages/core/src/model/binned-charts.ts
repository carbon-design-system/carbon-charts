// Internal Imports
import { ChartModelCartesian } from './cartesian-charts';

import { get } from 'lodash-es';

/**
 * this is intended for binned type of charts
 * */
export class ChartModelBinned extends ChartModelCartesian {
	getTabularDataArray() {
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const binnedStackedData = this.getBinnedStackedData();

		const result = [
			[
				get(options, 'bins.rangeLabel') || 'Range',
				...binnedStackedData.map((datum) =>
					get(datum, `0.${groupMapsTo}`)
				),
			],
			...get(binnedStackedData, 0).map((d, i) => [
				`${get(d, 'data.x0')} – ${get(d, 'data.x1')}`,
				...binnedStackedData.map((datum) =>
					get(datum[i], `data.${get(datum[i], groupMapsTo)}`)
				),
			]),
		];

		return result;
	}
}
