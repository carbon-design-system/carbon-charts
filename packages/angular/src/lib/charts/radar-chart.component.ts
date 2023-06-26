import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	RadarChart as RadarChartCore,
	type RadarChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `RadarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-radar-chart',
	template: ``
})
export class RadarChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new RadarChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as RadarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
