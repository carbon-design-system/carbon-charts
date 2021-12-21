// Internal Imports
import { AxisFlavor, ScaleTypes } from '../interfaces';
import { ChartModelCartesian } from './cartesian-charts';
import { Tools } from '../tools';

// d3 imports
import { extent } from 'd3-array';
import { scaleQuantize } from 'd3-scale';

/** The gauge chart model layer */
export class HeatmapModel extends ChartModelCartesian {
	protected axisFlavor = AxisFlavor.HOVER;
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
	 * Get min and maximum value of the display data
	 * @returns Array consisting of smallest and largest values in  data
	 */
	getValueDomain() {
		const data = this.getDisplayData().map((element) => element.value);
		const limits = extent(data);
		const domain = [];

		// Round extent values to the nearest multiple of 10
		// Axis rounds values to multiples of 2, 5, and 10s.
		limits.forEach((number, index) => {
			let value = Number(number);

			if (index === 0 && value >= 0) {
				value = 0;
			} else if (value % 10 === 0 || value === 0) {
				value;
			} else if (value < 0) {
				value = Math.floor(value / 10) * 10;
			} else {
				value = Math.ceil(value / 10) * 10;
			}

			domain.push(value);
		});

		// Ensure the median of the range is 0
		if (domain[0] < 0 && domain[1] > 0) {
			if (Math.abs(domain[0]) > domain[1]) {
				domain[1] = Math.abs(domain[0]);
			} else {
				domain[0] = -domain[1];
			}
		}

		return domain;
	}

	/**
	 * @override
	 * @param value
	 * @returns
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

			// Create matrix (domain by range) and initalize it's values to null
			uniqueDomain.forEach((dom: any) => {
				const range = {};
				// Data will be set to null by default, to signify 'missing'
				uniqueRange.forEach((element: any) => {
					range[element] = {
						value: null,
						index: -1,
					};
				});
				this._matrix[dom] = range;
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

		const {
			primaryDomain,
			primaryRange,
			secondaryDomain,
			secondaryRange,
		} = this.assignRangeAndDomains();

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
		const options = this.getOptions();

		const customColors = Tools.getProperty(
			options,
			'color',
			'gradient',
			'colors'
		);
		const customColorsEnabled = !Tools.isEmpty(customColors);

		let colorPairingOption = Tools.getProperty(
			options,
			'color',
			'pairing',
			'option'
		);

		// If domain consists of negative and positive values, use diverging palettes
		const domain = this.getValueDomain();
		const colorScheme = domain[0] < 0 && domain[1] > 0 ? 'diverge' : 'mono';

		// Use default color pairing options if not in defined range
		if (
			colorPairingOption < 1 &&
			colorPairingOption > 4 &&
			colorScheme === 'mono'
		) {
			colorPairingOption = 1;
		} else if (
			colorPairingOption < 1 &&
			colorPairingOption > 2 &&
			colorScheme === 'diverge'
		) {
			colorPairingOption = 1;
		}

		// Uses css classes for fill
		const colorPairing = customColorsEnabled ? customColors : [];

		if (!customColorsEnabled) {
			// Add class names to list and the amount based on the color scheme
			// Carbon charts has 11 colors for a single monochromatic palette & 17 for a divergent palette
			const colorGroupingLength = colorScheme === 'diverge' ? 17 : 11;
			for (let i = 1; i < colorGroupingLength + 1; i++) {
				colorPairing.push(
					`fill-${colorScheme}-${colorPairingOption}-${i}`
				);
			}
		}

		// Save scale type
		this._colorScale = scaleQuantize()
			.domain(this.getValueDomain() as [number, number])
			.range(colorPairing);
	}
}
