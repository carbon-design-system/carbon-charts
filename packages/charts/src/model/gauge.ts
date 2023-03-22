// Internal Imports
import { ChartModel } from './model'

/**
 * The gauge chart model layer
 */
export class GaugeChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getDataGroups() {
		return super.getDataGroups().filter((item) => item.name !== 'delta')
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const result = [
			['Group', 'Value'],
			...displayData.map((datum) => [
				datum[groupMapsTo],
				datum['value'] === null ? '&ndash;' : datum['value'].toLocaleString()
			])
		]

		return result
	}
}
