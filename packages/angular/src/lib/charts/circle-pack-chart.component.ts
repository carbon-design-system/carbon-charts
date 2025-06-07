import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { CirclePackChart as CirclePackChartCore, type CirclePackChartOptions } from '@carbon/charts'

/**
 * Wrapper around `CirclePackChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-circle-pack-chart, cc-circle-pack',
	template: ``
})
export class CirclePackChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new CirclePackChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as CirclePackChartOptions
		})

		Object.assign(this, this.chart)
	}
}
