import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { HistogramChart as HistogramChartCore, type HistogramChartOptions } from '@carbon/charts'

/**
 * Wrapper around `HistogramChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-histogram-chart',
	template: ``
})
export class HistogramChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new HistogramChartCore(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options as HistogramChartOptions
		})

		Object.assign(this, this.chart)
	}
}
