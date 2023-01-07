import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { EXPERIMENTAL_ChoroplethChart } from "@carbon/charts";

/**
 * Wrapper around `Alluvial` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "experimental-ibm-choropleth-chart",
	template: ``
})
export class EXPERIMENTAL_ChoroplethChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `elementRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new EXPERIMENTAL_ChoroplethChart(
			this.elementRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
