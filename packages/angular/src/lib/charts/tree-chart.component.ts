import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import {
	TreeChart as TreeChartCore,
	type TreemapChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `TreeChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-tree-chart',
	template: ``,
	standalone: true
})
export class TreeChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new TreeChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as TreemapChartOptions
		})

		Object.assign(this, this.chart)
	}
}
