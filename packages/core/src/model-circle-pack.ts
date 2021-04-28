// Internal Imports
import { ChartModel } from './model';
import * as Configuration from './configuration';
import { Tools } from './tools';
import { LegendItemType } from './interfaces/enums';

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class CirclePackChartModel extends ChartModel {
	monochrome = false;

	constructor(services: any) {
		super(services);
	}

	setData(newData) {
		super.setData(newData);
		this.setMonochromatic();
		this.setZoom();
	}

	setZoom() {
		const displayData = this.getDisplayData();
		const data =
			displayData.length === 1 ? displayData[0].children : displayData;
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
			Tools.getProperty(this.getOptions(), 'canvasZoom', 'enabled') ===
				true &&
			depth > 2
		) {
			this.setOptions({
				legend: {
					additionalItems: [
						{
							type: LegendItemType.ZOOM,
							name: 'Click to zoom',
						},
					],
				},
			});
		}
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
}
