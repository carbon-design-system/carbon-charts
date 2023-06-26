import { BubbleChart, type BubbleChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<BubbleChartOptions>(BubbleChart, 'CcvBubbleChart')
