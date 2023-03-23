import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { BoxplotChart, type ChartTabularData, type BoxplotChartOptions } from '@carbon/charts'

/**
 * Wrapper around `BoxplotChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-boxplot-chart',
	template: ``
})
export class BoxplotChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BoxplotChart(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BoxplotChartOptions
		})

		Object.assign(this, this.chart)
	}
}
