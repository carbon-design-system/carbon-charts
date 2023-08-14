import { Chart } from '@/chart'
import { options } from '@/configuration'
import { mergeDefaultChartOptions } from '@/tools'
import type { ChartConfig } from '@/interfaces/model'
import type { GaugeChartOptions } from '@/interfaces/charts'
import { PieChartModel } from '@/model/pie'
import type { Component } from '@/components/component'
import { EXPERIMENTAL_SegmentedGauge } from '@/components/graphs/gauge-segmented'

export class EXPERIMENTAL_SegmentedGaugeChart extends Chart {
  model = new PieChartModel(this.services)
  constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<GaugeChartOptions>) {
    super(holder, chartConfigs)

    // Merge the default options for this chart
    // With the user provided options
    this.model.setOptions(mergeDefaultChartOptions(options.gaugeChart, chartConfigs.options))

    // Initialize data, services, components etc.
    this.init(holder, chartConfigs)
  }

  getComponents() {
    // Specify what to render inside the graph-frame
    const graphFrameComponents: Component[] = [
      new EXPERIMENTAL_SegmentedGauge(this.model, this.services)
    ]

    const components: Component[] = this.getChartComponents(graphFrameComponents)

    return components
  }
}
