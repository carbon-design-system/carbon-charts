// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import * as colorPalettes from "./services/colorPalettes";

/** The meter chart model layer which extends some of the data setting options.
 * Meter only has 1 dataset and does not need a colorScale (only uses one color).
 *  */

export class MeterChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}


	generateDataLabels(newData) {
		const dataLabels = {};
		dataLabels[newData.label] = Configuration.legend.items.status.ACTIVE;

		return dataLabels;
	}


	getDisplayData() {
		if (!this.get("data")) {
			return null;
		}
		// meter only uses displays one data group and value
		return this.get("data")[0];
	}

	setColorScale() {
		this.colorScale = null;
		return;
	}


	getFillColor(label: string) {
		if (!this.get("fillColor")) {
			const colors = colorPalettes.DEFAULT;
			return colors[0];
		}
		return this.get("fillColor");
	}
}


