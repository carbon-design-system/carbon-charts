import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { PieChart as PieChartCore, type PieChartOptions } from '@carbon/charts'

/**
 * Wrapper around `PieChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-pie-chart',
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
