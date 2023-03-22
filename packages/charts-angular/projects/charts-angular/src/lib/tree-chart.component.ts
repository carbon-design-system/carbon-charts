import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { TreeChart } from '@carbon/charts'

/**
 * Wrapper around `TreeChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-tree-chart',
	template: ``
})
export class TreeChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new TreeChart(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options
		})

		Object.assign(this, this.chart)
	}
}
