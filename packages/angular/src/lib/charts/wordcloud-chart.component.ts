import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	WordCloudChart as WordCloudChartCore,
	type WorldCloudChartOptions as WordCloudChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `WordCloudChart` from core.
 *
 * Most functions from the core class are exposed.
 */
@Component({
	selector: 'ibm-wordcloud-chart',
	template: ``
})
export class WordCloudChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new WordCloudChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as WordCloudChartOptions
		})

		Object.assign(this, this.chart)
	}
}
