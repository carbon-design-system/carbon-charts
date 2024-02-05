// Internal Imports
import { ChartModelCartesian } from './cartesian-charts'
import { getProperty } from '@/tools'
/**
 * Alluvial chart model layer
 */
export class AlluvialChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		// Sort array by source to get a close depiction of the alluvial chart
		displayData.sort((a: any, b: any) => a['source'].localeCompare(b['source']))
		const headers = ['Source', 'Target', 'Value']
		const cells = [
			...displayData.map((datum: any) => [
				datum['source'],
				datum['target'],
				numberFormatter(datum['value'], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}
}
