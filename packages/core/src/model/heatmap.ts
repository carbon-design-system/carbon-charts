// Internal Imports
import { AxisFlavor, ScaleTypes } from '../interfaces';
import { ChartModelCartesian } from './cartesian-charts';
import { getColorScale } from '../services';
import * as Tools from '../tools';

/** The gauge chart model layer */
export class HeatmapModel extends ChartModelCartesian {
	protected axisFlavor = AxisFlavor.HOVERABLE;
	private _colorScale: any = undefined;

	// List of unique ranges and domains
	private _domains = [];
	private _ranges = [];

	private _matrix = {};

	constructor(services: any) {
		super(services);

		// Check which scale types are being used
		const axis = Tools.getProperty(this.getOptions(), 'axes');

		// Need to check options since scale service hasn't been instantiated
		if (
			(!!Tools.getProperty(axis, 'left', 'scaleType') &&
				Tools.getProperty(axis, 'left', 'scaleType') !==
					ScaleTypes.LABELS) ||
			(!!Tools.getProperty(axis, 'right', 'scaleType') &&
				Tools.getProperty(axis, 'right', 'scaleType') !==
					ScaleTypes.LABELS) ||
			(!!Tools.getProperty(axis, 'top', 'scaleType') &&
				Tools.getProperty(axis, 'top', 'scaleType') !==
					ScaleTypes.LABELS) ||
			(!!Tools.getProperty(axis, 'bottom', 'scaleType') &&
				Tools.getProperty(axis, 'bottom', 'scaleType') !==
					ScaleTypes.LABELS)
		) {
			throw Error('Heatmap only supports label scaletypes.');
		}
	}

	/**
	 * @override
	 * @param value
	 * @returns string
	 */
	getFillColor(value: number) {
		return this._colorScale(value);
	}

	/**
	 * Generate a list of all unique domains
	 * @returns String[]
	 */
	getUniqueDomain(): string[] {
		if (Tools.isEmpty(this._domains)) {
			const displayData = this.getDisplayData();
			const { cartesianScales } = this.services;

			const domainIdentifier = cartesianScales.getDomainIdentifier();
			const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
			const customDomain = cartesianScales.getCustomDomainValuesByposition(
				mainXAxisPosition
			);

			// Use user defined domain if specified
			if (!!customDomain) {
				return customDomain;
			}

			// Get unique axis values & create a matrix
			this._domains = Array.from(
				new Set(
					displayData.map((d) => {
						return d[domainIdentifier];
					})
				)
			);
		}

		return this._domains;
	}

	/**
	 * Generates a list of all unique ranges
	 * @returns String[]
	 */
	getUniqueRanges(): string[] {
		if (Tools.isEmpty(this._ranges)) {
			const displayData = this.getDisplayData();
			const { cartesianScales } = this.services;

			const rangeIdentifier = cartesianScales.getRangeIdentifier();
			const mainYAxisPosition = cartesianScales.getMainYAxisPosition();
			const customDomain = cartesianScales.getCustomDomainValuesByposition(
				mainYAxisPosition
			);

			// Use user defined domain if specified
			if (!!customDomain) {
				return customDomain;
			}

			// Get unique axis values & create a matrix
			this._ranges = Array.from(
				new Set(
					displayData.map((d) => {
						return d[rangeIdentifier];
					})
				)
			);
		}

		return this._ranges;
	}

	/**
	 * Generates a matrix (If doesn't exist) and returns it
	 * @returns Object
	 */
	getMatrix() {
		if (Tools.isEmpty(this._matrix)) {
			const uniqueDomain = this.getUniqueDomain();
			const uniqueRange = this.getUniqueRanges();

			const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

			// Create a column
			const range = {};
			uniqueRange.forEach((ran: any) => {
				// Initialize matrix to empty state
				range[ran] = {
					value: null,
					index: -1,
				};
			});

			// Complete the matrix by cloning the column to all domains
			uniqueDomain.forEach((dom: any) => {
				this._matrix[dom] = Tools.clone(range);
			});

			// Fill in user passed data
			this.getDisplayData().forEach((d, i) => {
				this._matrix[d[domainIdentifier]][d[rangeIdentifier]] = {
					value: d['value'],
					index: i,
				};
			});
		}

		return this._matrix;
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 */
	setData(newData) {
		const sanitizedData = this.sanitize(Tools.clone(newData));
		const dataGroups = this.generateDataGroups(sanitizedData);

		this.set({
			data: sanitizedData,
			dataGroups,
		});

		// Set attributes to empty
		this._domains = [];
		this._ranges = [];
		this._matrix = {};

		return sanitizedData;
	}

	/**
	 * Converts Object matrix into a single array
	 * @returns Object[]
	 */
	getMatrixAsArray(): Object[] {
		if (Tools.isEmpty(this._matrix)) {
			this.getMatrix();
		}

		const uniqueDomain = this.getUniqueDomain();
		const uniqueRange = this.getUniqueRanges();

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		const arr = [];
		uniqueDomain.forEach((domain) => {
			uniqueRange.forEach((range) => {
				const element = {
					value: this._matrix[domain][range].value,
					index: this._matrix[domain][range].index,
				};
				element[domainIdentifier] = domain;
				element[rangeIdentifier] = range;
				arr.push(element);
			});
		});

		return arr;
	}

	/**
	 * Generate tabular data from display data
	 * @returns Array<Object>
	 */
	getTabularDataArray() {
		const displayData = this.getDisplayData();

		const { primaryDomain, primaryRange } = this.assignRangeAndDomains();

		let domainValueFormatter;

		const result = [
			[primaryDomain.label, primaryRange.label, 'Value'],
			...displayData.map((datum) => [
				datum[primaryDomain.identifier] === null
					? '&ndash;'
					: domainValueFormatter
					? domainValueFormatter(datum[primaryDomain.identifier])
					: datum[primaryDomain.identifier],
				datum[primaryRange.identifier] === null
					? '&ndash;'
					: datum[primaryRange.identifier].toLocaleString(),
				datum['value'],
			]),
		];

		return result;
	}

	// Uses quantize scale to return class names
	getColorClassName(configs: { value?: number; originalClassName?: string }) {
		return `${configs.originalClassName} ${this._colorScale(
			configs.value as number
		)}`;
	}

	protected setColorClassNames() {
		const colorOptions = Tools.getProperty(this.getOptions(), 'color');
		this._colorScale = getColorScale(this.getDisplayData(), colorOptions);
	}
}
