import { AreaChart, type AreaChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<AreaChartOptions>(AreaChart, 'CcvAreaChart')
