import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	BubbleChart as BubbleChartCore,
	type BubbleChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `BubbleChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-bubble-chart',
	template: ``
})
export class BubbleChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BubbleChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BubbleChartOptions
		})

		Object.assign(this, this.chart)
	}
}
