// Internal Imports
import * as Configuration from "../configuration";
import { Service } from "./service";
import { AxisPositions, CartesianOrientations, ScaleTypes, AxesOptions } from "../interfaces";
import { Tools } from "../tools";

// D3 Imports
import {
	scaleBand,
	scaleLinear,
	scaleTime,
	scaleLog
} from "d3-scale";
import { min, extent, merge, sum } from "d3-array";
import { map, values } from "d3-collection";
import { timeFormatDefaultLocale } from "d3-time-format";
import englishLocale from "d3-time-format/locale/en-US.json";

// Misc
import {
	differenceInYears,
	addYears,
	subYears,
	differenceInMonths,
	addMonths,
	subMonths,
	differenceInDays,
	addDays,
	subDays,
	differenceInHours,
	addHours,
	subHours,
	differenceInMinutes,
	addMinutes,
	subMinutes
} from "date-fns";

function addPaddingInDomain([lower, upper]: number[], paddingRatio: number) {
	const domainLength = upper - lower;
	const padding = domainLength * paddingRatio;

	// If padding crosses 0, keep 0 as new upper bound
	const newUpper = upper <= 0 && upper + padding > 0 ? 0 : upper + padding;
	// If padding crosses 0, keep 0 as new lower bound
	const newLower = lower >= 0 && lower - padding < 0 ? 0 : lower - padding;

	return [newLower, newUpper];
}

export class CartesianScales extends Service {
	protected scaleTypes = {
		top: null,
		right: null,
		bottom: null,
		left: null
	};

	protected scales = {
		top: null,
		right: null,
		bottom: null,
		left: null
	};

	protected domainAxisPosition: AxisPositions;
	protected rangeAxisPosition: AxisPositions;

	protected orientation: CartesianOrientations;

	getDomainAxisPosition() {
		return this.domainAxisPosition;
	}

	getRangeAxisPosition() {
		return this.rangeAxisPosition;
	}

	setDefaultAxes() {
		const axesOptions = Tools.getProperty(this.model.getOptions(), "axes");
		if (!axesOptions) {
			(this.model.getOptions().axes as AxesOptions) = {
				left: {
					primary: true,
					includeZero: true,
				},
				bottom: {
					secondary: true,
					includeZero: true,
					scaleType: this.model.getDisplayData().labels ? ScaleTypes.LABELS : undefined
				}
			};
		}
	}

	update(animate = true) {
		this.setDefaultAxes();
		this.findDomainAndRangeAxes();
		this.determineOrientation();
		const axisPositions = Object.keys(AxisPositions).map(axisPositionKey => AxisPositions[axisPositionKey]);
		axisPositions.forEach(axisPosition => {
			this.scales[axisPosition] = this.createScale(axisPosition);
		});
	}

	protected findMainVerticalAxisPosition() {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes");

		// If right axis has been specified as `main`
		if (Tools.getProperty(axisOptions, "axes", AxisPositions.RIGHT, "main") === true) {
			return AxisPositions.RIGHT;
		}

		return AxisPositions.LEFT;
	}

	protected findMainHorizontalAxisPosition() {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes");

		// If top axis has been specified as `main`
		if (Tools.getProperty(axisOptions, "axes", AxisPositions.TOP, "main") === true) {
			return AxisPositions.TOP;
		}

		return AxisPositions.BOTTOM;
	}

	protected findDomainAndRangeAxesPositions(mainVerticalAxisPosition: AxisPositions, mainHorizontalAxisPosition: AxisPositions) {
		const options = this.model.getOptions();

		const mainVerticalAxisOptions = Tools.getProperty(options, "axes", mainVerticalAxisPosition);
		const mainHorizontalAxisOptions = Tools.getProperty(options, "axes", mainHorizontalAxisPosition);

		const mainVerticalScaleType = mainVerticalAxisOptions.scaleType || ScaleTypes.LINEAR;
		const mainHorizontalScaleType = mainHorizontalAxisOptions.scaleType || ScaleTypes.LINEAR;

		const result = {
			domainAxisPosition: null,
			rangeAxisPosition: null
		};
		if (mainHorizontalScaleType === ScaleTypes.LABELS || mainHorizontalScaleType === ScaleTypes.TIME) {
			result.domainAxisPosition = mainHorizontalAxisPosition;
			result.rangeAxisPosition = mainVerticalAxisPosition;
		} else if (mainVerticalScaleType === ScaleTypes.LABELS || mainVerticalScaleType === ScaleTypes.TIME) {
			result.domainAxisPosition = mainVerticalAxisPosition;
			result.rangeAxisPosition = mainHorizontalAxisPosition;
		} else {
			result.domainAxisPosition = mainHorizontalAxisPosition;
			result.rangeAxisPosition = mainVerticalAxisPosition;
		}

		return result;
	}

	findDomainAndRangeAxes() {
		// find main axes between (left & right) && (bottom & top)
		const mainVerticalAxisPosition = this.findMainVerticalAxisPosition();
		const mainHorizontalAxisPosition = this.findMainHorizontalAxisPosition();

		// Now we have horizontal & vertical main axes to choose domain & range axes from
		const domainAndRangeAxesPositions = this.findDomainAndRangeAxesPositions(mainVerticalAxisPosition, mainHorizontalAxisPosition);

		this.domainAxisPosition = domainAndRangeAxesPositions.domainAxisPosition;
		this.rangeAxisPosition = domainAndRangeAxesPositions.rangeAxisPosition;
	}

	determineOrientation() {
		if (this.rangeAxisPosition === AxisPositions.LEFT && this.domainAxisPosition === AxisPositions.BOTTOM) {
			this.orientation = CartesianOrientations.VERTICAL;
		} else {
			this.orientation = CartesianOrientations.HORIZONTAL;
		}
	}

	getOrientation() {
		return this.orientation;
	}

	getScaleByPosition(axisPosition: AxisPositions) {
		return this.scales[axisPosition];
	}

	getScaleTypeByPosition(axisPosition: AxisPositions) {
		return this.scaleTypes[axisPosition];
	}

	getDomainScale() {
		return this.scales[this.domainAxisPosition];
	}

	getRangeScale() {
		return this.scales[this.rangeAxisPosition];
	}

	// Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainXAxisPosition() {
		const possibleXAxisPositions = [AxisPositions.BOTTOM, AxisPositions.TOP];

		return [this.domainAxisPosition, this.rangeAxisPosition]
			.find(position => possibleXAxisPositions.indexOf(position) > -1);
	}

	// Find the main y-axis out of the 2 y-axis on the chart (when 2D axis is used)
	getMainYAxisPosition() {
		const possibleYAxisPositions = [AxisPositions.LEFT, AxisPositions.RIGHT];

		return [this.domainAxisPosition, this.rangeAxisPosition]
			.find(position => possibleYAxisPositions.indexOf(position) > -1);
	}

	getMainXScale() {
		return this.scales[this.getMainXAxisPosition()];
	}

	getMainYScale() {
		return this.scales[this.getMainYAxisPosition()];
	}

	getValueFromScale(axisPosition: AxisPositions, datum: any, index?: number) {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);

		const scaleType = this.scaleTypes[axisPosition];
		const scale = this.scales[axisPosition];

		const { identifier } = axisOptions;
		const value = datum[identifier] !== undefined ? datum[identifier] : datum;

		if (scaleType === ScaleTypes.LABELS) {
			return scale(value) + scale.step() / 2;
		}

		if (scaleType === ScaleTypes.TIME) {
			return scale(new Date(value));
		}

		return scale(value);
	}

	getDomainValue(d, i) {
		return this.getValueFromScale(this.domainAxisPosition, d, i);
	}

	getRangeValue(d, i) {
		return this.getValueFromScale(this.rangeAxisPosition, d, i);
	}

	getDomainIdentifier() {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", this.domainAxisPosition);

		return axisOptions.identifier;
	}

	getRangeIdentifier() {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", this.rangeAxisPosition);

		return axisOptions.identifier;
	}

	/** Uses the primary Y Axis to get data items associated with that value. */
	getDataFromDomain(domainValue) {
		const displayData = this.model.getDisplayData();
		const domainIdentifier = this.getDomainIdentifier();
		const scaleType = this.scaleTypes[this.domainAxisPosition];

		if (scaleType === ScaleTypes.TIME) {
			return displayData.filter(datum => {
				return datum[domainIdentifier].getTime() === domainValue.getTime();
			});
		}

		return displayData.filter(datum => {
			return datum[domainIdentifier] === domainValue;
		});
	}

	protected getScaleDomain(axisPosition: AxisPositions) {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);
		const { includeZero } = axisOptions;
		const scaleType = Tools.getProperty(axisOptions, "scaleType") || ScaleTypes.LINEAR;

		const displayData = this.model.getDisplayData();
		const { identifier } = axisOptions;

		// If domain is specified return that domain
		if (axisOptions.domain) {
			return axisOptions.domain;
		}

		// If scale is a LABELS scale, return some labels as the domain
		if (axisOptions && axisOptions.scaleType === ScaleTypes.LABELS) {
			// Get unique values
			return map(displayData, d => d[identifier]).keys();
		}


		// Get the extent of the domain
		let domain;
		let allDataValues;
		// If the scale is stacked
		if (axisOptions.stacked) {
			const dataValuesGroupedByKeys = this.model.getDataValuesGroupedByKeys();
			allDataValues = dataValuesGroupedByKeys.map(dataValues => {
				return sum(
					values(dataValues) as any
				);
			});
		} else {
			allDataValues = displayData.map(datum => datum[identifier]);
		}

		if (axisOptions.scaleType !== ScaleTypes.TIME && includeZero) {
			allDataValues.push(0);
		}

		domain = extent(allDataValues);
		domain = addPaddingInDomain(domain, Configuration.axis.paddingRatio);
		if (scaleType === ScaleTypes.TIME) {
			domain = domain.map(d => new Date(d));
		}

		return domain;
	}

	protected createScale(axisPosition: AxisPositions) {
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);

		if (!axisOptions) {
			return null;
		}

		const scaleType = Tools.getProperty(axisOptions, "scaleType") || ScaleTypes.LINEAR;
		this.scaleTypes[axisPosition] = scaleType;

		// Set the date/time locale
		if (scaleType === ScaleTypes.TIME) {
			const timeLocale = Tools.getProperty(options, "locale", "time") || englishLocale;

			timeFormatDefaultLocale(timeLocale);
		}

		let scale;
		if (scaleType === ScaleTypes.TIME) {
			scale = scaleTime();
		} else if (scaleType === ScaleTypes.LOG) {
			scale = scaleLog().base(axisOptions.base || 10);
		} else if (scaleType === ScaleTypes.LABELS) {
			scale = scaleBand();
		} else {
			scale = scaleLinear();
		}

		scale.domain(this.getScaleDomain(axisPosition));
		return scale;
	}
}
