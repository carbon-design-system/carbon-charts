import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { TreemapChart as TreemapChartCore, type TreemapChartOptions } from '@carbon/charts'

/**
 * Wrapper around `TreemapChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-treemap-chart',
	template: ``
})
export class TreemapChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new TreemapChartCore(this.elementRef.nativeElement, {
			data: this.data,
			options: this.options as TreemapChartOptions
		})

		Object.assign(this, this.chart)
	}
}
