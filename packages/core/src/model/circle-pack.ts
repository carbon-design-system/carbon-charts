import { merge } from 'lodash-es'
import { getProperty, updateLegendAdditionalItems } from '@/tools'
import { ChartModel } from './model'
import { LegendItemType } from '@/interfaces/enums'

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackChartModel extends ChartModel {
	parentNode = false

	constructor(services: any) {
		super(services)
		this.set({ depth: 2 }, { skipUpdate: true })
	}

	setData(newData: any) {
		super.setData(newData)
		this.setDataGroups()
		if (newData.length === 1) {
			this.parentNode = true
		}
		this.setZoom()
	}

	setOptions(newOptions: any) {
		const options = this.getOptions()
		const zoomOptions = merge({}, newOptions, this.getZoomOptions(newOptions))
		updateLegendAdditionalItems(options, zoomOptions)

		const depth = this.getHierarchyLevel()
		const userProvidedDepth = getProperty(options, 'circlePack', 'hierarchyLevel')

		this.set({
			options: merge(options, zoomOptions),
			depth: userProvidedDepth && userProvidedDepth < 4 ? userProvidedDepth : depth
		})
	}

	getZoomOptions(options?: any) {
		if (!this.getDisplayData()) {
			return {}
		}
		// uses the user provided options and data to determine if there is zoom in this CP chart
		const displayData = this.getDisplayData()
		const zoomOptions = options ? options : this.getOptions()
		const data =
			displayData.length === 1 && getProperty(displayData, 0, 'children')
				? getProperty(displayData, 0, 'children')
				: displayData

		let depth = this.getHierarchyLevel()
		// check the data depth
		data.some((datum: any) => {
			if (datum.children) {
				if (datum.children.some((item: any) => item.children)) {
					depth = 3
					return false
				}
			}
		})

		if (getProperty(zoomOptions, 'canvasZoom', 'enabled') === true && depth > 2) {
			return {
				legend: {
					additionalItems: [
						{
							type: LegendItemType.ZOOM,
							name: 'Click to zoom'
						}
					]
				}
			}
		}
		return null
	}

	setZoom(options?: any) {
		this.setOptions(this.getZoomOptions(options))
	}

	// update the hierarchy level
	updateHierarchyLevel(depth: number) {
		this.set({ depth: depth })
	}

	getHierarchyLevel() {
		return this.get('depth')
	}

	hasParentNode() {
		return this.parentNode
	}

	// set the datagroup name on the items that are it's children
	setDataGroups() {
		const data = this.getData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const newData = data.map((depthOne: any) => {
			const groupName = depthOne[groupMapsTo]
			return this.setChildrenDataGroup(depthOne, groupName)
		})

		this.set(
			{
				data: newData
			},
			{ skipUpdate: true }
		)
	}

	// sets name recursively down the node tree
	protected setChildrenDataGroup(node: any, name: any) {
		if (node.children) {
			return {
				...node,
				dataGroupName: name,
				children: node.children.map((child: any) => {
					return this.setChildrenDataGroup(child, name)
				})
			}
		} else {
			return { ...node, dataGroupName: name }
		}
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		const headers = ['Child', 'Parent', 'Value']
		const cells = []

		displayData.forEach((datum: any) => {
			let value = datum.value ? datum.value : 0
			if (datum.children) {
				// Call recursive function
				value += this.getChildrenDatums(datum.children, datum.name, cells, 0)
			}
			cells.push(['&ndash;', datum.name, numberFormatter(value, localeCode)])
		})

		return super.formatTable({ headers, cells })
	}

	/**
	 * Recursively determine the relationship between all the nested elements in the child
	 * @param children: Object
	 * @param parent: String
	 * @param result: Array<Object>
	 * @param totalSum: number
	 * @returns: number
	 */
	private getChildrenDatums(children: any, parent: any, result: string[][] = [], totalSum = 0) {
		const grandParent = parent
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		children.forEach((child: any) => {
			const parentWithinIteration = child.name
			let sum = 0

			if (child.children) {
				if (child.children.length > 0) {
					if (typeof child.value === 'number') {
						totalSum += child.value
					}

					sum += this.getChildrenDatums(child.children, parentWithinIteration, result, sum)
					result.push([parentWithinIteration, grandParent, numberFormatter(sum, localeCode)])
					totalSum += sum
				}
			} else {
				let value = 0
				if (typeof child.value === 'number') {
					value = child.value
					totalSum += child.value
				}
				result.push([child.name, grandParent, numberFormatter(value, localeCode)])
			}
		})

		return totalSum
	}
}
