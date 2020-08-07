// Internal Imports
import { Service } from "./service";
import { Tools } from "../tools";

// D3 imports
import { extent } from "d3-array";
import { AxisPositions, ScaleTypes } from "../interfaces";

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
			allDates = allDates.concat(
				new Date(data[domainIdentifier]).getTime()
			);
		});
		allDates = Tools.removeArrayDuplicates(allDates).sort();
		// Go through all date values
		// And get corresponding data from each dataset
		return allDates.map((date) => {
			let sum = 0;
			const datum = {};

			zoomBarData.forEach((data) => {
				if (new Date(data[domainIdentifier]).getTime() === date) {
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
		if (!zoomBarData || zoomBarData.length === 0) {
			return undefined;
		}
		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const domainIdentifier = cartesianScales.getDomainIdentifier();

		// default to full range with extended domain
		return cartesianScales.extendsDomain(
			mainXAxisPosition,
			extent(zoomBarData, (d: any) => d[domainIdentifier])
		);
	}

	isZoomBarEnabled() {
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

		// CartesianScales service is only available in axis charts
		if (!this.services.cartesianScales) {
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

	isToolbarEnabled() {
		return (
			this.isZoomBarEnabled() &&
			Tools.getProperty(
				this.model.getOptions(),
				"zoomBar",
				"toolBar",
				"showToolBar"
			)
		);
	}

	isDataLoading() {
		return Tools.getProperty(this.model.getOptions(), "data", "loading");
	}

	isEmptyState() {
		return this.getZoomBarData().length === 0;
	}
}
