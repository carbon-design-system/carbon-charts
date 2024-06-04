import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	ChoroplethChart as ChoroplethChartCore,
	type ChoroplethChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `Choropleth` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-experimental-choropleth-chart',
	template: ``
})
export class ExperimentalChoroplethChartComponent
	extends BaseChartComponent
	implements AfterViewInit
{
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new ChoroplethChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as ChoroplethChartOptions
		})

		Object.assign(this, this.chart)
	}
}
