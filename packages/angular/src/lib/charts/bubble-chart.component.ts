import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { BubbleChart as BubbleChartCore, type BubbleChartOptions } from '@carbon/charts'

/**
 * Wrapper around `BubbleChart` from core.
 *
 * Most functions from the core class are exposed.
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
		this.chart = new BubbleChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as BubbleChartOptions
		})

		Object.assign(this, this.chart)
	}
}
