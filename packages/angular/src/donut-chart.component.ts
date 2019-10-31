import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { DonutChart } from "@sterling/charts";

/**
 * Wrapper around `DonutChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-donut-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class DonutChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
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
