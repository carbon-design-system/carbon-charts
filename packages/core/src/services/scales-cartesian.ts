import { extent, max, scaleBand, scaleLinear, scaleTime, scaleLog, type ScaleTime, type ScaleBand, type ScaleLinear } from 'd3'
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
	subMinutes,
	differenceInSeconds,
	subSeconds,
	addSeconds
} from 'date-fns'
import { flatten, getProperty, removeArrayDuplicates } from '@/tools'
import { axis } from '@/configuration'
import { Service } from './service'
import { AxisPositions, CartesianOrientations, ScaleTypes } from '@/interfaces/enums'
import { ThresholdOptions } from '@/interfaces/components'

type ScaleFunction = ScaleTime<number, number, never> | ScaleBand<string> | ScaleLinear<number, number, never>

export class CartesianScales extends Service {
	protected scaleTypes = {
		top: null as ScaleTypes,
		right: null as ScaleTypes,
		bottom: null as ScaleTypes,
		left: null as ScaleTypes
	}

	protected scales = { // null or function
		top: null as ScaleLinear<number, number, never>,
		right: null as ScaleLinear<number, number, never>,
		bottom: null as ScaleLinear<number, number, never>,
		left: null as ScaleLinear<number, number, never>
	}

	protected domainAxisPosition: AxisPositions
	protected rangeAxisPosition: AxisPositions
	protected secondaryDomainAxisPosition: AxisPositions
	protected secondaryRangeAxisPosition: AxisPositions

	protected dualAxes: boolean

	protected orientation: CartesianOrientations

	getDomainAxisPosition({ datum = null }: { datum?: any } = {}) {
		if (this.dualAxes && datum) {
			const options = this.model.getOptions()
			const { groupMapsTo } = options.data
			const axesOptions = getProperty(options, 'axes', this.secondaryDomainAxisPosition)
			const dataset = datum[groupMapsTo]
			if (
				axesOptions?.correspondingDatasets &&
				axesOptions.correspondingDatasets.includes(dataset)
			) {
				return this.secondaryDomainAxisPosition
			}
		}
		return this.domainAxisPosition
	}

	getRangeAxisPosition({ datum = null, groups = null }: { datum?: any, groups?: any } = {}) {
		if (this.dualAxes) {
			const options = this.model.getOptions()
			const { groupMapsTo } = options.data
			const axisOptions = getProperty(options, 'axes', this.secondaryRangeAxisPosition)
			let dataset
			if (datum !== null) {
				dataset = datum[groupMapsTo]
			} else if (groups && groups.length > 0) {
				dataset = groups[0]
			}
			if (
				axisOptions?.correspondingDatasets &&
				axisOptions.correspondingDatasets.includes(dataset)
			) {
				return this.secondaryRangeAxisPosition
			}
		}
		return this.rangeAxisPosition
	}

	getAxisOptions(position: AxisPositions) {
		return getProperty(this.model.getOptions(), 'axes', position)
	}

	getDomainAxisOptions() {
		const domainAxisPosition = this.getDomainAxisPosition()
		return this.getAxisOptions(domainAxisPosition)
	}

	getRangeAxisOptions() {
		const rangeAxisPosition = this.getRangeAxisPosition()
		return this.getAxisOptions(rangeAxisPosition)
	}

	getScaleLabel(position: AxisPositions) {
		const axisOptions = this.getAxisOptions(position)
		const title: string = axisOptions.title
		if (!title) {
			if (position === AxisPositions.BOTTOM || position === AxisPositions.TOP) {
				return 'x-value'
			}
			return 'y-value'
		}
		return title
	}

	getDomainLabel() {
		return this.getScaleLabel(this.getDomainAxisPosition())
	}

	getRangeLabel() {
		return this.getScaleLabel(this.getRangeAxisPosition())
	}

	update() {
		this.determineAxisDuality()
		this.findDomainAndRangeAxes()
		this.determineOrientation()
		const axisPositions: AxisPositions[] = Object.keys(AxisPositions).map(
			(axisPositionKey: string) => AxisPositions[axisPositionKey as keyof typeof AxisPositions]
		)
		axisPositions.forEach((axisPosition) => {
			this.scales[axisPosition as string] = this.createScale(axisPosition)
		})
	}

	findDomainAndRangeAxes() {
		// find main axes between (left & right) && (bottom & top)
		const verticalAxesPositions = this.findVerticalAxesPositions()
		const horizontalAxesPositions = this.findHorizontalAxesPositions()

		// Now we have horizontal & vertical main axes to choose domain & range axes from
		const domainAndRangeAxesPositions = this.findDomainAndRangeAxesPositions(
			verticalAxesPositions,
			horizontalAxesPositions
		)

		this.domainAxisPosition = domainAndRangeAxesPositions.primaryDomainAxisPosition
		this.rangeAxisPosition = domainAndRangeAxesPositions.primaryRangeAxisPosition

		if (this.isDualAxes()) {
			this.secondaryDomainAxisPosition = domainAndRangeAxesPositions.secondaryDomainAxisPosition
			this.secondaryRangeAxisPosition = domainAndRangeAxesPositions.secondaryRangeAxisPosition
		}
	}

	determineOrientation() {
		if (
			(this.rangeAxisPosition === AxisPositions.LEFT ||
				this.rangeAxisPosition === AxisPositions.RIGHT) &&
			(this.domainAxisPosition === AxisPositions.BOTTOM ||
				this.domainAxisPosition === AxisPositions.TOP)
		) {
			this.orientation = CartesianOrientations.VERTICAL
		} else {
			this.orientation = CartesianOrientations.HORIZONTAL
		}
	}

	isDualAxes() {
		return this.dualAxes
	}

	// if any of the axes objects have correspondingDatasets [] asserted we flag the chart as dual axes
	// it does not count as dual axes if it just has another axis turned on but is not actually using it to map a dataset
	determineAxisDuality() {
		const options = this.model.getOptions()
		const axesOptions = getProperty(options, 'axes')

		if (
			(axesOptions[AxisPositions.LEFT]?.correspondingDatasets &&
				axesOptions[AxisPositions.RIGHT]) ||
			(axesOptions[AxisPositions.RIGHT]?.correspondingDatasets &&
				axesOptions[AxisPositions.LEFT]) ||
			(axesOptions[AxisPositions.TOP]?.correspondingDatasets &&
				axesOptions[AxisPositions.BOTTOM]) ||
			(axesOptions[AxisPositions.BOTTOM]?.correspondingDatasets && axesOptions[AxisPositions.TOP])
		) {
			this.dualAxes = true
		}
	}

	getCustomDomainValuesByposition(axisPosition: AxisPositions) {
		const domain = getProperty(this.model.getOptions(), 'axes', axisPosition, 'domain')

		// Check if domain is an array
		if (domain && !Array.isArray(domain)) {
			throw new Error(`Domain in ${axisPosition} axis is not a valid array`)
		}

		// Determine number of elements passed in domain depending on scale types
		if (Array.isArray(domain)) {
			if (
				(this.scaleTypes[axisPosition] === ScaleTypes.LINEAR ||
					this.scaleTypes[axisPosition] === ScaleTypes.TIME) &&
				domain.length !== 2
			) {
				throw new Error(
					`There can only be 2 elements in domain for scale type: ${this.scaleTypes[axisPosition]}`
				)
			}
		}

		return domain
	}

	getOrientation() {
		return this.orientation
	}

	getScaleByPosition(axisPosition: AxisPositions) {
		return this.scales[axisPosition]
	}

	getScaleTypeByPosition(axisPosition: AxisPositions) {
		return this.scaleTypes[axisPosition]
	}

	getDomainAxisScaleType() {
		const domainAxisPosition = this.getDomainAxisPosition()
		return this.getScaleTypeByPosition(domainAxisPosition)
	}

	getRangeAxisScaleType() {
		const rangeAxisPosition = this.getRangeAxisPosition()
		return this.getScaleTypeByPosition(rangeAxisPosition)
	}

	getDomainScale() {
		return this.scales[this.domainAxisPosition]
	}

	getRangeScale() {
		return this.scales[this.rangeAxisPosition]
	}

	// Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
	getMainXAxisPosition() {
		const possibleXAxisPositions = [AxisPositions.BOTTOM, AxisPositions.TOP]

		return [this.domainAxisPosition, this.rangeAxisPosition].find(
			(position) => possibleXAxisPositions.indexOf(position) > -1
		)
	}

	// Find the main y-axis out of the 2 y-axis on the chart (when 2D axis is used)
	getMainYAxisPosition() {
		const possibleYAxisPositions = [AxisPositions.LEFT, AxisPositions.RIGHT]

		return [this.domainAxisPosition, this.rangeAxisPosition].find(
			(position) => possibleYAxisPositions.indexOf(position) > -1
		)
	}

	getMainXScale() {
		return this.scales[this.getMainXAxisPosition()]
	}

	getMainYScale() {
		return this.scales[this.getMainYAxisPosition()]
	}

	getValueFromScale(scale: any, scaleType: ScaleTypes, axisPosition: AxisPositions, datum: any) {
		const options = this.model.getOptions()
		const axesOptions = getProperty(options, 'axes')
		const axisOptions = axesOptions[axisPosition]
		const { mapsTo } = axisOptions
		const value = getProperty(datum, mapsTo) !== null ? datum[mapsTo] : datum
		let scaledValue: number
		switch (scaleType) {
			case ScaleTypes.LABELS:
				scaledValue = scale(value) + scale.step() / 2
				break
			case ScaleTypes.TIME:
				scaledValue = scale(new Date(value))
				break
			default:
				scaledValue = scale(value)
		}
		return scaledValue
	}

	getBoundedScaledValues(datum: any): number[] {
		const { bounds } = this.model.getOptions()
		const axisPosition = this.getRangeAxisPosition({ datum })
		const scale = this.scales[axisPosition]

		const options = this.model.getOptions()
		const axesOptions = getProperty(options, 'axes')
		const axisOptions = axesOptions[axisPosition]
		const { mapsTo } = axisOptions
		const value = datum[mapsTo] !== undefined ? datum[mapsTo] : datum

		const boundedValues = [
			scale(
				getProperty(datum, bounds.upperBoundMapsTo) !== null
					? datum[bounds.upperBoundMapsTo]
					: value
			),
			scale(
				getProperty(datum, bounds.lowerBoundMapsTo) !== null
					? datum[bounds.lowerBoundMapsTo]
					: value
			)
		]

		return boundedValues
	}

	getValueThroughAxisPosition(axisPosition: AxisPositions, datum: any) {
		const scaleType = this.scaleTypes[axisPosition] as ScaleTypes
		const scale = this.scales[axisPosition]

		return this.getValueFromScale(scale, scaleType, axisPosition, datum)
	}

	getDomainValue(d: string | object) {
		const axisPosition = this.getDomainAxisPosition({ datum: d })
		return this.getValueThroughAxisPosition(axisPosition, d)
	}

	getRangeValue(d: number | string | object) {
		const axisPosition = this.getRangeAxisPosition({ datum: d })
		return this.getValueThroughAxisPosition(axisPosition, d)
	}

	getMainXScaleType() {
		return this.getScaleTypeByPosition(this.getMainXAxisPosition())
	}

	getMainYScaleType() {
		return this.getScaleTypeByPosition(this.getMainYAxisPosition())
	}

	getDomainIdentifier(datum?: any) {
		const options = this.model.getOptions()
		return getProperty(options, 'axes', this.getDomainAxisPosition({ datum: datum }), 'mapsTo')
	}

	getRangeIdentifier(datum?: any) {
		const options = this.model.getOptions()
		return getProperty(options, 'axes', this.getRangeAxisPosition({ datum: datum }), 'mapsTo')
	}

	extendsDomain(axisPosition: AxisPositions, domain: any) {
		const options = this.model.getOptions()
		const axisOptions = getProperty(options, 'axes', axisPosition)
		if (axisOptions.scaleType === ScaleTypes.TIME) {
			const spaceToAddToEdges = getProperty(options, 'timeScale', 'addSpaceOnEdges')
			return addSpacingToTimeDomain(domain, spaceToAddToEdges)
		} else {
			return addSpacingToContinuousDomain(domain, axis.paddingRatio, axisOptions.scaleType)
		}
	}

	protected findVerticalAxesPositions() {
		const options = this.model.getOptions()
		const axesOptions = getProperty(options, 'axes')
		const dualAxes = this.isDualAxes()

		// If right axis has been specified as `main`
		if (
			(getProperty(axesOptions, AxisPositions.LEFT) === null &&
				getProperty(axesOptions, AxisPositions.RIGHT) !== null) ||
			getProperty(axesOptions, AxisPositions.RIGHT, 'main') === true ||
			(dualAxes && getProperty(axesOptions, AxisPositions.LEFT, 'correspondingDatasets'))
		) {
			return {
				primary: AxisPositions.RIGHT,
				secondary: AxisPositions.LEFT
			}
		}

		return { primary: AxisPositions.LEFT, secondary: AxisPositions.RIGHT }
	}

	protected findHorizontalAxesPositions() {
		const options = this.model.getOptions()
		const axesOptions = getProperty(options, 'axes')
		const dualAxes = this.isDualAxes()

		// If top axis has been specified as `main`
		if (
			(getProperty(axesOptions, AxisPositions.BOTTOM) === null &&
				getProperty(axesOptions, AxisPositions.TOP) !== null) ||
			getProperty(axesOptions, AxisPositions.TOP, 'main') === true ||
			(dualAxes && getProperty(axesOptions, AxisPositions.BOTTOM, 'correspondingDatasets'))
		) {
			return {
				primary: AxisPositions.TOP,
				secondary: AxisPositions.BOTTOM
			}
		}

		return { primary: AxisPositions.BOTTOM, secondary: AxisPositions.TOP }
	}

	protected findDomainAndRangeAxesPositions(
		verticalAxesPositions: any,
		horizontalAxesPositions: any
	) {
		const options = this.model.getOptions()

		const mainVerticalAxisOptions = getProperty(options, 'axes', verticalAxesPositions.primary)
		const mainHorizontalAxisOptions = getProperty(options, 'axes', horizontalAxesPositions.primary)

		const mainVerticalScaleType = mainVerticalAxisOptions.scaleType || ScaleTypes.LINEAR
		const mainHorizontalScaleType = mainHorizontalAxisOptions.scaleType || ScaleTypes.LINEAR

		const result = {
			primaryDomainAxisPosition: null as AxisPositions,
			secondaryDomainAxisPosition: null as AxisPositions,
			primaryRangeAxisPosition: null as AxisPositions,
			secondaryRangeAxisPosition: null as AxisPositions
		}

		// assign to to be a vertical chart by default
		result.primaryDomainAxisPosition = horizontalAxesPositions.primary
		result.primaryRangeAxisPosition = verticalAxesPositions.primary
		// secondary axes
		result.secondaryDomainAxisPosition = horizontalAxesPositions.secondary
		result.secondaryRangeAxisPosition = verticalAxesPositions.secondary

		// if neither the horizontal axes are label or time
		// and atleast  one of the main vertical ones are labels or time then it should be horizontal
		if (
			(!(
				mainHorizontalScaleType === ScaleTypes.LABELS || mainHorizontalScaleType === ScaleTypes.TIME
			) &&
				mainVerticalScaleType === ScaleTypes.LABELS) ||
			mainVerticalScaleType === ScaleTypes.TIME
		) {
			result.primaryDomainAxisPosition = verticalAxesPositions.primary
			result.primaryRangeAxisPosition = horizontalAxesPositions.primary
			// secondary axes
			result.secondaryDomainAxisPosition = verticalAxesPositions.secondary
			result.secondaryRangeAxisPosition = horizontalAxesPositions.secondary
		}

		return result
	}

	getScaleDomain(axisPosition: AxisPositions) {
		const options = this.model.getOptions()
		const axisOptions = getProperty(options, 'axes', axisPosition)
		const bounds = getProperty(options, 'bounds')
		const { includeZero } = axisOptions
		const scaleType = getProperty(axisOptions, 'scaleType') || ScaleTypes.LINEAR

		if (this.model.isDataEmpty()) {
			return []
		}

		if (axisOptions.binned) {
			const { bins } = this.model.getBinConfigurations()

			return [0, max(bins, (d: any) => d.length)]
		} else if (axisOptions.limitDomainToBins) {
			const { bins } = this.model.getBinConfigurations()
			const stackKeys = this.model.getStackKeys({ bins })

			return [stackKeys[0].split('-')[0], stackKeys[stackKeys.length - 1].split('-')[1]]
		}

		const displayData = this.model.getDisplayData()
		const { extendLinearDomainBy, mapsTo, percentage, thresholds } = axisOptions
		const { reference: ratioReference, compareTo: ratioCompareTo } = axis.ratio

		// If domain is specified return that domain
		if (axisOptions.domain) {
			if (scaleType === ScaleTypes.LABELS) {
				return axisOptions.domain
			} else if (scaleType === ScaleTypes.TIME) {
				axisOptions.domain = axisOptions.domain.map((d: any) =>
					d.getTime === undefined ? new Date(d) : d
				)
			}
			return this.extendsDomain(axisPosition, axisOptions.domain)
		}

		// Return [0, 100] for percentage axis scale
		if (percentage) {
			return [0, 100]
		}

		// If scale is a LABELS scale, return some labels as the domain
		if (axisOptions && scaleType === ScaleTypes.LABELS) {
			// Get unique values
			return removeArrayDuplicates(displayData.map((d: any) => d[mapsTo]))
		}

		// Get the extent of the domain
		let domain: any
		let allDataValues: any
		const dataGroupNames = this.model.getDataGroupNames()

		if (scaleType === ScaleTypes.LABELS_RATIO) {
			return displayData.map((datum: any) => `${datum[ratioReference]}/${datum[ratioCompareTo]}`)
		} else if (scaleType === ScaleTypes.TIME) {
			allDataValues = displayData.map((datum: any) => +new Date(datum[mapsTo]))
		} else if (bounds && options.axes) {
			allDataValues = []

			displayData.forEach((datum: any) => {
				allDataValues.push(datum[mapsTo])

				if (datum[bounds.upperBoundMapsTo]) {
					allDataValues.push(datum[bounds.upperBoundMapsTo])
				}
				if (datum[bounds.lowerBoundMapsTo]) {
					allDataValues.push(datum[bounds.lowerBoundMapsTo])
				}
			})
		} else if (
			axisOptions.stacked === true &&
			dataGroupNames &&
			axisPosition === this.getRangeAxisPosition()
		) {
			const { groupMapsTo } = options.data
			const dataValuesGroupedByKeys = this.model.getDataValuesGroupedByKeys({
				groups: dataGroupNames
			})
			const nonStackedGroupsData = displayData.filter(
				(datum: any) => !dataGroupNames.includes(datum[groupMapsTo])
			)

			const stackedValues: any[] = []
			dataValuesGroupedByKeys.forEach((dataValues: any) => {
				const { ...numericalValues } = dataValues

				let positiveSum = 0,
					negativeSum = 0
				Object.values(numericalValues).forEach((value: number) => {
					if (!isNaN(value)) {
						if (value < 0) {
							negativeSum += value
						} else {
							positiveSum += value
						}
					}
				})
				stackedValues.push([negativeSum, positiveSum])
			})

			allDataValues = [
				...flatten(stackedValues),
				...nonStackedGroupsData.map((datum: any) => datum[mapsTo])
			]
		} else {
			allDataValues = []

			displayData.forEach((datum: any) => {
				const value = datum[mapsTo]
				if (Array.isArray(value) && value.length === 2) {
					allDataValues.push(value[0])
					allDataValues.push(value[1])
				} else {
					if (extendLinearDomainBy) {
						allDataValues.push(Math.max(datum[mapsTo], datum[extendLinearDomainBy]))
					}
					allDataValues.push(value)
				}
			})
		}

		// Time can never be 0 and log of base 0 is -Infinity
		if (scaleType !== ScaleTypes.TIME && scaleType !== ScaleTypes.LOG && includeZero) {
			allDataValues.push(0)
		}

		// Add threshold values into the scale
		if (thresholds && thresholds.length > 0) {
			thresholds.forEach((threshold: any) => {
				const thresholdValue = getProperty(threshold, 'value')
				if (thresholdValue !== null) allDataValues.push(thresholdValue)
			})
		}

		domain = extent(allDataValues)
		domain = this.extendsDomain(axisPosition, domain)

		return domain
	}

	protected createScale(axisPosition: AxisPositions) {
		const options = this.model.getOptions()
		const axisOptions = getProperty(options, 'axes', axisPosition)

		if (!axisOptions) {
			return null
		}

		const scaleType = getProperty(axisOptions, 'scaleType') || ScaleTypes.LINEAR
		this.scaleTypes[axisPosition] = scaleType

		let scale: ScaleFunction
		if (scaleType === ScaleTypes.TIME) {
			scale = scaleTime()
		} else if (scaleType === ScaleTypes.LOG) {
			scale = scaleLog().base(axisOptions.base || 10)
		} else if (scaleType === ScaleTypes.LABELS || scaleType === ScaleTypes.LABELS_RATIO) {
			scale = scaleBand()
		} else {
			scale = scaleLinear()
		}

		scale.domain(this.getScaleDomain(axisPosition))

		return scale
	}

	getHighestDomainThreshold(): null | {
		threshold: ThresholdOptions
		scaleValue: number
	} {
		const axesOptions = getProperty(this.model.getOptions(), 'axes')
		const domainAxisPosition = this.getDomainAxisPosition()

		const { thresholds } = axesOptions[domainAxisPosition]

		// Check if thresholds exist & is not empty
		if (!Array.isArray(thresholds) || (Array.isArray(thresholds) && !thresholds.length)) {
			return null
		}

		const domainScale = this.getDomainScale()
		// Find the highest threshold for the domain
		const highestThreshold = thresholds.sort((a, b) => b.value - a.value)[0]

		const scaleType = this.getScaleTypeByPosition(domainAxisPosition)
		if (
			scaleType === ScaleTypes.TIME &&
			(typeof highestThreshold.value === 'string' || highestThreshold.value.getTime === undefined)
		) {
			highestThreshold.value = new Date(highestThreshold.value)
		}

		return {
			threshold: highestThreshold,
			scaleValue: domainScale(highestThreshold.value)
		}
	}

	getHighestRangeThreshold(): null | {
		threshold: ThresholdOptions
		scaleValue: number
	} {
		const axesOptions = getProperty(this.model.getOptions(), 'axes')
		const rangeAxisPosition = this.getRangeAxisPosition()

		const { thresholds } = axesOptions[rangeAxisPosition]

		// Check if thresholds exist & is not empty
		if (!Array.isArray(thresholds) || (Array.isArray(thresholds) && !thresholds.length)) {
			return null
		}

		const rangeScale = this.getRangeScale()
		// Find the highest threshold for the range
		const highestThreshold = thresholds.sort((a, b) => b.value - a.value)[0]

		return {
			threshold: highestThreshold,
			scaleValue: rangeScale(highestThreshold.value)
		}
	}
}

function addSpacingToTimeDomain(domain: any, spaceToAddToEdges: number) {
	const startDate = new Date(domain[0])
	const endDate = new Date(domain[1])

	if (differenceInYears(endDate, startDate) > 1) {
		return [subYears(startDate, spaceToAddToEdges), addYears(endDate, spaceToAddToEdges)]
	}

	if (differenceInMonths(endDate, startDate) > 1) {
		return [subMonths(startDate, spaceToAddToEdges), addMonths(endDate, spaceToAddToEdges)]
	}

	if (differenceInDays(endDate, startDate) > 1) {
		return [subDays(startDate, spaceToAddToEdges), addDays(endDate, spaceToAddToEdges)]
	}

	if (differenceInHours(endDate, startDate) > 1) {
		return [subHours(startDate, spaceToAddToEdges), addHours(endDate, spaceToAddToEdges)]
	}

	if (differenceInMinutes(endDate, startDate) > 30) {
		return [
			subMinutes(startDate, spaceToAddToEdges * 30),
			addMinutes(endDate, spaceToAddToEdges * 30)
		]
	}

	if (differenceInMinutes(endDate, startDate) > 1) {
		return [subMinutes(startDate, spaceToAddToEdges), addMinutes(endDate, spaceToAddToEdges)]
	}

	if (differenceInSeconds(endDate, startDate) > 15) {
		return [
			subSeconds(startDate, spaceToAddToEdges * 15),
			addSeconds(endDate, spaceToAddToEdges * 15)
		]
	}

	if (differenceInSeconds(endDate, startDate) > 1) {
		return [subSeconds(startDate, spaceToAddToEdges), addSeconds(endDate, spaceToAddToEdges)]
	}

	return [startDate, endDate]
}

function addSpacingToContinuousDomain(
	[lower, upper]: number[],
	paddingRatio: number,
	scaleType?: ScaleTypes
) {
	const domainLength = upper - lower
	const padding = domainLength * paddingRatio

	// If padding crosses 0, keep 0 as new upper bound
	const newUpper = upper <= 0 && upper + padding > 0 ? 0 : upper + padding
	// If padding crosses 0, keep 0 as new lower bound
	let newLower = lower >= 0 && lower - padding < 0 ? 0 : lower - padding

	// Log of base 0 or a negative number is -Infinity
	if (scaleType === ScaleTypes.LOG && newLower <= 0) {
		if (lower <= 0) {
			throw Error('Data must have values greater than 0 if log scale type is used.')
		}
		newLower = lower
	}

	return [newLower, newUpper]
}
