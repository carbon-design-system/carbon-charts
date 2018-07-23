import {
	Component,
	AfterViewInit,
	ViewEncapsulation,
} from "@angular/core";

import { BaseChart } from "./base-chart.component";
import { LineChart } from "@peretz/charts/bundle/bundle.js";

/**
 * Wrapper around `LineChart` in peretz charts library
 *
 * Most functions just call their equivalent from the chart library.
 *
 * @export
 * @class LineChart
 * @extends {BaseChart}
 * @implements {AfterViewInit}
 */
@Component({
	selector: "n-line-chart",
	template: `
		<div #nChart
			class='n-chart-container'>
		</div>
	`,
	styleUrls: ["./charts.scss"],
	encapsulation: ViewEncapsulation.None
})
export class LineChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 *
	 * @memberof LineChart
	 */
	ngAfterViewInit() {
		this.chart = new LineChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
