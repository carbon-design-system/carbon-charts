import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { ComboChart as ComboChartCore, type ComboChartOptions } from '@carbon/charts'

/**
 * Wrapper around `ComboChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-combo-chart',
	template: ``
})
export class ComboChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new ComboChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as ComboChartOptions
		})

		Object.assign(this, this.chart)
	}
}
