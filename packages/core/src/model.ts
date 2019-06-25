// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";
import { AxisChartOptions, ChartData, ChartConfig } from "./interfaces/index";
import { scaleOrdinal } from "d3-scale";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class ChartModel {
	// Chart configs & data
	/**
	 * Raw data before any possible processing or formatters were applied
	 * @type ChartData
	 */
	private _rawData: ChartData;

	/**
	 * Display data that was yielded after applying possible processing or formatters
	 * @type ChartData
	 */
	private _data: ChartData;

	/**
	 * Chart options
	 * @type BaseChartOptions
	 */
	private _options: AxisChartOptions = Tools.merge({}, Configuration.options.BASE);

	// Callbacks
	/**
	 * Function to be called when data updates within the model
	 * @type Function
	 */
	private _dataCallback: Function;

	// Loading state
	private _state = {
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
	private _colorScale = {};
	// patternsService: PatternsService;

	/**
     * Sets the chart data, and if not present, throws an Error() instance
     * @param ChartData data The data to be set to the chart
     */
	constructor(configs: ChartConfig<any>) {
		this._options = configs.options;

		if (configs.data) {
			this.setData(configs.data);
		} else {
			throw Error("Your configurations are missing the `data` field");
		}
	}

	/**
	 * @return {Array} The chart's display data
	 */
	getData() {
		return this._data;
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 * @return {Promise} The new display data that has been set
	 */
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

				// this.modelUpdated();

				// this._dataCallback(resolvedData);

				return this._data;
			});
	}

	/**
	 * @return {Object} The chart's options
	 */
	getOptions() {
		return this._options;
	}

	/**
	 *
	 * @param newOptions New options to be set
	 * @return {Object} The chart's options
	 */
	setOptions(newOptions) {
		this._options = newOptions;

		this.modelUpdated();
	}

	/**
	 *
	 * Updates miscellanous information within the model
	 * such as the color scales, or the legend data labels
	 */
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

	/*
	 * Chart data & options
	 *
	*/
	private _setState(newState) {
		this._state = Object.assign({}, this._state, newState);

		if (this._dataCallback) {
			this.modelUpdated();
			this._dataCallback();
		}
	}
}
