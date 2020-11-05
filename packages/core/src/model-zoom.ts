// Internal Imports
import { ChartModel } from "./model";
import { Tools } from "./tools";

/**
 * This supports adding X and Y Cartesian[2D] zoom data to a ChartModel
 * */
export class ChartModelCartesian extends ChartModel {
	constructor(services: any) {
		super(services);
	}
	setData(newData) {
		const data = super.setData(newData);
		if (Tools.getProperty(this.getOptions(), "zoomBar")) {
			// if we have zoom bar data we need to update it as well
			this.setZoomBarData();
		}
		return data;
	}

	/**
	 * @param zoomBarData any special zoom bar data to use instead of the model data
	 */
	setZoomBarData(newZoomBarData?) {
		const sanitizedData = newZoomBarData
			? this.sanitize(Tools.clone(newZoomBarData))
			: this.getDisplayData(); // if we're not passed explicit zoom data use the model

		let zoomBarNormalizedValues = sanitizedData;

		const { cartesianScales } = this.services;
		if (
			cartesianScales.domainAxisPosition &&
			cartesianScales.rangeAxisPosition
		) {
			const domainIdentifier = cartesianScales.getDomainIdentifier();
			const rangeIdentifier = cartesianScales.getRangeIdentifier();
			// get all dates (Number) in displayData
			let allDates = sanitizedData.map((datum) =>
				datum[domainIdentifier].getTime()
			);
			allDates = Tools.removeArrayDuplicates(allDates).sort();

			// Go through all date values
			// And get corresponding data from each dataset
			zoomBarNormalizedValues = allDates.map((date) => {
				let sum = 0;
				const datum = {};

				sanitizedData.forEach((data) => {
					if (data[domainIdentifier].getTime() === date) {
						sum += data[rangeIdentifier];
					}
				});
				datum[domainIdentifier] = new Date(date);
				datum[rangeIdentifier] = sum;

				return datum;
			});
		}

		this.set({ zoomBarData: zoomBarNormalizedValues });
	}

	getZoomBarData() {
		return this.get("zoomBarData");
	}
}
