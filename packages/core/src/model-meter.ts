// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import { Tools } from "./tools";
import * as colorPalettes from "./services/colorPalettes";

/** The meter chart model layer which extends some of the data setting options.
 * Meter only has 1 dataset and does not need a colorScale (only uses one color).
 *  */

export class MeterChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 */
	setData(newData) {
		const dataLabels = this.generateDataLabels(newData);
		const fillColor = newData.fillColor;

		delete newData.fillColor;

		this.set({
			data: newData,
			dataLabels,
			fillColor: fillColor
		});

		return this.state.data;
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

		return this.get("data");
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


