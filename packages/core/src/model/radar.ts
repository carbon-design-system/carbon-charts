import { getProperty } from '@/tools'
import { ChartModelCartesian } from './cartesian-charts'

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class RadarChartModel extends ChartModelCartesian {
	constructor(services: any) {
		super(services)
	}

	getTabularDataArray() {
		const options = this.getOptions()
		const groupedData = this.getGroupedData()
		const { angle, value } = getProperty(options, 'radar', 'axes')
		const { number: numberFormatter, code: localeCode } = getProperty(options, 'locale')

		const additionalHeaders = getProperty(groupedData, '0', 'data').map((d: any) => d[angle])
		const headers = ['Group', ...additionalHeaders]
		const cells = [
			...groupedData.map(datum => {
				return [
					datum['name'],
					...additionalHeaders.map((_: any, i: number) =>
						getProperty(datum, 'data', i, value) !== null
							? numberFormatter(getProperty(datum, 'data', i, value), localeCode)
							: '&ndash;'
					)
				]
			})
		]

		return super.formatTable({ headers, cells })
	}
}
