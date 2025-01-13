import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { AreaChart as AreaChartCore, type AreaChartOptions } from '@carbon/charts'

/**
 * Wrapper around `AreaChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-area-chart',
	template: ``
})
export class AreaChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new AreaChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as AreaChartOptions
		})

		Object.assign(this, this.chart)
	}
}
