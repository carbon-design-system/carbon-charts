import { Component, AfterViewInit } from '@angular/core'

import { BaseChart } from './base-chart.component'

import { TreemapChart as TreemapChartCore, type TreemapChartOptions, type ChartTabularData } from '@carbon/charts'

/**
 * Wrapper around `TreemapChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
    selector: 'ibm-treemap-chart',
    template: ``,
    standalone: true
})
export class TreemapChart extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new TreemapChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as TreemapChartOptions
		})

		Object.assign(this, this.chart)
	}
}
