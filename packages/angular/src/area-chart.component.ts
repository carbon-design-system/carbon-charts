import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { AreaChart } from "@carbon/charts";

/**
 * Wrapper around `AreaChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-area-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class AreaChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new AreaChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
