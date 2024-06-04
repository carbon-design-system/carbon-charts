import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { MeterChart as MeterChartCore, type MeterChartOptions } from '@carbon/charts'

/**
 * Wrapper around `MeterChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-meter-chart',
	template: ``
})
export class MeterChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new MeterChartCore(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options as MeterChartOptions
		})

		Object.assign(this, this.chart)
	}
}
