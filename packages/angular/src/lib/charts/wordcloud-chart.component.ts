import { Component, AfterViewInit } from '@angular/core'
import { BaseChartComponent } from './base-chart.component'
import {
	WordCloudChart as WordCloudChartCore,
	type WordCloudChartOptions,
	type ChartTabularData
} from '@carbon/charts'

/**
 * Wrapper around `WordCloudChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
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
		this.chart = new WordCloudChartCore(this.elementRef.nativeElement, {
			data: this.data as ChartTabularData,
			options: this.options as WordCloudChartOptions
		})

		Object.assign(this, this.chart)
	}
}
