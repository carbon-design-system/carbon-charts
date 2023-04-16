import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { StackedBarChart as StackedBarChartCore, type ChartTabularData, type StackedBarChartOptions } from '@carbon/charts'

/**
 * Wrapper around `StackedBarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
    selector: 'ibm-stacked-bar-chart',
    template: ``,
    standalone: true
})
export class StackedBarChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new StackedBarChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as StackedBarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
