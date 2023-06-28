import { HistogramChart, type HistogramChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<HistogramChartOptions>(HistogramChart, 'CcvHistogramChart')
