// Internal Imports
import { ChartModel } from "./model";

// Internal Imports
import * as Configuration from "./configuration";
// import { Tools } from "./tools";
// import * as colorPalettes from "./services/colorPalettes";
// import { Events, ScaleTypes } from "./interfaces";

// // D3
// import { map } from "d3-collection";
// import { scaleOrdinal } from "d3-scale";
// import { stack } from "d3-shape";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class TreemapChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	getDisplayData() {
		if (!this.get("data")) {
			return null;
		}

		const { ACTIVE } = Configuration.legend.items.status;
		const dataGroups = this.getDataGroups();
		const { groupMapsTo } = this.getOptions().data;
		const allDataFromDomain = this.getAllDataFromDomain();
		console.log("fewg", allDataFromDomain)

		return allDataFromDomain.filter((datum) => {
			return dataGroups.find(
				(dataGroup) =>
					dataGroup.name === datum[groupMapsTo] &&
					dataGroup.status === ACTIVE
			);
		});
	}
}
