// Internal Imports
import { ColorLegendType, ScaleTypes } from '../interfaces';
import { ChartModelCartesian } from './cartesian-charts';
import { Tools } from '../tools';

// d3 imports
import { extent } from 'd3-array';
import { scaleLinear, scaleQuantize } from 'd3-scale';

/** The gauge chart model layer */
export class HeatmapModel extends ChartModelCartesian {
	private palettes = {
		// Monochromatic palettes
		// White, Purple 10 - 100
		'mono-1': [
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
		// White, Blue 10 - 100
		'mono-2': [
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
		// White, Cyan 10 - 100
		'mono-3': [
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
		// White, Teal 10 - 100
		'mono-4': [
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
		// Red 80 - 10, White, Cyan 10 - 80
		'diverge-1': [
			'#750e13',
			'#a2191f',
			'#da1e28',
			'#fa4d56',
			'#ff8389',
			'#ffb3b8',
			'#ffd7d9',
			'#fff1f1',
			'#ffffff',
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
		'diverge-2': [
			'#491d8b',
			'#6929c4',
			'#8a3ffc',
			'#a56eff',
			'#be95ff',
			'#d4bbff',
			'#e8daff',
			'#f6f2ff',
			'#fff1f1',
			'#ffffff',
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

	private colorScaleType: ColorLegendType = ColorLegendType.LINEAR;
	selectedPalette = [];
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

		// Round extent values to the nearest multiple of 50
		// Axis rounds values to multiples of 2, 5, and 10s.
		limits.forEach((number, index) => {
			let value = Number(number);

			if (index === 0 && value >= 0) {
				value = 0;
			} else if (value % 50 === 0 || value === 0) {
				value;
			} else if (value < 0) {
				value = Math.floor(value / 50) * 50;
			} else {
				value = Math.ceil(value / 50) * 50;
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

	// Uses quantize scale to return class names
	getColorClassName(configs: { value?: number; originalClassName?: string }) {
		if (
			typeof configs.value === 'number' &&
			this.colorScaleType !== ColorLegendType.QUANTIZE
		) {
			return configs.originalClassName;
		}

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

		const colorScaleType = Tools.getProperty(
			options,
			'legend',
			'colorLegend',
			'type'
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

		// Define color scale based on legend
		if (colorScaleType === ColorLegendType.LINEAR) {
			// Uses hardcoded fill on element
			this.colorScaleType = ColorLegendType.LINEAR;

			const colorPairing = customColorsEnabled ? customColors : [];
			let ticks = [];

			// Use only the first, middle, and last color to determine the color gradient
			// since they are the only displayed ticks
			if (!customColorsEnabled) {
				const palette = this.palettes[
					`${colorScheme}-${colorPairingOption}`
				];
				colorPairing.push(palette[0]);
				colorPairing.push(palette[Math.floor(palette.length / 2)]);
				colorPairing.push(palette[palette.length - 1]);
				ticks =
					colorScheme === 'diverge'
						? [domain[0], 0, domain[1]]
						: [domain[0], domain[1] / 2, domain[1]];
			} else {
				ticks = scaleLinear()
					.domain([domain[0], domain[1]])
					.nice()
					.ticks(colorPairing.length);
			}

			// Save scale type
			this.selectedPalette = colorPairing;
			this._colorScale = scaleLinear().domain(ticks).range(colorPairing);
		} else if (colorScaleType === ColorLegendType.QUANTIZE) {
			// Uses css classes for fill
			this.colorScaleType = ColorLegendType.QUANTIZE;

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
			this.selectedPalette = colorPairing;
			this._colorScale = scaleQuantize()
				.domain(this.getValueDomain() as [number, number])
				.range(colorPairing);
		} else {
			throw Error(`Color legend ${colorScaleType} is not supported`);
		}
	}
}
