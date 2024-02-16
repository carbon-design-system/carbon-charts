import { ChartModel } from './model'
import { getProperty } from '@/tools'

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class PieChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getTabularData(data: any) {
		const tabularData = super.getTabularData(data)

		// if the data was changed to tabular format
		// update the group to the key so the slices render with the correct tooltips and colors
		if (data !== tabularData) {
			// If a label was set for the overall dataset, reassign it to key value
			tabularData.forEach((d: any) => {
				if (d.key && d.key !== d.group) {
					d.group = d.key
				}
			})
		}

		return tabularData
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const { valueMapsTo } = options.pie
		const { number: numberFormatter, code: localeCode } = getProperty(options, 'locale')

		const headers = ['Group', 'Value']
		const cells = [
			...displayData.map((datum: any) => [
				datum[groupMapsTo],
				datum[valueMapsTo] === null ? '&ndash;' : numberFormatter(datum[valueMapsTo], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}

	sanitize(data: any) {
		const tabularData = this.getTabularData(data)

		// Sort data based on value
		return tabularData.sort((a, b) => b.value - a.value)
	}
}
