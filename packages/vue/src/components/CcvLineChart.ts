import { LineChart, type LineChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<LineChartOptions>(LineChart, 'CcvLineChart')
