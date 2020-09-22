// Internal Imports
import { Service } from "./service";
import { Events } from "../interfaces";
import { Tools } from "../tools";

// D3 imports
import { extent } from "d3-array";

export class Zoom extends Service {
	// get display data for zoom bar
	// basically it's sum of value grouped by time
	getZoomBarData() {
		const { cartesianScales } = this.services;
		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const rangeIdentifier = cartesianScales.getRangeIdentifier();

		let zoomBarData;
		// check if pre-defined zoom bar data exists
		const definedZoomBarData = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"data"
		);
		// if user already defines zoom bar data, use it
		if (definedZoomBarData && definedZoomBarData.length > 1) {
			zoomBarData = definedZoomBarData;
		} else {
			// use displayData if not defined
			zoomBarData = this.model.getDisplayData();
		}
		// get all dates (Number) in displayData
		let allDates = [];
		zoomBarData.forEach((data) => {
			allDates = allDates.concat(Number(data[domainIdentifier]));
		});
		allDates = Tools.removeArrayDuplicates(allDates).sort();
		// Go through all date values
		// And get corresponding data from each dataset
		return allDates.map((date) => {
			let sum = 0;
			const datum = {};

			zoomBarData.forEach((data) => {
				if (Number(data[domainIdentifier]) === date) {
					sum += data[rangeIdentifier];
				}
			});
			datum[domainIdentifier] = new Date(date);
			datum[rangeIdentifier] = sum;

			return datum;
		});
	}

	getDefaultZoomBarDomain() {
		const zoomBarData = this.services.zoom.getZoomBarData();
		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const domainIdentifier = cartesianScales.getDomainIdentifier();

		// default to full range with extended domain
		return cartesianScales.extendsDomain(
			mainXAxisPosition,
			extent(zoomBarData, (d: any) => d[domainIdentifier])
		);
	}

	handleDomainChange(newDomain, configs = { dispatchEvent: true }) {
		this.model.set({ zoomDomain: newDomain }, { animate: false });
		if (configs.dispatchEvent) {
			this.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
				newDomain
			});
		}
	}
	getZoomRatio() {
		return Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"zoomRatio"
		);
	}
}
