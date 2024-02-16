// Internal Imports
import { ChartModelCartesian } from './cartesian-charts'
import { getProperty } from '@/tools'
import { get } from 'lodash-es'

/**
 * this is intended for binned type of charts
 * */
export class ChartModelBinned extends ChartModelCartesian {
	getTabularDataArray() {
		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')
		const binnedStackedData = this.getBinnedStackedData()

		const headers = [
			get(options, 'bins.rangeLabel') || 'Range',
			...binnedStackedData.map(datum => get(datum, `0.${groupMapsTo}`))
		]
		const cells = [
			...get(binnedStackedData, 0).map((d, i) => [
				`${numberFormatter(Number(get(d, 'data.x0')), localeCode)} – ${numberFormatter(
					Number(get(d, 'data.x1')),
					localeCode
				)}`,
				...binnedStackedData.map(datum =>
					numberFormatter(get(datum[i], `data.${get(datum[i], groupMapsTo)}`), localeCode)
				)
			])
		]

		return super.formatTable({ headers, cells })
	}
}
