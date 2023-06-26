import { MeterChart, type MeterChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<MeterChartOptions>(MeterChart, 'CcvMeterChart')
