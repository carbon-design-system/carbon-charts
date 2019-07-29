// Internal Imports
import * as Configuration from "./configuration";

// D3
import { scaleOrdinal } from "d3-scale";
import { Tools } from "./tools";

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
	getDisplayData() {
		return this.get("data");
	}

	/**
	 * @return {Array} The chart's display data
	 */
	getRawData() {
		return this.get("rawData");
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 * @return {Promise} The new display data that has been set
	 */
	setData(newData) {
		const dataLabels = {};
		newData.datasets.forEach(dataset => {
			dataLabels[dataset.label] = Configuration.legend.items.status.ACTIVE;
		});

		this.set({
			data: newData,
			rawData: newData,
			dataLabels
		});

		return this._state.data;
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
		if (this.getDisplayData()) {
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
			this._fixedDataLabels = this.getDisplayData().labels;
		} else {
			this.getDisplayData().labels.forEach(element => {
				if (this._fixedDataLabels.indexOf(element) === -1) {
					this._fixedDataLabels.push(element);
				}
			});
		}
	}

	applyDataFilter(changedLabel: string) {
		const { ACTIVE, DISABLED } = Configuration.legend.items.status;
		const dataLabels = this.get("dataLabels");
		const rawData = Tools.clone(this.getRawData());
		const oldStatus = dataLabels[changedLabel];

		dataLabels[changedLabel] = (oldStatus === ACTIVE ? DISABLED : ACTIVE);
		const newDisplayData = rawData;
		newDisplayData.datasets = newDisplayData.datasets.filter(dataset => dataLabels[dataset.label] === ACTIVE);

		this.set({
			dataLabels,
			data: newDisplayData
		});

		this.update();
	}

	/*
	 * Fill scales
	 *
	*/
	setColorScale() {
		if (this.getDisplayData().datasets[0].backgroundColors) {
			this.getDisplayData().datasets.forEach(dataset => {
				this._colorScale[dataset.label] = scaleOrdinal().range(dataset.backgroundColors).domain(this._fixedDataLabels);
			});
		} else {
			const colors = Configuration.options.BASE.colors;
			this.getDisplayData().datasets.forEach((dataset, i) => {
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
