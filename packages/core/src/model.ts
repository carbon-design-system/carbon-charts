// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";
import { BaseChartOptions } from "./configuration";
import { scaleOrdinal } from "d3-scale";

export class ChartModel {
	// Chart configs & data
	private _rawData;
	private _data;
	private _options: BaseChartOptions = Tools.merge({}, Configuration.options.BASE);

	// Callbacks
	private _dataCallback: Function;

	// Loading state
	private _state = {
		loading: false
	};

	// Data labels
	private _fixedDataLabels;

	// Fill scales & fill related objects
	private _patternScale = {};
	private _colorScale = {};
	// patternsService: PatternsService;

	constructor(data) {
		if (data) {
			this.setData(data);
		} else {
			throw Error("Your configurations are missing the `data` field");
		}
	}

	/*
	 * Chart data & options
	 *
	*/
	getData() {
		return this._data;
	}

	private _setState(newState) {
		this._state = Object.assign({}, this._state, newState);
	}

	setData(newData) {
		this._setState({
			loading: true
		});

		return Promise.resolve(newData)
			.then(resolvedData => {
				this._rawData = resolvedData;
				this._data = resolvedData;

				this._setState({
					loading: false
				});

				this.modelUpdated();

				this._dataCallback(resolvedData);

				return this._data;
			});
	}

	getOptions() {
		return this._options;
	}

	setOptions(newOptions) {
		this._options = newOptions;

		this.modelUpdated();
	}

	modelUpdated() {
		this.updateFixedLabels();
		this.setColorScale();
	}

	setUpdateCallback(cb: Function) {
		this._dataCallback = cb;
	}

	/*
	 * Loading
	 *
	*/
	getState() {
		return this._state;
	}

	/*
	 * Data labels
	 *
	*/
	updateFixedLabels() {
		if (!this._fixedDataLabels) {
			this._fixedDataLabels = this._data.labels;
		} else {
			this._data.labels.forEach(element => {
				if (this._fixedDataLabels.indexOf(element) === -1) {
					this._fixedDataLabels.push(element);
				}
			});
		}
	}

	/*
	 * Fill scales
	 *
	*/
	setColorScale() {
		if (this._data.datasets[0].backgroundColors) {
			this._data.datasets.forEach(dataset => {
				this._colorScale[dataset.label] = scaleOrdinal().range(dataset.backgroundColors).domain(this._fixedDataLabels);
			});
		} else {
			const colors = Configuration.options.BASE.colors;
			this._data.datasets.forEach((dataset, i) => {
				this._colorScale[dataset.label] = scaleOrdinal().range([colors[i]]).domain(this._fixedDataLabels);
			});
		}
	}

	getFillColor(datasetLabel: any, label?: any, value?: any) {
		if (this._options.getFillColor && !this._options.accessibility) {
			return this._options.getFillColor(datasetLabel, label, value) || this.getFillScale()[datasetLabel](label);
		} else {
			return this.getFillScale()[datasetLabel](label);
		}
	}

	getStrokeColor(datasetLabel: any, label?: any, value?: any) {
		if (this._options.getStrokeColor) {
			return this._options.getStrokeColor(datasetLabel, label, value) || this._colorScale[datasetLabel](label);
		} else {
			return this._colorScale[datasetLabel](label);
		}
	}

	getFillScale() {
		return this._options.accessibility ? this._patternScale : this._colorScale;
	}
}
