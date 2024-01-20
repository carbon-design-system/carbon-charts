// Internal Imports
import { ChartModelCartesian } from './cartesian-charts'

/**
 * Alluvial chart model layer
 */
export class AlluvialChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()

		// Sort array by source to get a close depiction of the alluvial chart
		displayData.sort((a: any, b: any) => a['source'].localeCompare(b['source']))
		const headers = ['Source', 'Target', 'Value']
		const cells = [
			...displayData.map((datum: any) => [datum['source'], datum['target'], datum['value']])
		]

		return super.formatTable({ headers, cells })
	}
}
