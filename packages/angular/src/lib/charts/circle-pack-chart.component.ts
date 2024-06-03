import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { CirclePackChart as CirclePackChartCore, type CirclePackChartOptions } from '@carbon/charts'

/**
 * Wrapper around `CirclePackChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-circle-pack-chart',
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
