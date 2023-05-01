import { ChartTypes } from '../'
// import the settings for the css prefix
import settings from 'carbon-components/es/globals/js/settings'

// Functions
export const makeChartID = (chartType: ChartTypes) => `${chartType}-chart-holder`

export const createChartHolder = (chartType) => {
	const chartHolder = document.createElement('div')
	chartHolder.id = makeChartID(chartType)
	chartHolder.classList.add(`${settings.prefix}--chart-holder`)

	document.body.appendChild(chartHolder)

	return chartHolder
}

export const getChartHolder = (chartType: ChartTypes) =>
	document.getElementById(makeChartID(chartType))
