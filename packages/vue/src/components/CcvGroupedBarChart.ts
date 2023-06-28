import { GroupedBarChart, type BarChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<BarChartOptions>(GroupedBarChart, 'CcvGroupedBarChart')
