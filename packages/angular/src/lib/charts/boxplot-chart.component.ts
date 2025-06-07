import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { BoxplotChart as BoxplotChartCore, type BoxplotChartOptions } from '@carbon/charts'

/**
 * Wrapper around `BoxplotChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-boxplot-chart, cc-boxplot',
	template: ``
})
export class BoxplotChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BoxplotChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as BoxplotChartOptions
		})

		Object.assign(this, this.chart)
	}
}
