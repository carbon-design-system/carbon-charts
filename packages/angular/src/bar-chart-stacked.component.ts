import {
	Component,
	AfterViewInit,
	ElementRef
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { StackedBarChart } from "@ibm-sterling/charts";

/**
 * Wrapper around `StackedBarChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-stacked-bar-chart",
	template: ``
})
export class StackedBarChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new StackedBarChart(
			this.elementRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
