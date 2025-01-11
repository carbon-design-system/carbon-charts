import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import { RadarChart as RadarChartCore, type RadarChartOptions } from '@carbon/charts'

/**
 * Wrapper around `RadarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-radar-chart',
	standalone: true,
	template: ``
})
export class RadarChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new RadarChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as RadarChartOptions
		})

		Object.assign(this, this.chart)
	}
}
