import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { GaugeChart as GaugeChartCore, type GaugeChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `GaugeChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-gauge-chart',
	template: ``
})
export class GaugeChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new GaugeChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as GaugeChartOptions
		})

		Object.assign(this, this.chart)
	}
}
