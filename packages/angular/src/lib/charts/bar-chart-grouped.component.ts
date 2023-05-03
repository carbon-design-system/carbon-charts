import { Component, AfterViewInit } from '@angular/core'
import { BaseChart } from './base-chart.component'
import {
	GroupedBarChart as GroupedBarChartCore,
	type ChartTabularData,
	type BarChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `GroupedBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-grouped-bar-chart',
	template: ``
})
export class GroupedBarChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new GroupedBarChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
