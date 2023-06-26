import { HeatmapChart, type HeatmapChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<HeatmapChartOptions>(HeatmapChart, 'CcvHeatmapChart')
