// Internal Imports
import { ChartModelCartesian } from './cartesian-charts';
import { Tools } from '../tools';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class RadarChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services);
	}

	getTabularDataArray() {
		const options = this.getOptions();

		const groupedData = this.getGroupedData();

		const { angle, value } = Tools.getProperty(options, 'radar', 'axes');

		const additionalHeaders = Tools.getProperty(
			groupedData,
			'0',
			'data'
		).map((d) => d[angle]);

		const result = [
			['Group', ...additionalHeaders],
			...groupedData.map((datum) => {
				return [
					datum['name'],
					...additionalHeaders.map((additionalHeader, i) =>
						Tools.getProperty(datum, 'data', i, value) !== null
							? Tools.getProperty(
									datum,
									'data',
									i,
									value
							  ).toLocaleString()
							: '&ndash;'
					),
				];
			}),
		];

		return result;
	}
}
