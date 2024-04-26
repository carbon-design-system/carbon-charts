import { WordCloudChart, type WordCloudChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<WordCloudChartOptions>(WordCloudChart, 'CcvWordCloudChart')
