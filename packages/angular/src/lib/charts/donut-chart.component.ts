import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	DonutChart as DonutChartCore,
	type DonutChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `DonutChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-donut-chart',
	template: ``
})
export class DonutChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new DonutChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as DonutChartOptions
		})

		Object.assign(this, this.chart)
	}
}
