import { Component, AfterViewInit } from '@angular/core'
import { BaseChart } from './base-chart.component'
import {
	SimpleBarChart as SimpleBarChartCore,
	type ChartTabularData,
	type BarChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `SimpleBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-simple-bar-chart',
	template: ``
})
export class SimpleBarChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new SimpleBarChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
