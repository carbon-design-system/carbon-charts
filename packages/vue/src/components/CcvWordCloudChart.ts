import { WordCloudChart, type WorldCloudChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<WorldCloudChartOptions>(WordCloudChart, 'CcvWordCloudChart')
