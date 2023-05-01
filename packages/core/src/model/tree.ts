// Internal Imports
import { ChartModel } from './model'

/**
 * The tree chart model layer
 */
export class TreeChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()

		const result = [['Child', 'Parent']]

		displayData.forEach((datum) => {
			// Call recurisve function
			this.getChildrenDatums(datum, result)
			result.push([datum.name, '&ndash;'])
		})

		return result
	}

	/**
	 * Determine the child parent relationship in nested data
	 * @param datum: Object
	 * @param result: Array<Object>
	 */
	private getChildrenDatums(datum, result = []) {
		// Check to see if datum has children before iterating through it
		if (datum.children) {
			if (datum.children.length > 0) {
				datum.children.forEach((child) => {
					this.getChildrenDatums(child, result)
					result.push([child.name, datum.name])
				})
			}
		}
	}
}
