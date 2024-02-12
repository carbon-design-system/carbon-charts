import { bin as d3Bin, scaleOrdinal, stack, stackOffsetDiverging } from 'd3'
import { cloneDeep, fromPairs, groupBy, merge, uniq } from 'lodash-es'
import { getProperty, updateLegendAdditionalItems } from '@/tools'
import { color as colorConfigs, legend as legendConfigs } from '@/configuration'
import { histogram as histogramConfigs } from '@/configuration-non-customizable'
import { Events, ScaleTypes, ColorClassNameTypes } from '@/interfaces/enums'
import { formatDateTillMilliSeconds } from '@/services/time-series'
import type { ChartTabularData } from '@/interfaces/model'

export type StackKeysParams = {
	bins?: any
	groups?: any
	percentage?: any
	divergent?: any
}

function _sanitizeCsvCell(cellContent: string): string {
	const _trimmedCell = cellContent.trim()
	if (['=', '+', '-', '@', '\t', '\r'].includes(_trimmedCell.charAt(0))) {
		return `\xA0${_trimmedCell}`
	}

	// Only add quotes if cell contains commas, newlines, or quotes
	if (/[,\"\n]/.test(_trimmedCell)) {
		return `"${_trimmedCell}"`
	}

	return _trimmedCell
}

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class ChartModel {
	protected services: any

	// Internal Model state
	protected state: any = {
		options: {}
	}

	// Data labels
	/**
	 * A list of all the data groups that have existed within the lifetime of the chart
	 * @type string[]
	 */
	protected allDataGroups: string[]

	// Fill scales & fill related objects
	protected colorScale: any = {}

	protected colorClassNames: any = {}

	constructor(services: any) {
		this.services = services
	}

	formatTable({ headers, cells }) {
		const options = this.getOptions()
		const {
			code: localeCode,
			date: dateFormatter,
			number: numberFormatter
		} = getProperty(options, 'locale')
		const tableHeadingFormatter = getProperty(options, 'tabularRepModal', 'tableHeadingFormatter')
		const tableCellFormatter = getProperty(options, 'tabularRepModal', 'tableCellFormatter')
		const { cartesianScales } = this.services
		const domainScaleType = cartesianScales?.getDomainAxisScaleType()
		let domainValueFormatter: any

		if (domainScaleType === ScaleTypes.TIME) {
			domainValueFormatter = (d: any) =>
				dateFormatter(d, localeCode, { month: 'short', day: 'numeric', year: 'numeric' })
		}

		const result = [
			typeof tableHeadingFormatter === 'function' ? tableHeadingFormatter(headers) : headers,
			...(typeof tableCellFormatter === 'function'
				? tableCellFormatter(cells)
				: cells.map((data: (string | number)[]) => {
						if (domainValueFormatter) {
							data[1] = domainValueFormatter(data[1]) as string
						}
						for (let i in data) {
							let val = data[i]
							if (typeof val === 'number') {
								data[i] = numberFormatter(val, localeCode)
							}
						}
						return data
					}))
		]
		return result
	}

	getAllDataFromDomain(groups?: any) {
		if (!this.getData()) {
			return null
		}
		const options = this.getOptions()
		// Remove datasets that have been disabled
		let allData = this.getData()
		const dataGroups = this.getDataGroups()
		const { groupMapsTo } = getProperty(options, 'data')
		const axesOptions = getProperty(options, 'axes')

		// filter out the groups that are irrelevant to the component
		if (groups) {
			allData = allData.filter((item: any) => groups.includes(item[groupMapsTo]))
		}

		if (axesOptions) {
			Object.keys(axesOptions).forEach(axis => {
				const mapsTo = axesOptions[axis].mapsTo
				const scaleType = axesOptions[axis].scaleType
				// make sure linear/log values are numbers
				if (scaleType === ScaleTypes.LINEAR || scaleType === ScaleTypes.LOG) {
					allData = allData.map((datum: any) => {
						return {
							...datum,
							[mapsTo]: datum[mapsTo] === null ? datum[mapsTo] : Number(datum[mapsTo])
						}
					})
				}

				// Check for custom domain
				if (mapsTo && axesOptions[axis].domain) {
					if (scaleType === ScaleTypes.LABELS) {
						allData = allData.filter((datum: any) =>
							axesOptions[axis].domain.includes(datum[mapsTo])
						)
					} else {
						const [start, end] = axesOptions[axis].domain
						// Filter out data outside domain if that datapoint is using that axis (has mapsTo property)
						allData = allData.filter(
							(datum: any) => !(mapsTo in datum) || (datum[mapsTo] >= start && datum[mapsTo] <= end)
						)
					}
				}
			})
		}

		return allData.filter((datum: any) => {
			return dataGroups.find((group: any) => group.name === datum[groupMapsTo])
		})
	}

	/**
	 * Charts that have group configs passed into them, only want to retrieve the display data relevant to that chart
	 * @param groups the included datasets for the particular chart
	 */
	getDisplayData(groups?: any) {
		if (!this.get('data')) {
			return null
		}

		const { ACTIVE } = legendConfigs.items.status
		const dataGroups = this.getDataGroups(groups)
		const { groupMapsTo } = this.getOptions().data
		const allDataFromDomain = this.getAllDataFromDomain(groups)

		return allDataFromDomain.filter((datum: any) => {
			return dataGroups.find(
				(dataGroup: any) => dataGroup.name === datum[groupMapsTo] && dataGroup.status === ACTIVE
			)
		})
	}

	getData() {
		return this.get('data')
	}

	isDataEmpty() {
		return !this.getData().length
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

		return sanitizedData
	}

	getDataGroups(groups?: any) {
		const isDataLoading = getProperty(this.getOptions(), 'data', 'loading')

		// No data should be displayed while data is still loading
		if (isDataLoading) {
			return []
		}

		// if its a combo chart, the specific chart will pass the model the groups it needs
		if (groups) {
			return this.get('dataGroups').filter((dataGroup: any) => groups.includes(dataGroup.name))
		}
		return this.get('dataGroups')
	}

	getActiveDataGroups(groups?: any) {
		const { ACTIVE } = legendConfigs.items.status

		return this.getDataGroups(groups).filter((dataGroup: any) => dataGroup.status === ACTIVE)
	}

	getDataGroupNames(groups?: any) {
		const dataGroups = this.getDataGroups(groups)
		return dataGroups.map((dataGroup: any) => dataGroup.name)
	}

	getActiveDataGroupNames(groups?: any) {
		const activeDataGroups = this.getActiveDataGroups(groups)
		return activeDataGroups.map((dataGroup: any) => dataGroup.name)
	}

	private aggregateBinDataByGroup(bin: any) {
		return groupBy(bin, 'group')
	}

	getBinConfigurations() {
		// Manipulate data and options for Histogram
		const data = this.getDisplayData()
		const options = this.getOptions()

		const mainXPos = this.services.cartesianScales.getMainXAxisPosition()
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier()

		const axisOptions = options.axes[mainXPos]
		const { groupMapsTo } = options.data
		const { bins: axisBins = histogramConfigs.defaultBins } = axisOptions
		const areBinsDefined = Array.isArray(axisBins)

		// Get Histogram bins
		const bins = d3Bin()
			.value((d: any) => d[domainIdentifier])
			.thresholds(axisBins)(data)

		if (!areBinsDefined) {
			// If bins are not defined by user
			const binsWidth = bins[0].x1 - bins[0].x0
			// Set last bin width as the others
			bins[bins.length - 1].x1 = +bins[bins.length - 1].x0 + binsWidth
		} else {
			// Set last bin end as the last user defined one
			bins[bins.length - 1].x1 = axisBins[axisBins.length - 1]
		}

		const binsDomain = areBinsDefined
			? [axisBins[0], axisBins[axisBins.length - 1]]
			: [bins[0].x0, bins[bins.length - 1].x1]

		// Get all groups
		const groupsKeys = Array.from(new Set(data.map((d: any) => d[groupMapsTo])))

		const histogramData = []

		// Group data by bin
		bins.forEach(bin => {
			const key = `${bin.x0}-${bin.x1}`
			const aggregateDataByGroup = this.aggregateBinDataByGroup(bin)

			groupsKeys.forEach((group: string) => {
				// For each dataset put a bin with value 0 if not exist
				// (Scale X won't change when changing showed datasets)
				histogramData.push({
					group,
					key,
					value: aggregateDataByGroup[group] || 0,
					bin: bin.x0
				})
			})
		})

		return {
			bins,
			binsDomain
		}
	}

	getBinnedStackedData() {
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const dataGroupNames = this.getActiveDataGroupNames()

		const { bins } = this.getBinConfigurations()
		const dataValuesGroupedByKeys = this.getDataValuesGroupedByKeys({
			bins
		})

		return stack()
			.keys(dataGroupNames)(dataValuesGroupedByKeys)
			.map((series, i) => {
				// Add data group names to each series
				return Object.keys(series)
					.filter((key: any) => !isNaN(key))
					.map((key: any) => {
						const element = series[key]
						element[groupMapsTo] = dataGroupNames[i]

						return element
					})
			})
	}

	getGroupedData(groups?: any) {
		const displayData = this.getDisplayData(groups)
		const groupedData: any = {}
		const { groupMapsTo } = this.getOptions().data

		displayData.map((datum: any) => {
			const group = datum[groupMapsTo]
			if (groupedData[group] !== null && groupedData[group] !== undefined) {
				groupedData[group].push(datum)
			} else {
				groupedData[group] = [datum]
			}
		})

		return Object.keys(groupedData).map(groupName => ({
			name: groupName,
			data: groupedData[groupName]
		}))
	}

	getStackKeys({ bins = null, groups = null }: StackKeysParams = { bins: null, groups: null }) {
		const options = this.getOptions()

		const displayData = this.getDisplayData(groups)

		let stackKeys: any
		if (bins) {
			stackKeys = bins.map((bin: any) => `${bin.x0}:${bin.x1}`)
		} else {
			stackKeys = uniq(
				displayData.map((datum: any) => {
					const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(datum)

					// Use time value as key for Date object to avoid multiple data in the same second
					if (datum[domainIdentifier] instanceof Date) {
						return formatDateTillMilliSeconds(datum[domainIdentifier])
					}

					return datum[domainIdentifier] && typeof datum[domainIdentifier].toString === 'function'
						? datum[domainIdentifier].toString()
						: datum[domainIdentifier]
				})
			)
		}

		const axisPosition = this.services.cartesianScales.domainAxisPosition
		const scaleType = options.axes[axisPosition].scaleType

		// Sort keys
		if (scaleType === ScaleTypes.TIME) {
			stackKeys.sort((a: any, b: any) => {
				const dateA: any = new Date(a)
				const dateB: any = new Date(b)

				return dateA - dateB
			})
		} else if (scaleType === ScaleTypes.LOG || scaleType === ScaleTypes.LINEAR) {
			stackKeys.sort((a: any, b: any) => a - b)
		}

		return stackKeys
	}

	getDataValuesGroupedByKeys({ bins = null, groups = null }: StackKeysParams) {
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const displayData = this.getDisplayData(groups)

		const dataGroupNames = this.getDataGroupNames()

		const stackKeys = this.getStackKeys({ bins, groups })
		if (bins) {
			return stackKeys.map((key: any) => {
				const [binStart, binEnd] = key.split(':')

				const correspondingValues: any = { x0: binStart, x1: binEnd }
				const correspondingBin = bins.find((bin: any) => bin.x0.toString() === binStart.toString())
				dataGroupNames.forEach((dataGroupName: any) => {
					correspondingValues[dataGroupName] = correspondingBin.filter(
						(binItem: any) => binItem[groupMapsTo] === dataGroupName
					).length
				})

				return correspondingValues
			}) as any
		}

		return stackKeys.map((key: any) => {
			const correspondingValues: any = { sharedStackKey: key }
			dataGroupNames.forEach((dataGroupName: any) => {
				const correspondingDatum = displayData.find((datum: any) => {
					const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(datum)

					return (
						datum[groupMapsTo] === dataGroupName &&
						Object.prototype.hasOwnProperty.call(datum, domainIdentifier) &&
						(datum[domainIdentifier] instanceof Date
							? formatDateTillMilliSeconds(datum[domainIdentifier]) === key
							: datum[domainIdentifier].toString() === key)
					)
				})

				const rangeIdentifier =
					this.services.cartesianScales.getRangeIdentifier(correspondingValues)
				correspondingValues[dataGroupName] = correspondingDatum
					? correspondingDatum[rangeIdentifier]
					: null
			})

			return correspondingValues
		}) as any
	}

	getStackedData({ percentage = false, groups = null, divergent = false }: StackKeysParams) {
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		// Get only active data groups so non-active data groups are not rendered
		// on legend item click
		const dataGroupNames = this.getActiveDataGroupNames(groups)
		const dataValuesGroupedByKeys = this.getDataValuesGroupedByKeys({
			groups
		})

		if (percentage) {
			const maxByKey = fromPairs(dataValuesGroupedByKeys.map((d: any) => [d.sharedStackKey, 0]))

			dataValuesGroupedByKeys.forEach((d: any) => {
				dataGroupNames.forEach((name: any) => {
					maxByKey[d.sharedStackKey] += d[name]
				})
			})

			// cycle through data values to get percentage
			dataValuesGroupedByKeys.forEach((d: any) => {
				dataGroupNames.forEach((name: any) => {
					const denominator: number = maxByKey[d.sharedStackKey] as number
					if (maxByKey[d.sharedStackKey]) {
						d[name] = (d[name] / denominator) * 100
					} else {
						d[name] = 0
					}
				})
			})
		}

		const stackToUse = divergent ? stack().offset(stackOffsetDiverging) : stack()

		return stackToUse
			.keys(dataGroupNames)(dataValuesGroupedByKeys)
			.map((series: any, i: number) => {
				// Add data group names to each series
				return Object.keys(series)
					.filter((key: any) => !isNaN(key))
					.map((key: any) => {
						const element = series[key]
						element[groupMapsTo] = dataGroupNames[i]

						return element
					})
			})
	}

	/**
	 * @return {Object} The chart's options
	 */
	getOptions() {
		return this.state.options
	}

	set(newState: any, configs?: any) {
		this.state = Object.assign({}, this.state, newState)
		const newConfig = Object.assign(
			{ skipUpdate: false, animate: true }, // default configs
			configs
		)
		if (!newConfig.skipUpdate) {
			this.update(newConfig.animate)
		}
	}

	get(property?: string) {
		if (property) {
			return this.state[property]
		} else {
			return this.state
		}
	}

	/**
	 *
	 * @param newOptions New options to be set
	 */
	setOptions(newOptions: any) {
		const options = this.getOptions()
		updateLegendAdditionalItems(options, newOptions)

		this.set({
			options: merge(options, newOptions)
		})
	}

	/**
	 *
	 * Updates miscellanous information within the model
	 * such as the color scales, or the legend data labels
	 */
	update(animate = true) {
		if (!this.getDisplayData()) {
			return
		}

		this.updateAllDataGroups()

		this.setCustomColorScale()
		this.setColorClassNames()
		this.services.events.dispatchEvent(Events.Model.UPDATE, { animate })
	}

	/*
	 * Data labels
	 */
	toggleDataLabel(changedLabel: string) {
		const { ACTIVE, DISABLED } = legendConfigs.items.status
		const dataGroups = this.getDataGroups()

		const hasDeactivatedItems = dataGroups.some((group: any) => group.status === DISABLED)
		const activeItems = dataGroups.filter((group: any) => group.status === ACTIVE)

		// If there are deactivated items, toggle "changedLabel"
		if (hasDeactivatedItems) {
			// If the only active item is being toggled
			// Activate all items
			if (activeItems.length === 1 && activeItems[0].name === changedLabel) {
				// If every item is active, then enable "changedLabel" and disable all other items
				dataGroups.forEach((_: any, i: number) => {
					dataGroups[i].status = ACTIVE
				})
			} else {
				const indexToChange = dataGroups.findIndex((group: any) => group.name === changedLabel)
				dataGroups[indexToChange].status =
					dataGroups[indexToChange].status === DISABLED ? ACTIVE : DISABLED
			}
		} else {
			// If every item is active, then enable "changedLabel" and disable all other items
			dataGroups.forEach((group: any, i: number) => {
				dataGroups[i].status = group.name === changedLabel ? ACTIVE : DISABLED
			})
		}

		// Updates selected groups
		const updatedActiveItems = dataGroups.filter((group: any) => group.status === ACTIVE)
		const options = this.getOptions()

		const hasUpdatedDeactivatedItems = dataGroups.some((group: any) => group.status === DISABLED)

		// If there are deactivated items, map the item name into selected groups
		if (hasUpdatedDeactivatedItems) {
			options.data.selectedGroups = updatedActiveItems.map((activeItem: any) => activeItem.name)
		} else {
			// If every item is active, clear array
			options.data.selectedGroups = []
		}

		// dispatch legend filtering event with the status of all the dataLabels
		this.services.events.dispatchEvent(Events.Legend.ITEMS_UPDATE, {
			dataGroups
		})

		// Update model
		this.set({
			dataGroups
		})
	}

	/**
	 * Should the data point be filled?
	 * @param group
	 * @param key
	 * @param data
	 * @param defaultFilled the default for this chart
	 */
	getIsFilled(group: any, key?: any, data?: any, defaultFilled?: boolean) {
		const options = this.getOptions()
		if (options.getIsFilled) {
			return options.getIsFilled(group, key, data, defaultFilled)
		} else {
			return defaultFilled
		}
	}

	getFillColor(group: any, key?: any, data?: any) {
		const options = this.getOptions()
		const defaultFillColor = getProperty(this.colorScale, group)

		if (options.getFillColor) {
			return options.getFillColor(group, key, data, defaultFillColor)
		} else {
			return defaultFillColor
		}
	}

	getStrokeColor(group: any, key?: any, data?: any) {
		const options = this.getOptions()
		const defaultStrokeColor = getProperty(this.colorScale, group)

		if (options.getStrokeColor) {
			return options.getStrokeColor(group, key, data, defaultStrokeColor)
		} else {
			return defaultStrokeColor
		}
	}

	isUserProvidedColorScaleValid() {
		const userProvidedScale = getProperty(this.getOptions(), 'color', 'scale')
		const dataGroups = this.getDataGroups()

		if (userProvidedScale == null || Object.keys(userProvidedScale).length == 0) {
			return false
		}

		return dataGroups.some((dataGroup: any) =>
			Object.keys(userProvidedScale).includes(dataGroup.name)
		)
	}

	getColorClassName(configs: {
		classNameTypes?: ColorClassNameTypes[] // heatmaps do not pass this value
		dataGroupName?: string | number
		originalClassName?: string
		value?: number // required for heatmap override
	}) {
		const colorPairingTag = this.colorClassNames(configs.dataGroupName)
		let className = configs.originalClassName
		configs.classNameTypes.forEach(
			type =>
				(className = configs.originalClassName
					? `${className} ${type}-${colorPairingTag}`
					: `${type}-${colorPairingTag}`)
		)

		return className || ''
	}

	/**
	 * For charts that might hold an associated status for their dataset
	 */
	getStatus(): any {
		return null
	}

	getAllDataGroupsNames() {
		return this.allDataGroups
	}

	/**
	 * Converts data provided in the older format to tabular
	 *
	 */
	protected transformToTabularData(data: any) {
		console.warn(
			"We've updated the charting data format to be tabular by default. The current format you're using is deprecated and will be removed in v1.0, read more here https://charts.carbondesignsystem.com/?path=/story/docs-tutorials--tabular-data-format"
		)
		const tabularData: ChartTabularData = []
		const { datasets, labels } = data

		// Loop through all datasets
		datasets.forEach((dataset: any) => {
			// Update each data point to the new format
			dataset.data.forEach((datum: any, i: number) => {
				let group

				const datasetLabel = getProperty(dataset, 'label')
				if (datasetLabel === null) {
					const correspondingLabel = getProperty(labels, i)
					if (correspondingLabel) {
						group = correspondingLabel
					} else {
						group = 'Ungrouped'
					}
				} else {
					group = datasetLabel
				}

				const updatedDatum: any = {
					group,
					key: labels[i]
				}

				if (isNaN(datum)) {
					updatedDatum['value'] = datum.value
					updatedDatum['date'] = datum.date
				} else {
					updatedDatum['value'] = datum
				}

				tabularData.push(updatedDatum)
			})
		})

		return tabularData
	}

	getTabularDataArray(): ChartTabularData {
		//apply tableFormatter
		return []
	}

	exportToCSV() {
		const data = this.getTabularDataArray().map(row =>
			row.map((column: any) => {
				const columnValue = column === '&ndash;' ? '–' : column

				// Split by separators and quotes, then sanitize each part individually
				const sanitizedParts = columnValue.split(/[,;'"`]/).map(part => _sanitizeCsvCell(part))
				return `"${sanitizedParts.join('')}"`
			})
		)

		const csvString = data.map(row => row.join(',')).join('\n')

		const options = this.getOptions()

		let fileName = 'myChart'
		const customFilename = getProperty(options, 'fileDownload', 'fileName')

		if (typeof customFilename === 'function') {
			fileName = customFilename('csv')
		} else if (typeof customFilename === 'string') {
			fileName = customFilename
		}

		this.services.files.downloadCSV(csvString, `${fileName}.csv`)
	}

	protected getTabularData(data: any) {
		// if data is not an array
		if (!Array.isArray(data)) {
			return this.transformToTabularData(data)
		}

		return data
	}

	protected sanitize(data: any) {
		data = this.getTabularData(data)

		return data
	}

	/*
	 * Data groups
	 */
	protected updateAllDataGroups() {
		// allDataGroups is used to generate a color scale that applies
		// to all the groups. Now when the data updates, you might remove a group,
		// and then bring it back in a newer data update, therefore
		// the order of the groups in allDataGroups matters so that you'd never
		// have an incorrect color assigned to a group.

		// Also, a new group should only be added to allDataGroups if
		// it doesn't currently exist

		if (!this.allDataGroups) {
			this.allDataGroups = this.getDataGroupNames()
		} else {
			// Loop through current data groups
			this.getDataGroupNames().forEach((dataGroupName: any) => {
				// If group name hasn't been stored yet, store it
				if (this.allDataGroups.indexOf(dataGroupName) === -1) {
					this.allDataGroups.push(dataGroupName)
				}
			})
		}
	}

	protected generateDataGroups(data: any) {
		const { groupMapsTo } = this.getOptions().data
		const { ACTIVE, DISABLED } = legendConfigs.items.status
		const options = this.getOptions()

		const uniqueDataGroups = uniq(data.map((datum: any) => datum[groupMapsTo]))

		// check if selectedGroups can be applied to chart with current data groups
		if (options.data.selectedGroups.length) {
			const hasAllSelectedGroups = options.data.selectedGroups.every((groupName: any) =>
				uniqueDataGroups.includes(groupName)
			)
			if (!hasAllSelectedGroups) {
				options.data.selectedGroups = []
			}
		}

		// Get group status based on items in selected groups
		const getStatus = (groupName: any) =>
			!options.data.selectedGroups.length || options.data.selectedGroups.includes(groupName)
				? ACTIVE
				: DISABLED

		return uniqueDataGroups.map(groupName => ({
			name: groupName,
			status: getStatus(groupName)
		}))
	}

	/*
	 * Fill scales
	 */
	protected setCustomColorScale() {
		if (!this.isUserProvidedColorScaleValid()) {
			return
		}

		const options = this.getOptions()
		const userProvidedScale = getProperty(options, 'color', 'scale')

		Object.keys(userProvidedScale).forEach(dataGroup => {
			if (!this.allDataGroups.includes(dataGroup)) {
				console.warn(`"${dataGroup}" does not exist in data groups.`)
			}
		})

		/**
		 * Go through allDataGroups. If a data group has a color value provided
		 * by the user, add that to the color range
		 */
		const providedDataGroups = this.allDataGroups.filter(dataGroup => userProvidedScale[dataGroup])

		providedDataGroups.forEach(
			dataGroup => (this.colorScale[dataGroup] = userProvidedScale[dataGroup])
		)
	}

	/*
	 * Color palette
	 */
	protected setColorClassNames() {
		const colorPairingOptions = getProperty(this.getOptions(), 'color', 'pairing')

		// Check if user has defined numberOfVariants (differ from given data)
		let numberOfVariants = getProperty(colorPairingOptions, 'numberOfVariants')
		if (!numberOfVariants || numberOfVariants < this.allDataGroups.length) {
			numberOfVariants = this.allDataGroups.length
		}

		let pairingOption = getProperty(colorPairingOptions, 'option')
		const colorPairingCounts = colorConfigs.pairingOptions

		// If number of dataGroups is greater than 5, user 14-color palette
		const numberOfColors = numberOfVariants > 5 ? 14 : numberOfVariants

		// Use default palette if user choice is not in range
		const key = `${numberOfColors}-color` as keyof typeof colorPairingCounts
		pairingOption = pairingOption <= colorPairingCounts[key] ? pairingOption : 1

		// Create color classes for graph, tooltip and stroke use
		const colorPairing = this.allDataGroups.map(
			(_, index) => `${numberOfColors}-${pairingOption}-${(index % 14) + 1}`
		)

		// Create default color classnames
		this.colorClassNames = scaleOrdinal().range(colorPairing).domain(this.allDataGroups)
	}
}
