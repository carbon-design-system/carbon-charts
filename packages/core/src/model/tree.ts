import { ChartModel } from './model'

/**
 * The tree chart model layer
 */
export class TreeChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	/**
	 * Retrieves and formats tabular data from the display data.
	 *
	 * @returns {any[]} An object containing the headers and cells of the tabular data.
	 */
	getTabularDataArray() {
		const displayData = this.getDisplayData()

		const headers = ['Child', 'Parent']
		const cells = []
		displayData.forEach((datum: any) => {
			// Call recursive function
			this.getChildrenDatums(datum, cells)
			cells.push([datum.name, '&ndash;'])
		})

		return super.formatTable({ headers, cells })
	}

	/**
	 * Determine the child parent relationship in nested data
	 * @private
	 * @param {any} datum - The datum node to process.
	 * @param {any[]} [result=[]] - An array to accumulate the resulting data.
	 * @returns {any[]} The accumulated result array.
	 */
	private getChildrenDatums(datum: any, result: any[] = []) {
		// Check to see if datum has children before iterating through it
		if (datum.children) {
			if (datum.children.length > 0) {
				datum.children.forEach((child: any) => {
					this.getChildrenDatums(child, result)
					result.push([child.name, datum.name])
				})
			}
		}
	}
}
