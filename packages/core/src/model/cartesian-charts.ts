// Internal Imports
import { ChartModel } from './model';
import { Tools } from '../tools';
import { ScaleTypes, AxisPositions } from '../interfaces';

// date formatting
import { format } from 'date-fns';

/**
 * This supports adding X and Y Cartesian[2D] zoom data to a ChartModel
 * */
export class ChartModelCartesian extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	// get the scales information
	// needed for getTabularArray()
	private assignRangeAndDomains() {
		const { cartesianScales } = this.services;
		const options = this.getOptions();
		const isDualAxes = cartesianScales.isDualAxes();

		const scales = {
			primaryDomain: cartesianScales.domainAxisPosition,
			primaryRange: cartesianScales.rangeAxisPosition,
			secondaryDomain: null,
			secondaryRange: null,
		};
		if (isDualAxes) {
			scales.secondaryDomain =
				cartesianScales.secondaryDomainAxisPosition;
			scales.secondaryRange = cartesianScales.secondaryRangeAxisPosition;
		}

		Object.keys(scales).forEach((scale) => {
			const position = scales[scale];
			if (cartesianScales.scales[position]) {
				scales[scale] = {
					position: position,
					label: cartesianScales.getScaleLabel(position),
					identifier: Tools.getProperty(
						options,
						'axes',
						position,
						'mapsTo'
					),
				};
			} else {
				scales[scale] = null;
			}
		});

		return scales;
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData();
		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const { cartesianScales } = this.services;
		const {
			primaryDomain,
			primaryRange,
			secondaryDomain,
			secondaryRange,
		} = this.assignRangeAndDomains();

		const domainScaleType = cartesianScales.getDomainAxisScaleType();
		let domainValueFormatter;
		if (domainScaleType === ScaleTypes.TIME) {
			domainValueFormatter = (d) => format(d, 'MMM d, yyyy');
		}

		const result = [
			[
				'Group',
				primaryDomain.label,
				primaryRange.label,
				...(secondaryDomain ? [secondaryDomain.label] : []),
				...(secondaryRange ? [secondaryRange.label] : []),
			],
			...displayData.map((datum) => [
				datum[groupMapsTo],
				datum[primaryDomain.identifier] === null
					? '&ndash;'
					: domainValueFormatter
					? domainValueFormatter(datum[primaryDomain.identifier])
					: datum[primaryDomain.identifier],
				datum[primaryRange.identifier] === null ||
				isNaN(datum[primaryRange.identifier])
					? '&ndash;'
					: datum[primaryRange.identifier].toLocaleString(),
				...(secondaryDomain
					? [
							datum[secondaryDomain.identifier] === null
								? '&ndash;'
								: datum[secondaryDomain.identifier],
					  ]
					: []),
				...(secondaryRange
					? [
							datum[secondaryRange.identifier] === null ||
							isNaN(datum[secondaryRange.identifier])
								? '&ndash;'
								: datum[secondaryRange.identifier],
					  ]
					: []),
			]),
		];

		return result;
	}

	exportToCSV() {
		let data = this.getTabularDataArray().map((row) =>
			row.map((column) => `\"${column}\"`)
		);

		let csvString = '',
			csvData = '';
		data.forEach(function (d, i) {
			csvData = d.join(',');
			csvString += i < data.length ? csvData + '\n' : csvData;
		});

		this.services.files.downloadCSV(csvString, 'myChart.csv');
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
