import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { TreemapChart as TreemapChartCore } from '@carbon/charts'

/**
 * Wrapper around `TreemapChart` from core.
 *
 * Most functions from the core class are exposed.
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
		this.chart = new TreemapChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options
		})

		Object.assign(this, this.chart)
	}
}
