import { ChartModel } from './model'
import { getProperty } from '@/tools'

/**
 * The gauge chart model layer
 */
export class GaugeChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getDataGroups() {
		return super.getDataGroups().filter((item: any) => item.name !== 'delta')
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		const headers = ['Group', 'Value']
		const cells = [
			...displayData.map((datum: any) => [
				datum[groupMapsTo],
				datum['value'] === null ? '&ndash;' : numberFormatter(datum['value'], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}
}
