import { cloneDeep, uniq } from 'lodash-es'
import { getProperty } from '@/tools'
import { ChartModel } from './model'
import { ScaleTypes, AxisPositions, AxisFlavor } from '@/interfaces/enums'

/**
 * This supports adding X and Y Cartesian[2D] zoom data to a ChartModel
 * */
export class ChartModelCartesian extends ChartModel {
	axisFlavor = AxisFlavor.DEFAULT // can't be protected as it's used by two-dimensional-axes.ts

	constructor(services: any) {
		super(services)
	}

	// get the scales information
	// needed for getTabularArray()
	protected assignRangeAndDomains() {
		const { cartesianScales } = this.services
		const options = this.getOptions()
		const isDualAxes = cartesianScales.isDualAxes()

		const scales = {
			primaryDomain: cartesianScales.domainAxisPosition,
			primaryRange: cartesianScales.rangeAxisPosition,
			secondaryDomain: null as any,
			secondaryRange: null as any
		}
		if (isDualAxes) {
			scales.secondaryDomain = cartesianScales.secondaryDomainAxisPosition
			scales.secondaryRange = cartesianScales.secondaryRangeAxisPosition
		}

		Object.keys(scales).forEach(
			(scale: 'primaryDomain' | 'primaryRange' | 'secondaryDomain' | 'secondaryRange') => {
				const position = scales[scale]
				if (cartesianScales.scales[position]) {
					scales[scale] = {
						position: position,
						label: cartesianScales.getScaleLabel(position),
						identifier: getProperty(options, 'axes', position, 'mapsTo')
					}
				} else {
					scales[scale] = null
				}
			}
		)

		return scales
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const { primaryDomain, primaryRange, secondaryDomain, secondaryRange } =
			this.assignRangeAndDomains()
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		const headers = [
			'Group',
			primaryDomain.label,
			primaryRange.label,
			...(secondaryDomain ? [secondaryDomain.label] : []),
			...(secondaryRange ? [secondaryRange.label] : [])
		]
		const cells = displayData.map((datum: any) => [
			datum[groupMapsTo],
			datum[primaryDomain.identifier] === null ? '&ndash;' : datum[primaryDomain.identifier],
			datum[primaryRange.identifier] === null || isNaN(datum[primaryRange.identifier])
				? '&ndash;'
				: numberFormatter(datum[primaryRange.identifier], localeCode),
			...(secondaryDomain
				? [
						datum[secondaryDomain.identifier] === null
							? '&ndash;'
							: datum[secondaryDomain.identifier]
					]
				: []),
			...(secondaryRange
				? [
						datum[secondaryRange.identifier] === null || isNaN(datum[secondaryRange.identifier])
							? '&ndash;'
							: datum[secondaryRange.identifier]
					]
				: [])
		])

		return super.formatTable({ headers, cells })
	}

	setData(newData: any) {
		let data: any
		if (newData) {
			data = super.setData(newData)
			if (getProperty(this.getOptions(), 'zoomBar', AxisPositions.TOP, 'enabled')) {
				// get pre-defined zoom bar data
				const definedZoomBarData = getProperty(
					this.getOptions(),
					'zoomBar',
					AxisPositions.TOP,
					'data'
				)
				// if we have zoom bar data we need to update it as well
				// with pre-defined zoom bar data
				this.setZoomBarData(definedZoomBarData)
			}
		}

		return data
	}

	/**
	 * @param zoomBarData any special zoom bar data to use instead of the model data
	 */
	setZoomBarData(newZoomBarData?: any) {
		const sanitizedData = newZoomBarData
			? this.sanitize(cloneDeep(newZoomBarData))
			: this.getDisplayData() // if we're not passed explicit zoom data use the model

		let zoomBarNormalizedValues = sanitizedData

		const { cartesianScales } = this.services
		if (sanitizedData && cartesianScales.domainAxisPosition && cartesianScales.rangeAxisPosition) {
			const domainIdentifier = cartesianScales.getDomainIdentifier()
			const rangeIdentifier = cartesianScales.getRangeIdentifier()
			// get all dates (Number) in displayData
			let allDates = sanitizedData.map((datum: any) => datum[domainIdentifier].getTime())
			allDates = uniq(allDates).sort()

			// Go through all date values
			// And get corresponding data from each dataset
			zoomBarNormalizedValues = allDates.map((date: Date) => {
				let sum = 0
				const datum: any = {}

				sanitizedData.forEach((data: any) => {
					if (data[domainIdentifier].getTime() === date) {
						sum += data[rangeIdentifier]
					}
				})
				datum[domainIdentifier] = new Date(date)
				datum[rangeIdentifier] = sum

				return datum
			})
		}

		this.set({ zoomBarData: zoomBarNormalizedValues })
	}

	getZoomBarData() {
		return this.get('zoomBarData')
	}

	protected sanitizeDateValues(data: any) {
		const options = this.getOptions()

		if (!options.axes) {
			return data
		}

		const keysToCheck: any[] = []
		Object.keys(AxisPositions).forEach((axisPositionKey: keyof typeof AxisPositions) => {
			const axisPosition = AxisPositions[axisPositionKey]
			const axisOptions = options.axes[axisPosition]

			if (axisOptions && axisOptions.scaleType === ScaleTypes.TIME) {
				const axisMapsTo = axisOptions.mapsTo

				if (axisMapsTo !== null || axisMapsTo !== undefined) {
					keysToCheck.push(axisMapsTo)
				}
			}
		})

		if (keysToCheck.length > 0) {
			// Check all datapoints and sanitize dates
			data.forEach((datum: any) => {
				keysToCheck.forEach((key: any) => {
					if (getProperty(datum, key, 'getTime') === null) {
						datum[key] = new Date(datum[key])
					}
				})
			})
		}

		return data
	}

	protected sanitize(data: any) {
		data = super.sanitize(data)
		data = this.sanitizeDateValues(data)

		return data
	}
}
