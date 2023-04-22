// Internal Imports
import { ChartModelCartesian } from './cartesian-charts'
import { getProperty } from '../tools'

/**
 * Bullet chart model layer
 */
export class BulletChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services)
	}

	/**
	 * Determines the index of the performance area titles to use
	 * @param datum
	 * @returns number
	 */
	getMatchingRangeIndexForDatapoint(datum) {
		let matchingRangeIndex
		for (let i = datum.ranges.length - 1; i > 0; i--) {
			const range = datum.ranges[i]
			if (datum.value >= range) {
				matchingRangeIndex = i

				return matchingRangeIndex
			}
		}

		return 0
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()

		const performanceAreaTitles = getProperty(options, 'bullet', 'performanceAreaTitles')

		const result = [
			['Title', 'Group', 'Value', 'Target', 'Percentage', 'Performance'],
			...displayData.map((datum) => [
				datum['title'],
				datum[groupMapsTo],
				datum['value'] === null ? '&ndash;' : datum['value'],
				getProperty(datum, 'marker') === null ? '&ndash;' : datum['marker'],
				getProperty(datum, 'marker') === null
					? '&ndash;'
					: `${Math.floor((datum[rangeIdentifier] / datum.marker) * 100)}%`,
				performanceAreaTitles[this.getMatchingRangeIndexForDatapoint(datum)]
			])
		]

		return result
	}
}
