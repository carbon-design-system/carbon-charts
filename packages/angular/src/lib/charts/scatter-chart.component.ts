import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { ScatterChart as ScatterChartCore, type ScatterChartOptions } from '@carbon/charts'

/**
 * Wrapper around `ScatterChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-scatter-chart',
	template: ``
})
export class ScatterChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new ScatterChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as ScatterChartOptions
		})

		Object.assign(this, this.chart)
	}
}
