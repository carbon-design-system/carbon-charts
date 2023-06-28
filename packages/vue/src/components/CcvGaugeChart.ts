import { GaugeChart, type GaugeChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<GaugeChartOptions>(GaugeChart, 'CcvGaugeChart')
