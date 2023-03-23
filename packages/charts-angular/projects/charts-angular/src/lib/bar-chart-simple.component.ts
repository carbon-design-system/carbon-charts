import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { SimpleBarChart, type ChartTabularData, type BarChartOptions  } from '@carbon/charts'

/**
 * Wrapper around `SimpleBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-simple-bar-chart',
	template: ``
})
export class SimpleBarChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new SimpleBarChart(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
