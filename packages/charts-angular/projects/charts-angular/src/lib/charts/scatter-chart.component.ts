import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { ScatterChart, type ScatterChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `ScatterChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-scatter-chart',
	template: ``
})
export class ScatterChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new ScatterChart(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as ScatterChartOptions
		})

		Object.assign(this, this.chart)
	}
}
