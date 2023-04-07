import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'
import { ComboChart as ComboChartCore, type ComboChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `ComboChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-combo-chart',
	template: ``
})
export class ComboChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new ComboChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as ComboChartOptions
		})

		Object.assign(this, this.chart)
	}
}
