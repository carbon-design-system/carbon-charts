import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { StackedBarChart } from "@sterling/charts";

/**
 * Wrapper around `StackedBarChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-stacked-bar-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class StackedBarChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new StackedBarChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
