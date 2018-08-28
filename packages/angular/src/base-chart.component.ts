import {
	Component,
	Input,
	AfterViewInit,
	ViewChild
} from "@angular/core";

/**
 * Wrapper around `BaseChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 *
 * @export
 * @class BaseChart
 * @implements {AfterViewInit}
 */
@Component({
	selector: "n-base-chart",
	template: `
		<div #nChart class='n-chart-container'>
		</div>
	`
})
export class BaseChart implements AfterViewInit {
	/**
	 * Data passed to charts library for displaying
	 *
	 * @type {*}
	 * @memberof BaseChart
	 */
	@Input() set data(newData) {
		// If data already exists, that means the chart has been initialized
		const dataExistsAlready = this._data !== null && this._data !== undefined;

		this._data = newData;

		if (dataExistsAlready) {
			this.chart.setData(newData);
		}
	}

	get data() {
		return this._data;
	}

	/**
	 * Options passed to charts library
	 *
	 * @type {*}
	 * @memberof BaseChart
	 */
	@Input() options: any;
	/**
	 * Chart container element ref
	 *
	 * @memberof BaseChart
	 */
	@ViewChild("nChart") chartRef;

	/**
	 * Chart object instance
	 *
	 * You can use this to do whatever you would normally do with a chart if you used
	 * charts library directly.
	 *
	 * @memberof BaseChart
	 */
	chart;

	private _data: any;

	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 *
	 * @memberof BaseChart
	 */
	ngAfterViewInit() {
		console.log("You need to implement your own `ngAfterViewInit()` function");
	}
}
