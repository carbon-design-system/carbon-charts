import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";
import { BarChart } from "@carbon/charts";

/**
 * Wrapper around `BarChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 *
 * @export
 * @class BarChart
 * @extends {BaseChart}
 * @implements {AfterViewInit}
 */
@Component({
	selector: "n-bar-chart",
	template: `
		<div #nChart class='n-chart-container'>
		</div>
	`
})
export class BarChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 *
	 * @memberof BarChart
	 */
	ngAfterViewInit() {
		this.chart = new BarChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
