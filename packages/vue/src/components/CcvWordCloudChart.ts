import {
	WordCloudChart,
	type WordCloudChartOptions,
	type WorldCloudChartOptions
} from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<WordCloudChartOptions | WorldCloudChartOptions>(
	WordCloudChart,
	'CcvWordCloudChart'
)
