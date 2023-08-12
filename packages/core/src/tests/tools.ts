import { prefix } from '@/tests'
import { ChartTypes } from '@/interfaces/enums'

export const makeChartID = (chartType: ChartTypes) => `${chartType}-chart-holder`

export const createChartHolder = (chartType: any) => {
	const chartHolder = document.createElement('div')
	chartHolder.id = makeChartID(chartType)
	chartHolder.classList.add(`${prefix}--chart-holder`)

	document.body.appendChild(chartHolder)

	return chartHolder
}

export const getChartHolder = (chartType: ChartTypes) =>
	document.getElementById(makeChartID(chartType))
