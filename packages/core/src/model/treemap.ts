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
		const { number: numberFormatter, code } = getProperty(this.getOptions(), 'locale')
		console.log(code,numberFormatter)
		const headers = ['Child', 'Group', 'Value']
		const cells = []
		displayData.forEach((datum: any) => {
			if (Array.isArray(datum.children)) {
				datum.children.forEach((child: any) => {
					cells.push([child.name, datum.name, numberFormatter(child.value,code)])
				})
			} else if (getProperty(datum.name) !== null && getProperty(datum.value)) {
				cells.push(['–', datum.name, numberFormatter(datum.value,code)])
			}
		})

		return super.formatTable({ headers, cells })
	}
}
