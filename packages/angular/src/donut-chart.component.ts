import {
	Component,
	AfterViewInit,
	ViewEncapsulation,
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { DonutChart } from "@carbon/charts";

/**
 * Wrapper around `DonutChart` in peretz charts library
 *
 * Most functions just call their equivalent from the chart library.
 *
 * @export
 * @class DonutChart
 * @extends {BaseChart}
 * @implements {AfterViewInit}
 */
@Component({
	selector: "n-donut-chart",
	template: `
		<div #nChart
			class='n-chart-container'>
		</div>
	`,
	styleUrls: ["./charts.scss"],
	encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 *
	 * @memberof DonutChart
	 */
	ngAfterViewInit() {
		this.chart = new DonutChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);

		// TODO - Fix issues with center updating
	}
}
