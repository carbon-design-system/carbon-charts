// Internal Imports
import { AxisPositions, Events, ScaleTypes } from "../interfaces";
import { Service } from "./service";
import { Tools } from "../tools";
import * as Configuration from "../configuration";

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
			AxisPositions.TOP,
			"data"
		);

		// if user already defines zoom bar data, use it
		if (definedZoomBarData && definedZoomBarData.length > 1) {
			// Sanitize the user-provided zoombar data
			definedZoomBarData.forEach((definedZoomBarDatum, i) => {
				if (
					definedZoomBarDatum[domainIdentifier].getTime === undefined
				) {
					definedZoomBarData[i][domainIdentifier] = new Date(
						definedZoomBarDatum[domainIdentifier]
					);
				}
			});

			zoomBarData = definedZoomBarData;
		} else {
			// use displayData if not defined
			zoomBarData = this.model.getDisplayData();
		}

		// get all dates (Number) in displayData
		let allDates = zoomBarData.map((datum) =>
			datum[domainIdentifier].getTime()
		);
		allDates = Tools.removeArrayDuplicates(allDates).sort();
		// Go through all date values
		// And get corresponding data from each dataset
		return allDates.map((date) => {
			let sum = 0;
			const datum = {};

			zoomBarData.forEach((data) => {
				if (data[domainIdentifier].getTime() === date) {
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

	// filter out data not inside zoom domain
	// to get better range value for axis label
	filterDataForRangeAxis(displayData: object[], configs?: any) {
		const zoomDomain = this.model.get("zoomDomain");
		const mergedConfigs = Object.assign(
			{ stacked: false }, // default configs
			configs
		);
		const shouldUpdateRangeAxis = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"updateRangeAxis"
		);
		if (this.isZoomBarEnabled() && shouldUpdateRangeAxis && zoomDomain) {
			const domainIdentifier = mergedConfigs.stacked
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

	zoomIn(zoomRatio = this.getZoomRatio()) {
		// get current zoomDomain
		const currentZoomDomain = this.model.get("zoomDomain");
		const handleWidth = Configuration.zoomBar.handleWidth;
		const xScale = this.services.cartesianScales.getMainXScale().copy();
		xScale.domain(this.getDefaultZoomBarDomain()); // reset domain to default full domain

		// use scale range (rather than domain) to calculate
		// current zoom bar handle x position
		const currentX0 = xScale(currentZoomDomain[0]);
		const currentX1 = xScale(currentZoomDomain[1]);

		// zoom bar handles are already too close
		if (currentX1 - currentX0 < handleWidth + 1) {
			return;
		}
		const fullRange = xScale.range();
		const gap = currentX1 - currentX0;
		const diff = Math.min(
			((fullRange[1] - fullRange[0]) / 2) * (zoomRatio / 2),
			gap / 2
		);

		// new zoom bar handle x position
		let newX0 = currentX0 + diff;
		let newX1 = currentX1 - diff;
		// if left handle becomes right side of right handle, just make them close to each other
		if (newX0 >= newX1) {
			newX0 = currentX0 + gap / 2 - handleWidth / 2;
			newX1 = currentX1 - gap / 2 + handleWidth / 2;
		}

		const newDomain = [xScale.invert(newX0), xScale.invert(newX1)];

		// only if zoomDomain needs update
		if (
			currentZoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
			currentZoomDomain[1].valueOf() !== newDomain[1].valueOf()
		) {
			this.handleDomainChange(newDomain);
		}
	}

	zoomOut(zoomRatio = this.getZoomRatio()) {
		// get current zoomDomain
		const currentZoomDomain = this.model.get("zoomDomain");
		const xScale = this.services.cartesianScales.getMainXScale().copy();
		xScale.domain(this.getDefaultZoomBarDomain()); // reset domain to default full domain

		// use scale range (rather than domain) to calculate
		// current zoom bar handle x position
		const currentX0 = xScale(currentZoomDomain[0]);
		const currentX1 = xScale(currentZoomDomain[1]);

		const fullRange = xScale.range();
		const diff = ((fullRange[1] - fullRange[0]) / 2) * (zoomRatio / 2);

		// new zoom bar handle x position
		// max to full range
		const newX0 = Math.max(currentX0 - diff, fullRange[0]);
		const newX1 = Math.min(currentX1 + diff, fullRange[1]);

		const newDomain = [xScale.invert(newX0), xScale.invert(newX1)];

		// only if zoomDomain needs update
		if (
			currentZoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
			currentZoomDomain[1].valueOf() !== newDomain[1].valueOf()
		) {
			this.handleDomainChange(newDomain);
		}
	}

	resetZoomDomain() {
		// get current zoomDomain
		const currentZoomDomain = this.model.get("zoomDomain");
		const newDomain = this.getDefaultZoomBarDomain();

		// only if zoomDomain needs update
		if (
			currentZoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
			currentZoomDomain[1].valueOf() !== newDomain[1].valueOf()
		) {
			this.handleDomainChange(newDomain);
		}
	}

	// check if current zoom domain is already the min zoom domain
	// when toolbar is rendered, we don't render chart yet
	// don't depend on scale range
	isMinZoomDomain() {
		// get current zoomDomain
		const currentZoomDomain = this.model.get("zoomDomain");
		// assume the max zoom domain is the default zoom bar domain
		const maxZoomDomain = this.getDefaultZoomBarDomain();
		if (!currentZoomDomain || !maxZoomDomain) {
			return false;
		}

		const currentZoomDomainPeriod =
			currentZoomDomain[1].valueOf() - currentZoomDomain[0].valueOf();
		const maxZoomDomainPeriod =
			maxZoomDomain[1].valueOf() - maxZoomDomain[0].valueOf();
		const minZoomRatio = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"minZoomRatio"
		);
		// if current zoom domain is already smaller than minZoomRatio
		if (currentZoomDomainPeriod / maxZoomDomainPeriod < minZoomRatio) {
			return true;
		}

		return false;
	}

	// check if current zoom domain is already the max zoom domain
	isMaxZoomDomain() {
		// get current zoom domain
		const currentZoomDomain = this.model.get("zoomDomain");
		// assume the max zoom domain is the default zoom bar domain
		const maxZoomDomain = this.getDefaultZoomBarDomain();

		if (
			currentZoomDomain &&
			maxZoomDomain &&
			currentZoomDomain[0].valueOf() === maxZoomDomain[0].valueOf() &&
			currentZoomDomain[1].valueOf() === maxZoomDomain[1].valueOf()
		) {
			return true;
		}

		return false;
	}

	isEmptyState() {
		return this.getZoomBarData().length === 0;
	}

	isZoomBarLoading(position) {
		return Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			position,
			"loading"
		);
	}

	isZoomBarLocked(position) {
		return Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			position,
			"locked"
		);
	}
}
