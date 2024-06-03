import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	ExperimentalChoroplethChart as ChoroplethChartCore,
	type ChoroplethChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `ExperimentalChoroplethChart` from core.
 *
 * Most functions from the core class are exposed.
 * @experimental
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
		this.chart = new ChoroplethChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as ChoroplethChartOptions
		})

		Object.assign(this, this.chart)
	}
}
