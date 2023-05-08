// Internal Imports
import { ChartModel } from './model'
import { getProperty } from '../tools'

/**
 * The treemap chart model layer
 */
export class TreemapChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()

		const result = [['Child', 'Group', 'Value']]

		displayData.forEach((datum: any) => {
			if (Array.isArray(datum.children)) {
				datum.children.forEach((child: any) => {
					result.push([child.name, datum.name, child.value])
				})
			} else if (getProperty(datum.name) !== null && getProperty(datum.value)) {
				result.push(['–', datum.name, datum.value])
			}
		})

		return result
	}
}
