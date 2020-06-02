import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { DonutChart } from "@carbon/charts";

/**
 * Wrapper around `DonutChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-donut-chart",
	template: ``
})
export class DonutChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new DonutChart(
			this.elementRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
