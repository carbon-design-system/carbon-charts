import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { AlluvialChart as AlluvialChartCore, type AlluvialChartOptions } from '@carbon/charts'

/**
 * Wrapper around `AlluvialChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-alluvial-chart',
	template: ``
})
export class AlluvialChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new AlluvialChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as AlluvialChartOptions
		})

		Object.assign(this, this.chart)
	}
}
