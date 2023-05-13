import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	LineChart as LineChartCore,
	type LineChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `LineChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-line-chart',
	template: ``
})
export class LineChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new LineChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as LineChartOptions
		})

		Object.assign(this, this.chart)
	}
}
