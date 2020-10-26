import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { ConfidenceIntervalChart } from "@carbon/charts";

/**
 * Wrapper around `ConfidenceIntervalChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-confidence-interval-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class ConfidenceIntervalChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new ConfidenceIntervalChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
