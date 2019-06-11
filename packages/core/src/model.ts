// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";
import { ChartConfig, BaseChartOptions } from "./configuration";
import { DOMUtils } from "./dom-utils";

export class ChartModel {
	private _data;
	private _options: BaseChartOptions = Tools.merge({}, Configuration.options.BASE);

	private _dataCallback: Function;

	constructor(data) {
		if (data) {
			this.setData(data);
		} else {
			throw Error("Your configurations are missing the `data` field");
		}
	}

	setCallback(cb: Function) {
		this._dataCallback = cb;
	}

	getData() {
		return this._data;
	}

	setData(newData) {
		this._data = newData;

		return Promise.resolve(newData)
			.then(value => {
				this._data = value;

				this._dataCallback(value);

				return this._data;
			});
	}

	getOptions() {
		return this._options;
	}

	setOptions(newOptions) {
		this._options = newOptions;
	}
}
