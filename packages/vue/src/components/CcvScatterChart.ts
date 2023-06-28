import { ScatterChart, type ScatterChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<ScatterChartOptions>(ScatterChart, 'CcvScatterChart')
