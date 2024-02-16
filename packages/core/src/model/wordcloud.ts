import { getProperty } from '@/tools'
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
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')

		const headers = [options.tooltip.wordLabel, 'Group', options.tooltip.valueLabel]
		const cells = [
			...displayData.map((datum: any) => [
				datum[wordMapsTo],
				datum[groupMapsTo],
				numberFormatter(datum[fontSizeMapsTo], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}
}
