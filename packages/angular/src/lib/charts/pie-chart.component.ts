import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	PieChart as PieChartCore,
	type PieChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `PieChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
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
		this.chart = new PieChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as PieChartOptions
		})

		Object.assign(this, this.chart)
	}
}
