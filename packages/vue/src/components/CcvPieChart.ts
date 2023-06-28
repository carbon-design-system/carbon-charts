import { PieChart, type PieChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<PieChartOptions>(PieChart, 'CcvPieChart')
