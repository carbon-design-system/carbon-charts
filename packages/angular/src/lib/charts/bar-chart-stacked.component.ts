import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { StackedBarChart as StackedBarChartCore, type StackedBarChartOptions } from '@carbon/charts'

/**
 * Wrapper around `StackedBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-stacked-bar-chart',
	template: ``
})
export class StackedBarChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new StackedBarChartCore(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options as StackedBarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
