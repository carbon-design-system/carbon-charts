import settings from 'carbon-components/es/globals/js/settings' // CSS prefix
import { ChartTypes } from '@/interfaces/enums'

export const makeChartID = (chartType: ChartTypes) => `${chartType}-chart-holder`

export const createChartHolder = (chartType: any) => {
	const chartHolder = document.createElement('div')
	chartHolder.id = makeChartID(chartType)
	chartHolder.classList.add(`${settings.prefix}--chart-holder`)

	document.body.appendChild(chartHolder)

	return chartHolder
}

export const getChartHolder = (chartType: ChartTypes) =>
	document.getElementById(makeChartID(chartType))
