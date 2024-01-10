import { getProperty } from '@/tools'
import { ChartModel } from './model'

/**
 * The treemap chart model layer
 */
export class TreemapChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()

		const headers = ['Child', 'Group', 'Value']
		const cells = []
		displayData.forEach((datum: any) => {
			if (Array.isArray(datum.children)) {
				datum.children.forEach((child: any) => {
					cells.push([child.name, datum.name, child.value])
				})
			} else if (getProperty(datum.name) !== null && getProperty(datum.value)) {
				cells.push(['–', datum.name, datum.value])
			}
		})

		return super.formatTable({ headers, cells })
	}
}
