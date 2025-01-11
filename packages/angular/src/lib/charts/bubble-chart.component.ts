import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { BubbleChart as BubbleChartCore, type BubbleChartOptions } from '@carbon/charts'

/**
 * Wrapper around `BubbleChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-bubble-chart',
	standalone: true,
	template: ``
})
export class BubbleChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BubbleChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as BubbleChartOptions
		})

		Object.assign(this, this.chart)
	}
}
