import { extent, scaleQuantize, scaleLinear } from 'd3'
import { cloneDeep, isEmpty } from 'lodash-es'
import { getProperty } from '@/tools'
import { AxisFlavor, ScaleTypes } from '@/interfaces/enums'
import { getColorScale } from '@/services'
import { ChartModelCartesian } from './cartesian-charts'

/** The gauge chart model layer */
export class HeatmapModel extends ChartModelCartesian {
	axisFlavor = AxisFlavor.HOVERABLE
	private _colorScale: any = undefined

	// List of unique ranges and domains
	private _domains: any[] = []
	private _ranges: any[] = []

	private _matrix: any = {}

	constructor(services: any) {
		super(services)

		// Check which scale types are being used
		const axis = getProperty(this.getOptions(), 'axes')

		// Need to check options since scale service hasn't been instantiated
		if (
			(!!getProperty(axis, 'left', 'scaleType') &&
				getProperty(axis, 'left', 'scaleType') !== ScaleTypes.LABELS) ||
			(!!getProperty(axis, 'right', 'scaleType') &&
				getProperty(axis, 'right', 'scaleType') !== ScaleTypes.LABELS) ||
			(!!getProperty(axis, 'top', 'scaleType') &&
				getProperty(axis, 'top', 'scaleType') !== ScaleTypes.LABELS) ||
			(!!getProperty(axis, 'bottom', 'scaleType') &&
				getProperty(axis, 'bottom', 'scaleType') !== ScaleTypes.LABELS)
		) {
			throw Error('Heatmap only supports label scaletypes.')
		}
	}

	/**
	 * Get min and maximum value of the display data
	 * @returns Array consisting of smallest and largest values in  data
	 */
	getValueDomain() {
		const limits = extent(this.getDisplayData(), (d: any) => d.value)
		const domain = scaleLinear()
			.domain(limits as [number, number])
			.nice()
			.domain()

		// Ensuring limits start at 0 to make scale look more `nicer`
		if (domain[0] > 0) {
			domain[0] = 0
		} else if (domain[0] === 0 && domain[1] === 0) {
			// Range cannot be between 0 and 0 (itself)
			return [0, 1]
		}

		// Ensure the median of the range is 0 if domain extends into both negative & positive
		if (domain[0] < 0 && domain[1] > 0) {
			if (Math.abs(domain[0]) > domain[1]) {
				domain[1] = Math.abs(domain[0])
			} else {
				domain[0] = -domain[1]
			}
		}

		return domain
	}

	/**
	 * @override
	 * @param value
	 * @returns string
	 */
	getFillColor(value: number) {
		return this._colorScale(value)
	}

	/**
	 * Generate a list of all unique domains
	 * @returns String[]
	 */
	getUniqueDomain(): string[] {
		if (isEmpty(this._domains)) {
			const displayData = this.getDisplayData()
			const { cartesianScales } = this.services

			const domainIdentifier = cartesianScales.getDomainIdentifier()
			const mainXAxisPosition = cartesianScales.getMainXAxisPosition()
			const customDomain = cartesianScales.getCustomDomainValuesByposition(mainXAxisPosition)

			// Use user defined domain if specified
			if (customDomain) {
				return customDomain
			}

			// Get unique axis values & create a matrix
			this._domains = Array.from(
				new Set(
					displayData.map((d: any) => {
						return d[domainIdentifier]
					})
				)
			)
		}

		return this._domains
	}

	/**
	 * Generates a list of all unique ranges
	 * @returns String[]
	 */
	getUniqueRanges(): string[] {
		if (isEmpty(this._ranges)) {
			const displayData = this.getDisplayData()
			const { cartesianScales } = this.services

			const rangeIdentifier = cartesianScales.getRangeIdentifier()
			const mainYAxisPosition = cartesianScales.getMainYAxisPosition()
			const customDomain = cartesianScales.getCustomDomainValuesByposition(mainYAxisPosition)

			// Use user defined domain if specified
			if (customDomain) {
				return customDomain
			}

			// Get unique axis values & create a matrix
			this._ranges = Array.from(
				new Set(
					displayData.map((d: any) => {
						return d[rangeIdentifier]
					})
				)
			)
		}

		return this._ranges
	}

	/**
	 * Generates a matrix (If doesn't exist) and returns it
	 * @returns Object
	 */
	getMatrix() {
		if (isEmpty(this._matrix)) {
			const uniqueDomain = this.getUniqueDomain()
			const uniqueRange = this.getUniqueRanges()

			const domainIdentifier = this.services.cartesianScales.getDomainIdentifier()
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()

			// Create a column
			const range: any = {}
			uniqueRange.forEach((ran: any) => {
				// Initialize matrix to empty state
				range[ran] = {
					value: null,
					index: -1
				}
			})

			// Complete the matrix by cloning the column to all domains
			uniqueDomain.forEach((dom: any) => {
				this._matrix[dom] = cloneDeep(range)
			})

			// Fill in user passed data
			this.getDisplayData().forEach((d: any, i: number) => {
				this._matrix[d[domainIdentifier]][d[rangeIdentifier]] = {
					value: d['value'],
					index: i
				}
			})
		}

		return this._matrix
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 */
	setData(newData: any) {
		const sanitizedData = this.sanitize(cloneDeep(newData))
		const dataGroups = this.generateDataGroups(sanitizedData)

		this.set({
			data: sanitizedData,
			dataGroups
		})

		// Set attributes to empty
		this._domains = []
		this._ranges = []
		this._matrix = {}

		return sanitizedData
	}

	/**
	 * Converts Object matrix into a single array
	 * @returns object[]
	 */
	getMatrixAsArray(): object[] {
		if (isEmpty(this._matrix)) {
			this.getMatrix()
		}

		const uniqueDomain = this.getUniqueDomain()
		const uniqueRange = this.getUniqueRanges()

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier()
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()

		const arr: any[] = []
		uniqueDomain.forEach(domain => {
			uniqueRange.forEach(range => {
				const element: any = {
					value: this._matrix[domain][range].value,
					index: this._matrix[domain][range].index
				}
				element[domainIdentifier] = domain
				element[rangeIdentifier] = range
				arr.push(element)
			})
		})

		return arr
	}

	/**
	 * Generate tabular data from display data
	 * @returns Array<Object>
	 */
	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const { primaryDomain, primaryRange } = this.assignRangeAndDomains()
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')
		let domainValueFormatter: any

		const headers = [primaryDomain.label, primaryRange.label, 'Value']
		const cells = [
			...displayData.map((datum: any) => [
				datum[primaryDomain.identifier] === null
					? '&ndash;'
					: domainValueFormatter
						? domainValueFormatter(datum[primaryDomain.identifier])
						: datum[primaryDomain.identifier],

				datum[primaryRange.identifier] === null ? '&ndash;' : datum[primaryRange.identifier],
				numberFormatter(datum['value'], localeCode)
			])
		]

		return super.formatTable({ headers, cells })
	}

	// Uses quantize scale to return class names
	getColorClassName(configs: { value?: number; originalClassName?: string }) {
		return `${configs.originalClassName} ${this._colorScale(configs.value as number)}`
	}

	protected setColorClassNames() {
		const options = this.getOptions()

		const customColors = getProperty(options, 'color', 'gradient', 'colors')
		const customColorsEnabled = !isEmpty(customColors)

		let colorPairingOption = getProperty(options, 'color', 'pairing', 'option')

		// If domain consists of negative and positive values, use diverging palettes
		const domain = this.getValueDomain()
		const colorScheme = domain[0] < 0 && domain[1] > 0 ? 'diverge' : 'mono'

		// Use default color pairing options if not in defined range
		if (colorPairingOption < 1 && colorPairingOption > 4 && colorScheme === 'mono') {
			colorPairingOption = 1
		} else if (colorPairingOption < 1 && colorPairingOption > 2 && colorScheme === 'diverge') {
			colorPairingOption = 1
		}

		// Uses css classes for fill
		const colorPairing = customColorsEnabled ? customColors : []

		if (!customColorsEnabled) {
			// Add class names to list and the amount based on the color scheme
			// Carbon charts has 11 colors for a single monochromatic palette & 17 for a divergent palette
			const colorGroupingLength = colorScheme === 'diverge' ? 17 : 11
			for (let i = 1; i < colorGroupingLength + 1; i++) {
				colorPairing.push(`fill-${colorScheme}-${colorPairingOption}-${i}`)
			}
		}

		// Save scale type
		this._colorScale = scaleQuantize()
			.domain(domain as [number, number])
			.range(colorPairing)
		const colorOptions = getProperty(this.getOptions(), 'color')
		this._colorScale = getColorScale(this.getDisplayData(), colorOptions)
	}
}
