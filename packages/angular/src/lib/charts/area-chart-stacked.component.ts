import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	StackedAreaChart as StackedAreaChartCore,
	type StackedAreaChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `StackedAreaChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-stacked-area-chart',
	standalone: true,
	template: ``
})
export class StackedAreaChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new StackedAreaChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as StackedAreaChartOptions
		})

		Object.assign(this, this.chart)
	}
}
