import { ComboChart, type ComboChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<ComboChartOptions>(ComboChart, 'CcvComboChart')
