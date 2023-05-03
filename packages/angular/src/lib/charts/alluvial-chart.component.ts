import { Component, AfterViewInit } from '@angular/core'
import { BaseChart } from './base-chart.component'
import {
	AlluvialChart as AlluvialChartCore,
	type AlluvialChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `Alluvial` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-alluvial-chart',
	template: ``
})
export class AlluvialChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new AlluvialChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as AlluvialChartOptions
		})

		Object.assign(this, this.chart)
	}
}
