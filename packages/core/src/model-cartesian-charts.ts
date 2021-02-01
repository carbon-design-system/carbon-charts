// Internal Imports
import { ChartModel } from './model';
import { Tools } from './tools';
import { ScaleTypes, AxisPositions } from './interfaces';

/**
 * This supports adding X and Y Cartesian[2D] zoom data to a ChartModel
 * */
export class ChartModelCartesian extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	setData(newData) {
		let data;
		if (newData) {
			data = super.setData(newData);
			if (
				Tools.getProperty(
					this.getOptions(),
					'zoomBar',
					AxisPositions.TOP,
					'enabled'
				)
			) {
				// get pre-defined zoom bar data
				const definedZoomBarData = Tools.getProperty(
					this.getOptions(),
					'zoomBar',
					AxisPositions.TOP,
					'data'
				);
				// if we have zoom bar data we need to update it as well
				// with pre-defined zoom bar data
				this.setZoomBarData(definedZoomBarData);
			}
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
			sanitizedData &&
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
		return this.get('zoomBarData');
	}

	protected sanitizeDateValues(data) {
		const options = this.getOptions();

		if (!options.axes) {
			return data;
		}

		const keysToCheck = [];
		Object.keys(AxisPositions).forEach((axisPositionKey) => {
			const axisPosition = AxisPositions[axisPositionKey];
			const axisOptions = options.axes[axisPosition];

			if (axisOptions && axisOptions.scaleType === ScaleTypes.TIME) {
				const axisMapsTo = axisOptions.mapsTo;

				if (axisMapsTo !== null || axisMapsTo !== undefined) {
					keysToCheck.push(axisMapsTo);
				}
			}
		});

		if (keysToCheck.length > 0) {
			// Check all datapoints and sanitize dates
			data.forEach((datum) => {
				keysToCheck.forEach((key) => {
					if (Tools.getProperty(datum, key, 'getTime') === null) {
						datum[key] = new Date(datum[key]);
					}
				});
			});
		}

		return data;
	}

	protected sanitize(data) {
		data = super.sanitize(data);
		data = this.sanitizeDateValues(data);

		return data;
	}
}
