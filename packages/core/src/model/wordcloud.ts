// Internal Imports
import { ChartModel } from './model'

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class WordCloudModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()

		const options = this.getOptions()
		const { fontSizeMapsTo, wordMapsTo } = options.wordCloud
		const { groupMapsTo } = options.data

		const result = [
			[options.tooltip.wordLabel, 'Group', options.tooltip.valueLabel],
			...displayData.map((datum: any) => [datum[wordMapsTo], datum[groupMapsTo], datum[fontSizeMapsTo]])
		]

		return result
	}
}
