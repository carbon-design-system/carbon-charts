import { StackedBarChart as StackedBarChartCore } from '@carbon/charts'
import type { StackedBarChartOptions } from '@carbon/charts/interfaces'
import BaseChart from './BaseChart'

export default class BarChartStacked extends BaseChart<
	StackedBarChartCore,
	StackedBarChartOptions
> {}
