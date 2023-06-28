import { RadarChart, type RadarChartOptions } from '@carbon/charts'
import { chartFactory } from './chartFactory'

export default chartFactory<RadarChartOptions>(RadarChart, 'CcvRadarChart')
