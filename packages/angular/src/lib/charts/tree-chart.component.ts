import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { TreeChart as TreeChartCore } from '@carbon/charts'

/**
 * Wrapper around `TreeChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-tree-chart',
	template: ``
})
export class TreeChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new TreeChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options
		})

		Object.assign(this, this.chart)
	}
}
