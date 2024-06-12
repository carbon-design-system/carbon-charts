import { ChoroplethChart, type ChoroplethChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<ChoroplethChartOptions>(
	ChoroplethChart,
	'ExperimentalCcvChoroplethChart'
)
