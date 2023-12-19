import { getProperty } from '@/tools'
import { ChartModelCartesian } from './cartesian-charts'

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
	getMatchingRangeIndexForDatapoint(datum: any) {
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
		const headingLabels = ['Title', 'Group', 'Value', 'Target', 'Percentage', 'Performance']
		const tabelData = [
			...displayData.map((datum: any) => [
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

		return super.formatTable(headingLabels, tabelData)
	}
}
