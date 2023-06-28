import { BoxplotChart, type BoxplotChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<BoxplotChartOptions>(BoxplotChart, 'CcvBoxplotChart')
