import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { AreaChart, type AreaChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `AreaChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-area-chart',
	template: ` <div #nChart class="ibm-chart-container"></div> `
})
export class AreaChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new AreaChart(this.chartRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as AreaChartOptions
		})

		Object.assign(this, this.chart)
	}
}
