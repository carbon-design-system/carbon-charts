import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { GroupedBarChart as GroupedBarChartCore, type BarChartOptions } from '@carbon/charts'

/**
 * Wrapper around `GroupedBarChart` from core.
 *
 * Most functions from the core class are exposed.
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
		this.chart = new GroupedBarChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as BarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
