import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import {
	BulletChart as BulletChartCore,
	type BulletChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `BulletChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-bullet-chart',
	template: ``,
	standalone: true
})
export class BulletChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new BulletChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as BulletChartOptions
		})

		Object.assign(this, this.chart)
	}
}
