import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	WordCloudChart as WordCloudChartCore,
	type WorldCloudChartOptions,
	type WordCloudChartOptions
} from '@carbon/charts'

/**
 * Wrapper around `WordCloudChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: 'ibm-wordcloud-chart',
	standalone: true,
	template: ``
})
export class WordCloudChartComponent extends BaseChartComponent implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	override ngAfterViewInit() {
		this.chart = new WordCloudChartCore(this.elementRef.nativeElement as HTMLDivElement, {
			data: this.data,
			options: this.options as WordCloudChartOptions | WorldCloudChartOptions
		})

		Object.assign(this, this.chart)
	}
}
