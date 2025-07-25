import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { PieChart as PieChartCore, type PieChartOptions } from '@carbon/charts'

/**
 * Wrapper around `PieChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-pie-chart, cc-pie',
	template: ``
})
export class PieChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new PieChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as PieChartOptions
		})

		Object.assign(this, this.chart)
	}
}
