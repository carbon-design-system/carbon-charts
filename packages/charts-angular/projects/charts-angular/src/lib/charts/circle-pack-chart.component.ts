import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { CirclePackChart, type CirclePackChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `BubbleChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-circle-pack-chart',
	template: ``
})
export class CirclePackChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new CirclePackChart(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as CirclePackChartOptions
		})

		Object.assign(this, this.chart)
	}
}
