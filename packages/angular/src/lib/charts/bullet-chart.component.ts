import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { BulletChart as BulletChartCore, type BulletChartOptions } from '@carbon/charts'

/**
 * Wrapper around `BulletChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-bullet-chart',
	template: ``
})
export class BulletChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BulletChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as BulletChartOptions
		})

		Object.assign(this, this.chart)
	}
}
