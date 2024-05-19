import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { GaugeChart as GaugeChartCore, type GaugeChartOptions } from '@carbon/charts'

/**
 * Wrapper around `GaugeChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-gauge-chart',
	template: ``
})
export class GaugeChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new GaugeChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as GaugeChartOptions
		})

		Object.assign(this, this.chart)
	}
}
