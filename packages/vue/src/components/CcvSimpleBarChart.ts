import { SimpleBarChart, type BarChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<BarChartOptions>(SimpleBarChart, 'CcvSimpleBarChart')
