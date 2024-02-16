import { getProperty } from '@/tools'
import { ChartModel } from './model'
import { ChartTabularData } from '@/interfaces/model'

/** The meter chart model layer which extends some of the data setting options.
 * Meter only uses 1 dataset
 *  */

export class MeterChartModel extends ChartModel {
	constructor(services: any) {
		super(services)
	}

	getMaximumDomain(data: any) {
		const max = data.reduce((accumulator: number, datum: any) => accumulator + datum.value, 0)
		return max
	}

	/**
	 * Use a provided color for the bar or default to carbon color if no status provided.
	 * Defaults to carbon color otherwise.
	 * @param group dataset group label
	 */
	getFillColor(group: string) {
		const options = this.getOptions()
		const userProvidedScale = getProperty(options, 'color', 'scale')
		const status = this.getStatus()
		// user provided a fill color or there isn't a status we can use the colorScale
		if (userProvidedScale || !status) {
			return super.getFillColor(group)
		} else {
			return null
		}
	}

	/**
	 * Get the associated status for the data by checking the ranges
	 */
	getStatus() {
		const options = this.getOptions()
		const dataValues = getProperty(this.getDisplayData())

		const totalValue =
			dataValues?.reduce((previous: any, current: any) => {
				return previous + current.value
			}, 0) ?? 0

		// use max value if the percentage is bigger than 100%
		const boundedValue = getProperty(options, 'meter', 'proportional')
			? totalValue
			: totalValue > 100
				? 100
				: totalValue

		// user needs to supply ranges
		const allRanges = getProperty(options, 'meter', 'status', 'ranges')

		if (allRanges) {
			const result = allRanges.filter(
				(step: any) => step.range[0] <= boundedValue && boundedValue <= step.range[1]
			)
			if (result.length > 0) {
				return result[0].status
			}
		}

		return null
	}

	getTabularDataArray() {
		const displayData = this.getDisplayData()
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const status = this.getStatus()
		const proportional = getProperty(options, 'meter', 'proportional')
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		let headers = []
		let cells: ChartTabularData = []
		let domainMax: number
		// Display the appropriate columns and fields depending on the type of meter
		if (proportional === null) {
			domainMax = 100
			const datum = displayData[0]
			headers = ['Group', 'Value', ...(status ? ['Status'] : [])]
			cells = [
				[
					datum[groupMapsTo],
					numberFormatter(datum['value'], localeCode),
					...(status ? [status] : [])
				]
			]
		} else {
			const total = getProperty(proportional, 'total')
			domainMax = total ? total : this.getMaximumDomain(displayData)
			headers = ['Group', 'Value', 'Percentage of total']
			cells = [
				...displayData.map((datum: any) => {
					const value = datum['value']
					const percentValue = Number(((datum['value'] / domainMax) * 100).toFixed(2))
					return [
						datum[groupMapsTo],
						numberFormatter(value, localeCode),
						numberFormatter(percentValue, localeCode) + ' %'
					]
				})
			]
		}

		return super.formatTable({ headers, cells })
	}
}
