import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import {
	StackedAreaChart as StackedAreaChartCore,
	type StackedAreaChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `StackedAreaChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
    selector: 'ibm-stacked-area-chart',
    template: ``,
    standalone: true
})
export class StackedAreaChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new StackedAreaChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as StackedAreaChartOptions
		})

		Object.assign(this, this.chart)
	}
}
