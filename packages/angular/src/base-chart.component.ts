import {
	Component,
	Input,
	ViewChild,
	OnInit,
	AfterViewInit
} from "@angular/core";

/**
 * Wrapper around `BaseChart` in carbon charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-base-chart, n-base-chart",
	template: `
		<div #nChart class="ibm-chart-container">
		</div>
	`
})
export class BaseChart implements AfterViewInit, OnInit {
	/**
	 * Data passed to charts library for displaying
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
	 */
	@Input() set options(newOptions) {
		// If data already exists, that means the chart has been initialized
		const optionsExistAlready = this._options !== null && this._options !== undefined;

		this._options = newOptions;

		if (optionsExistAlready) {
			this.chart.setOptions(newOptions);
		}
	}

	get options() {
		return this._options;
	}

	/**
	 * Chart width
	 */
	@Input() width: any;

	/**
	 * Chart height
	 */
	@Input() height: any;

	/**
	 * Chart container element ref
	 */
	@ViewChild("nChart") chartRef;

	/**
	 * Chart object instance
	 *
	 * You can use this to do whatever you would normally do with a chart if you used
	 * charts library directly.
	 */
	chart;

	private _data: any;
	private _options: any;

	ngOnInit() {
		// Width prop is mandatory for the wrappers
		if (this.width) {
			this._options.width = this.width;
		} else if (!this._options.width) {
			console.error("Missing `width` Input!");
		}

		// Height prop is mandatory for the wrappers
		if (this.height) {
			this._options.height = this.height;
		} else if (!this._options.height) {
			console.error("Missing `height` Input!");
		}
	}

	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		console.log("You need to implement your own `ngAfterViewInit()` function");
	}
}
