import {
	Component,
	AfterViewInit
} from "@angular/core";

import { BaseChart } from "./base-chart.component";

import { ScatterChart } from "@cui/charts";

/**
 * Wrapper around `ScatterChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-scatter-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class ScatterChartComponent extends BaseChart implements AfterViewInit {
	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		this.chart = new ScatterChart(
			this.chartRef.nativeElement,
			{
				data: this.data,
				options: this.options
			}
		);

		Object.assign(this, this.chart);
	}
}
