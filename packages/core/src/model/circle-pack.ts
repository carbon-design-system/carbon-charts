// Internal Imports
import { ChartModel } from './model';
import { Tools } from '../tools';
import { LegendItemType } from '../interfaces/enums';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackChartModel extends ChartModel {
	parentNode = false;

	constructor(services: any) {
		super(services);
		this.set({ depth: 2 }, { skipUpdate: true });
	}

	setData(newData) {
		super.setData(newData);
		this.setDataGroups();
		if (newData.length === 1) {
			this.parentNode = true;
		}
		this.setZoom();
	}

	setOptions(newOptions) {
		const options = this.getOptions();
		const zoomOptions = Tools.merge(
			{},
			newOptions,
			this.getZoomOptions(newOptions)
		);
		Tools.updateLegendAdditionalItems(options, zoomOptions);

		let depth = this.getHierarchyLevel();
		let userProvidedDepth = Tools.getProperty(
			options,
			'circlePack',
			'hierarchyLevel'
		);

		this.set({
			options: Tools.merge(options, zoomOptions),
			depth:
				userProvidedDepth && userProvidedDepth < 4
					? userProvidedDepth
					: depth,
		});
	}

	getZoomOptions(options?) {
		if (!this.getDisplayData()) {
			return {};
		}
		// uses the user provided options and data to determine if there is zoom in this CP chart
		const displayData = this.getDisplayData();
		const zoomOptions = options ? options : this.getOptions();
		const data =
			displayData.length === 1 &&
			Tools.getProperty(displayData, 0, 'children')
				? Tools.getProperty(displayData, 0, 'children')
				: displayData;

		let depth = this.getHierarchyLevel();
		// check the data depth
		data.some((datum) => {
			if (datum.children) {
				if (datum.children.some((item) => item.children)) {
					depth = 3;
					return false;
				}
			}
		});

		if (
			Tools.getProperty(zoomOptions, 'canvasZoom', 'enabled') === true &&
			depth > 2
		) {
			return {
				legend: {
					additionalItems: [
						{
							type: LegendItemType.ZOOM,
							name: 'Click to zoom',
						},
					],
				},
			};
		}
		return null;
	}

	setZoom(options?) {
		this.setOptions(this.getZoomOptions(options));
	}

	// update the hierarchy level
	updateHierarchyLevel(depth: number) {
		this.set({ depth: depth });
	}

	getHierarchyLevel() {
		return this.get('depth');
	}

	hasParentNode() {
		return this.parentNode;
	}

	// set the datagroup name on the items that are it's children
	setDataGroups() {
		const data = this.getData();
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const newData = data.map((depthOne) => {
			const groupName = depthOne[groupMapsTo];
			return this.setChildrenDataGroup(depthOne, groupName);
		});

		this.set(
			{
				data: newData,
			},
			{ skipUpdate: true }
		);
	}

	// sets name recursively down the node tree
	protected setChildrenDataGroup(node, name) {
		if (node.children) {
			return {
				...node,
				dataGroupName: name,
				children: node.children.map((child, i) => {
					return this.setChildrenDataGroup(child, name);
				}),
			};
		} else {
			return { ...node, dataGroupName: name };
		}
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData();

		const result = [['Child', 'Parent', 'Value']];

		displayData.forEach((datum) => {
			let value = datum.value ? datum.value : 0;
			if (datum.children) {
				// Call recursive function
				value += this.getChildrenDatums(
					datum.children,
					datum.name,
					result,
					0
				);
			}
			result.push(['&ndash;', datum.name, value]);
		});

		return result;
	}

	/**
	 * Recursively determine the relationship between all the nested elements in the child
	 * @param children: Object
	 * @param parent: String
	 * @param result: Array<Object>
	 * @param totalSum: number
	 * @returns: number
	 */
	private getChildrenDatums(children, parent, result = [], totalSum = 0) {
		const grandParent = parent;

		children.forEach((child) => {
			const parent = child.name;
			let sum = 0;
			/**
			 * @todo - Comebine into a single if statement instead of using 2 nested ones
			 * if (child.children) {
			 *   if (child.children.length > 0) {
			 */
			if (child.children) {
				if (child.children.length > 0) {
					if (typeof child.value === 'number') {
						totalSum += child.value;
					}

					sum += this.getChildrenDatums(
						child.children,
						parent,
						result,
						sum
					);
					result.push([parent, grandParent, sum]);
					totalSum += sum;
				}
			} else {
				let value = 0;
				if (typeof child.value === 'number') {
					value = child.value;
					totalSum += child.value;
				}
				result.push([child.name, grandParent, value]);
			}
		});

		return totalSum;
	}
}
