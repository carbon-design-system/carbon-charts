import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { HeatmapChart as HeatmapChartCore, type HeatmapChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `Heatmap` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-heatmap-chart',
	template: ``
})
export class HeatmapChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new HeatmapChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as HeatmapChartOptions
		})

		Object.assign(this, this.chart)
	}
}
