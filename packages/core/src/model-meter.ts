// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import * as colorPalettes from "./services/colorPalettes";
import { Tools } from "./tools";

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

	/**
	 * If status is enabled, returns a fill color based on status, otherwise return configured color.
	 * Defaults to carbon color otherwise.
	 * @param group dataset group label
	 */
	getFillColor(group: string) {
		const options = this.getOptions();
		const { fillColor, status } = Tools.getProperty(options, "meter");
		// if ranges are supplied for status, we dont need a fill color - use carbon colors with scss
		if (status.ranges) {
			return null;
		} else {
			if (!fillColor) {
				// default to carbon color
				const colors = colorPalettes.DEFAULT;
				return colors[0];
			}
			return fillColor;
		}
	}

	/**
	 * Get the associated status for the data by checking the ranges
	 */
	getStatus() {
		const options = this.getOptions();
		const statuses = Tools.getProperty(options, "meter", "status", "ranges");
		const data = this.getDisplayData().value;
		if (statuses) {
			const result = statuses.filter(step => (step.range[0] <= data && data <= step.range[1]));
			return result[0].status;
		}
		return null;
	}
}


