import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { PieChart } from "@ibm-sterling/charts";

/**
 * Wrapper around `PieChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-pie-chart",
	template: ``
})
export class PieChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new PieChart(
			this.elementRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
