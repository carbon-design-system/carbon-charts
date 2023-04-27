import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'
import {
	MeterChart as MeterChartCore,
	type MeterChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `MeterChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-meter-chart',
	template: ``,
	standalone: true
})
export class MeterChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new MeterChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as MeterChartOptions
		})

		Object.assign(this, this.chart)
	}
}
