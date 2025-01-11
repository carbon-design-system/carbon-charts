import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { LollipopChart as LollipopChartCore, type LollipopChartOptions } from '@carbon/charts'

/**
 * Wrapper around `LollipopChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-lollipop-chart',
	standalone: true,
	template: ``
})
export class LollipopChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new LollipopChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as LollipopChartOptions
		})

		Object.assign(this, this.chart)
	}
}
