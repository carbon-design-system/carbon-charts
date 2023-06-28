import { AlluvialChart, type AlluvialChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<AlluvialChartOptions>(AlluvialChart, 'CcvAlluvialChart')
