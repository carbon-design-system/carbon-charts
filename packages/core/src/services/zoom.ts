// Internal Imports
import { AxisPositions, ScaleTypes } from "../interfaces";
import { Service } from "./service";
import { Tools } from "../tools";

// D3 imports
import { extent } from "d3-array";

export class Zoom extends Service {
	isZoomBarEnabled() {
		// CartesianScales service is only available in axis charts
		if (!this.services.cartesianScales) {
			return false;
		}

		// @todo - need to update this if zoom bar in other position (bottom, left, right) is supported
		// check configuration
		if (
			!Tools.getProperty(
				this.model.getOptions(),
				"zoomBar",
				"top",
				"enabled"
			)
		) {
			return false;
		}

		// @todo - Zoom Bar only supports main axis at BOTTOM axis and time scale for now
		this.services.cartesianScales.findDomainAndRangeAxes(); // need to do this before getMainXAxisPosition()
		const mainXAxisPosition = this.services.cartesianScales.getMainXAxisPosition();
		const mainXScaleType = Tools.getProperty(
			this.model.getOptions(),
			"axes",
			mainXAxisPosition,
			"scaleType"
		);

		return (
			mainXAxisPosition === AxisPositions.BOTTOM &&
			mainXScaleType === ScaleTypes.TIME
		);
	}

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

	// filter out data not inside zoom domain
	// to get better range value for axis label
	filterDataForRangeAxis(displayData: object[], stacked = false) {
		const zoomDomain = this.model.get("zoomDomain");
		const isUpdateRangeAxis = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"updateRangeAxis"
		);
		if (this.isZoomBarEnabled() && isUpdateRangeAxis && zoomDomain) {
			const domainIdentifier = stacked
				? "sharedStackKey"
				: this.services.cartesianScales.getDomainIdentifier();
			const filteredData = displayData.filter(
				(datum) =>
					new Date(datum[domainIdentifier]) >= zoomDomain[0] &&
					new Date(datum[domainIdentifier]) <= zoomDomain[1]
			);
			// if no data in zoom domain, use all data to get full range value
			// so only return filteredData if length > 0
			if (filteredData.length > 0) {
				return filteredData;
			}
		}
		// return original data by default
		return displayData;
	}
}
