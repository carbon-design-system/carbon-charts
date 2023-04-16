import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { LollipopChart as LollipopChartCore, type LollipopChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `LollipopChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
    selector: 'ibm-lollipop-chart',
    template: ``,
    standalone: true
})
export class LollipopChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new LollipopChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as LollipopChartOptions
		})

		Object.assign(this, this.chart)
	}
}
