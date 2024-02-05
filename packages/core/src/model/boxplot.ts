import { ascending, min, max, quantile, scaleOrdinal } from 'd3'
import { getProperty } from '@/tools'
import { color as colorConfigs } from '@/configuration'
import { ChartModelCartesian } from './cartesian-charts'

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class BoxplotChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services)
	}

	getBoxQuartiles(d: any) {
		return {
			q_25: quantile(d, 0.25),
			q_50: quantile(d, 0.5),
			q_75: quantile(d, 0.75)
		}
	}

	getBoxplotData() {
		const options = this.getOptions()
		const { groupMapsTo } = options.data

		const groupedData = this.getGroupedData()

		// Prepare the data for the box plots
		const boxplotData = []
		for (const { name: group, data } of groupedData) {
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier()
			const values = data.map((d: any) => d[rangeIdentifier]).sort(ascending)

			const record = {
				[groupMapsTo]: group,
				counts: values,
				quartiles: this.getBoxQuartiles(values),
				outliers: null as any,
				whiskers: null as any
			}

			const q1 = record.quartiles.q_25
			const q3 = record.quartiles.q_75

			const iqr = (q3 - q1) * 1.5
			const irq1 = q1 - iqr
			const irq3 = q3 + iqr

			const outliers = []
			const normalValues = []

			for (const value of values) {
				if (value < irq1) {
					outliers.push(value)
				} else if (value > irq3) {
					outliers.push(value)
				} else {
					normalValues.push(value)
				}
			}

			record.outliers = outliers

			const minNormalValue = min(normalValues)
			const maxNormalValue = max(normalValues)
			record.whiskers = {
				min: minNormalValue
					? minNormalValue
					: min([record.quartiles.q_25, record.quartiles.q_50, record.quartiles.q_75]),
				max: maxNormalValue
					? maxNormalValue
					: max([record.quartiles.q_25, record.quartiles.q_50, record.quartiles.q_75])
			}

			boxplotData.push(record)
		}

		return boxplotData
	}

	getTabularDataArray() {
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const boxplotData = this.getBoxplotData()
		const { number: numberFormatter, code: localeCode } = getProperty(options, 'locale')

		const headers = ['Group', 'Minimum', 'Q1', 'Median', 'Q3', 'Maximum', 'IQR', 'Outlier(s)']
		const cells = [
			...boxplotData.map(datum => {
				let outliers = getProperty(datum, 'outliers')
				if (outliers === null || outliers.length === 0) {
					outliers = ['&ndash;']
				}
				return [
					datum[groupMapsTo],
					getProperty(datum, 'whiskers', 'min') !== null
						? numberFormatter(getProperty(datum, 'whiskers', 'min'), localeCode)
						: '&ndash;',
					getProperty(datum, 'quartiles', 'q_25') !== null
						? numberFormatter(getProperty(datum, 'quartiles', 'q_25'), localeCode)
						: '&ndash;',
					getProperty(datum, 'quartiles', 'q_50') !== null
						? numberFormatter(getProperty(datum, 'quartiles', 'q_50'), localeCode)
						: '&ndash;',
					getProperty(datum, 'quartiles', 'q_75') !== null
						? numberFormatter(getProperty(datum, 'quartiles', 'q_75'), localeCode)
						: '&ndash;',
					getProperty(datum, 'whiskers', 'max') !== null
						? numberFormatter(getProperty(datum, 'whiskers', 'max'), localeCode)
						: '&ndash;',
					getProperty(datum, 'quartiles', 'q_75') !== null &&
					getProperty(datum, 'quartiles', 'q_25') !== null
						? (numberFormatter(
								getProperty(datum, 'quartiles', 'q_75') - getProperty(datum, 'quartiles', 'q_25')
							),
							localeCode)
						: '&ndash;',
					outliers.map((d: any) => numberFormatter(d, localeCode)).join(',')
				]
			})
		]

		return super.formatTable({ headers, cells })
	}

	protected setColorClassNames() {
		// monochrome
		const numberOfColors = 1

		const colorPairingOptions = getProperty(this.getOptions(), 'color', 'pairing')
		let pairingOption = getProperty(colorPairingOptions, 'option')
		const colorPairingCounts = colorConfigs.pairingOptions

		// Use default palette if user choice is not in range
		pairingOption =
			pairingOption <= colorPairingCounts[`${numberOfColors}-color`] ? pairingOption : 1

		// Create color classes for graph, tooltip and stroke use
		const colorPairing = this.allDataGroups.map(() => `${numberOfColors}-${pairingOption}-1`)

		// Create default color classnames
		this.colorClassNames = scaleOrdinal().range(colorPairing).domain(this.allDataGroups)
	}
}
