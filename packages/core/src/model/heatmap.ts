// Internal Imports
import { ScaleTypes } from '../interfaces';
import { ChartModelCartesian } from './cartesian-charts';
import { Tools } from '../tools';

// date formatting
import { format } from 'date-fns';

// d3 imports
import { extent } from 'd3-array';
import { scaleLinear, scaleQuantize } from 'd3-scale';

/** The gauge chart model layer */
export class HeatmapModel extends ChartModelCartesian {
	private palettes = {
		// Monochromatic palettes
		// Purple 10 - 100 (Includes white)
		purple: [
			'#ffffff',
			'#f6f2ff',
			'#e8daff',
			'#d4bbff',
			'#be95ff',
			'#a56eff',
			'#8a3ffc',
			'#6929c4',
			'#491d8b',
			'#31135e',
			'#1c0f30',
		],
		// Blue 10 - 100 (Includes white)
		blue: [
			'#ffffff',
			'#edf5ff',
			'#d0e2ff',
			'#a6c8ff',
			'#78a9ff',
			'#4589ff',
			'#0f62fe',
			'#0043ce',
			'#002d9c',
			'#001d6c',
			'#001141',
		],
		// Cyan 10 - 100 (Includes white)
		cyan: [
			'#ffffff',
			'#e5f6ff',
			'#bae6ff',
			'#82cfff',
			'#33b1ff',
			'#1192e8',
			'#0072c3',
			'#00539a',
			'#003a6d',
			'#012749',
			'#1c0f30',
		],
		// Teal 10 - 100 (includes white)
		teal: [
			'#ffffff',
			'#d9fbfb',
			'#9ef0f0',
			'#3ddbd9',
			'#08bdba',
			'#009d9a',
			'#007d79',
			'#005d5d',
			'#004144',
			'#022b30',
			'#081a1c',
		],
		// Diverging palettes
		// Red 80 - 10, Cyan 10 - 80
		'red-cyan': [
			'#750e13',
			'#a2191f',
			'#da1e28',
			'#fa4d56',
			'#ff8389',
			'#ffb3b8',
			'#ffd7d9',
			'#fff1f1',
			'#e5f6ff',
			'#bae6ff',
			'#82cfff',
			'#33b1ff',
			'#1192e8',
			'#0072c3',
			'#00539a',
			'#003a6d',
		],
		// Purple 80 - 10, Teal 10 - 80
		'purple-teal': [
			'#491d8b',
			'#6929c4',
			'#8a3ffc',
			'#a56eff',
			'#be95ff',
			'#d4bbff',
			'#e8daff',
			'#f6f2ff',
			'#d9fbfb',
			'#9ef0f0',
			'#3ddbd9',
			'#08bdba',
			'#009d9a',
			'#007d79',
			'#005d5d',
			'#004144',
		],
	};

	// Will hold linearScale used in tick creation & colors
	private _linearScale: any = undefined;
	private _colorScale: any = undefined;

	// List of unique ranges and domains
	private _domains = [];
	private _range = [];

	private _matrix = {};

	constructor(services: any) {
		super(services);
	}

	getLinearScale() {
		if (!this._linearScale) {
			this._linearScale = scaleLinear()
				.domain(this.getValueDomain())
				.range([0, 75]);
		}

		return this._linearScale;
	}

	/**
	 * Get min and maximum value of the display data
	 * @returns Array consisting of smallest and largest values in  data
	 */
	getValueDomain() {
		const data = this.getDisplayData().map((element) => element.value);
		const limits = extent(data);
		const domain = [];

		// Round extent values to the nearest 10th values since axis rounds values to multiples of 2, 5, and 10s.
		limits.forEach((number) => {
			let value = Number(number);

			if (value % 10 === 0 || value === 0) {
				value;
			} else if (value < 0) {
				value = Math.floor(value / 10) * 10;
			} else {
				value = Math.ceil(value / 10) * 10;
			}

			domain.push(value);
		});

		const options = this.getOptions();
		if (
			Tools.getProperty(options, 'legend', 'colorLegend', 'type') ===
			'linear'
		) {
			return domain;
		}

		/**
		 * @todo
		 * Clean this up!
		 */
		return domain.length !== 2 ? [0, 1] : [0, 100];
	}

	/**
	 *
	 * @param value
	 * @returns
	 */
	getFillColor(value: number) {
		if (!this._colorScale) {
			this.getColorScale();
		}

		return this._colorScale(value);
	}

	/**
	 * Returns linear color scale
	 * @returns Scale
	 */
	getColorScale() {
		if (!this._colorScale) {
			this._colorScale = scaleQuantize()
				.domain(this.getValueDomain() as [number, number])
				// scaleLinear()
				// 	.domain(this.getTicks())
				.range(this.getPalettes());
		}

		return this._colorScale;
	}

	/**
	 * Generate a list of all unique domains
	 * @returns String[]
	 */
	getUniqueDomain(): string[] {
		if (Tools.isEmpty(this._domains)) {
			const displayData = this.getDisplayData();
			const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

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
		if (Tools.isEmpty(this._range)) {
			const displayData = this.getDisplayData();
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

			// Get unique axis values & create a matrix
			this._range = Array.from(
				new Set(
					displayData.map((d) => {
						return d[rangeIdentifier];
					})
				)
			);
		}

		return this._range;
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
		/**
		 * @todo
		 * - Multiply uniqueDomain.length by uniqueRange.length to get total possible values
		 * - If displayData().length matches array multiple, return displayData to improve performance
		 */

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
	 * Generate ticks to display based on available colors in list
	 * @returns Array<number>
	 */
	getTicks() {
		const extent = this.getValueDomain();
		const colors = this.getPalettes().length;
		return scaleLinear()
			.domain([extent[0], extent[1]])
			.nice()
			.ticks(colors);
	}

	/**
	 * Generate tabular data from display data
	 * @returns Array<Object>
	 */
	getTabularDataArray() {
		const displayData = this.getDisplayData();

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
				primaryDomain.label,
				primaryRange.label,
				...(secondaryDomain ? [secondaryDomain.label] : []),
				...(secondaryRange ? [secondaryRange.label] : []),
				'Value',
			],
			...displayData.map((datum) => [
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
				datum['value'],
			]),
		];

		return result;
	}

	/**
	 * Returns colors
	 * @returns Array<string>
	 */
	getPalettes() {
		const type = Tools.getProperty(
			this.getOptions(),
			'heatmap',
			'colorPalette',
			'type'
		);

		const customColorPalette = Tools.getProperty(
			this.getOptions(),
			'heatmap',
			'colorPalette',
			'colorCodes'
		);

		// If user pass in custom colors, use custom colors
		if (customColorPalette?.length) {
			return customColorPalette;
		}

		// If domain consists of negative and positive values, use diverging palettes
		const domain = this.getValueDomain();
		if (domain[0] < 0 && domain[1] > 0) {
			// If type is not set to available options, use default
			if (type !== 'red-cyan' && type !== 'purple-teal') {
				return this.palettes['red-cyan'];
			}
		}

		// Check if value exists, if it doesn't use default
		if (!type || !this.palettes[type]) {
			return this.palettes['purple'];
		}

		return this.palettes[type];
	}
}
