// Internal Imports
import { ChartModel } from './model';
import * as Configuration from './configuration';
import { Tools } from './tools';
import { Events, LegendItemType } from './interfaces/enums';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackChartModel extends ChartModel {
	monochrome = false;

	constructor(services: any) {
		super(services);
	}

	setData(newData) {
		super.setData(newData);
		this.setDataGroups();
		this.setMonochromatic();
		this.setZoom();
	}

	setOptions(newOptions) {
		const options = this.getOptions();
		const zoomOptions = Tools.merge({}, newOptions, this.getZoomOptions(newOptions));
		Tools.updateLegendAdditionalItems(options, zoomOptions);

		this.set({
			options: Tools.merge(options, zoomOptions),
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
			displayData.length === 1 ? Tools.getProperty(displayData, 0, 'children') : displayData;
		let depth = 2;
		// check data depth
		data.forEach((datum) => {
			if (datum.children) {
				if (datum.children.some((item) => item.children)) {
					depth = 3;
					return;
				}
			}
		});

		if (
			Tools.getProperty(zoomOptions, 'canvasZoom', 'enabled') ===
			true &&
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
		this.setOptions(this.getZoomOptions(options))
	}

	setMonochromatic() {
		if (this.getDisplayData().length === 1) {
			this.monochrome = true;
		}
	}

	isMonochrome() {
		return this.monochrome;
	}

	// update the hierarchy level
	updateHierarchyLevel(depth: number) {
		this.setOptions({ circlePack: { hierarchyLevel: depth } });
	}

	getHierarchyLevel() {
		return (
			Tools.getProperty(
				this.getOptions(),
				'circlePack',
				'hierarchyLevel'
			) || Configuration.circlePack.hierarchyLevel
		);
	}



	// set the datagroup name on the items that are it's children
	setDataGroups() {
		const data = this.getData();
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const newData = data.map(depthOne => {
			const groupName = depthOne[groupMapsTo];
			return this.setChildrenDataGroup(depthOne, groupName);
		})

		this.set({
			data: newData
		});
	}


	// sets name recursively down the node tree
	protected setChildrenDataGroup(node, name) {
		if (node.children) {
			return {
				...node, dataGroupName: name, children: node.children.map((child, i) => {
					return this.setChildrenDataGroup(child, name)

				})
			}
		}
		else {
			return { ...node, dataGroupName: name }
		}
	}
}
