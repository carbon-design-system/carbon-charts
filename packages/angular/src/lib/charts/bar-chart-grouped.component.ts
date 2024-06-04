import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { GroupedBarChart as GroupedBarChartCore, type BarChartOptions } from '@carbon/charts'

/**
 * Wrapper around `GroupedBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-grouped-bar-chart',
	template: ``
})
export class GroupedBarChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new GroupedBarChartCore(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options as BarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
