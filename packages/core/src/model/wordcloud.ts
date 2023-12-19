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
		const headingLabels = [options.tooltip.wordLabel, 'Group', options.tooltip.valueLabel]
		const tabelData = [
			...displayData.map((datum: any) => [
				datum[wordMapsTo],
				datum[groupMapsTo],
				datum[fontSizeMapsTo]
			])
		]

		return super.formatTable(headingLabels, tabelData)
	}
}
