import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { LineChart, type LineChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `LineChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-line-chart',
	template: ``
})
export class LineChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new LineChart(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as LineChartOptions
		})

		Object.assign(this, this.chart)
	}
}
