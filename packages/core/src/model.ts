// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";

// D3
import { scaleOrdinal } from "d3-scale";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class ChartModel {
	// Callbacks
	/**
	 * Function to be called when data or options update within the model
	 * @type Function
	 */
	private _updateCallback: Function;

	// Internal Model state
	private _state: any = {
		loading: false
	};

	// Data labels
	/**
	 * A list of all the labels that have existed within the lifetime of the chart
	 * @type Array<string>
	 */
	private _fixedDataLabels: Array<string>;

	// Fill scales & fill related objects
	private _patternScale = {};
	private _colorScale: any = {};
	// patternsService: PatternsService;

	/**
	 * @return {Array} The chart's display data
	 */
	getData() {
		return this.get("data");
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 * @return {Promise} The new display data that has been set
	 */
	setData(newData) {
		this.set({
			data: newData
		});

		return this._state.options;
	}

	/**
	 * @return {Object} The chart's options
	 */
	getOptions() {
		return this._state.options;
	}

	set(newState: any, skipUpdate?: boolean) {
		this._state = Object.assign({}, this._state, newState);

		if (!skipUpdate) {
			this.update();
		}
	}

	get(property?: string) {
		if (property) {
			return this._state[property];
		} else {
			return this._state;
		}
	}

	/**
	 *
	 * @param newOptions New options to be set
	 * @return {Object} The chart's options
	 */
	setOptions(newOptions) {
		this.set({
			options: newOptions
		});
	}


	/**
	 *
	 * @param newData New data to be set
	 * @param newOptions New options to be set
	 */
	setDataAndOptions(newData, newOptions) {
		if (newOptions) {
			this.setOptions(newOptions);
		}

		if (newData) {
			this.setData(newData);
		}
	}

	/**
	 *
	 * Updates miscellanous information within the model
	 * such as the color scales, or the legend data labels
	 */
	update() {
		if (this.get("data")) {
			this.updateFixedLabels();
			this.setColorScale();

			this._updateCallback();
		}
	}

	setUpdateCallback(cb: Function) {
		this._updateCallback = cb;
	}

	/*
	 * Data labels
	 *
	*/
	updateFixedLabels() {
		if (!this._fixedDataLabels) {
			this._fixedDataLabels = this.get("data").labels;
		} else {
			this.get("data").labels.forEach(element => {
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
		if (this.get("data").datasets[0].backgroundColors) {
			this.get("data").datasets.forEach(dataset => {
				this._colorScale[dataset.label] = scaleOrdinal().range(dataset.backgroundColors).domain(this._fixedDataLabels);
			});
		} else {
			const colors = Configuration.options.BASE.colors;
			this.get("data").datasets.forEach((dataset, i) => {
				this._colorScale[dataset.label] = scaleOrdinal().range([colors[i]]).domain(this._fixedDataLabels);
			});
		}
	}

	getFillColor(datasetLabel: any, label?: any, value?: any) {
		if (this.get("options").getFillColor && !this.get("options").accessibility) {
			return this.get("options").getFillColor(datasetLabel, label, value) || this.getFillScale()[datasetLabel](label);
		} else {
			return this.getFillScale()[datasetLabel](label);
		}
	}

	getStrokeColor(datasetLabel: any, label?: any, value?: any) {
		if (this.get("options").getStrokeColor) {
			return this.get("options").getStrokeColor(datasetLabel, label, value) || this._colorScale[datasetLabel](label);
		} else {
			return this._colorScale[datasetLabel](label);
		}
	}

	getFillScale() {
		return this.get("options").accessibility ? this._patternScale : this._colorScale;
	}
}
