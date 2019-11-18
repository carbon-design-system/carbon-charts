import {
	Component,
	Input,
	AfterViewInit,
	ElementRef,
	OnDestroy
} from "@angular/core";

/**
 * Wrapper around `BaseChart` in sterling charts library
 *
 * Most functions just call their equivalent from the chart library.
 */
@Component({
	selector: "ibm-base-chart",
	template: ``
})
export class BaseChart implements AfterViewInit, OnDestroy {
	constructor(protected elementRef: ElementRef) {}

	/**
	 * Data passed to charts library for displaying
	 */
	@Input() set data(newData) {
		// If data already exists, that means the chart has been initialized
		const dataExistsAlready = this._data !== null && this._data !== undefined;

		this._data = newData;

		if (dataExistsAlready) {
			this.chart.model.setData(newData);
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
			this.chart.model.setOptions(newOptions);
		}
	}

	get options() {
		return this._options;
	}

	/**
	 * Chart object instance
	 *
	 * You can use this to do whatever you would normally do with a chart if you used
	 * charts library directly.
	 */
	chart;

	private _data: any;
	private _options: any;

	/**
	 * Runs after view init to create a chart, attach it to `chartRef` and draw it.
	 */
	ngAfterViewInit() {
		console.log("You need to implement your own `ngAfterViewInit()` function");
	}

	ngOnDestroy() {
		this.chart.destroy();
	}
}
