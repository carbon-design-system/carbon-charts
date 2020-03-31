// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";
import * as colorPalettes from "./services/colorPalettes";
import { Events } from "./interfaces";

// D3
import { scaleOrdinal } from "d3-scale";
import { map } from "d3-collection";
import { stack } from "d3-shape";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class ChartModel {
	// Callbacks
	/**
	 * Function to be called when data or options update within the model
	 * @type Function
	 */
	protected updateCallback: Function;
	protected services: any;

	// Internal Model state
	protected state: any = {
		options: {}
	};

	// Data labels
	/**
	 * A list of all the data groups that have existed within the lifetime of the chart
	 * @type string[]
	 */
	protected allDataGroups: string[];

	// Fill scales & fill related objects
	protected colorScale: any = {};

	constructor(services: any) {
		this.services = services;
	}

	/**
	 * Converts data provided in the older format to tabular
	 * 
	 */
	protected transformToTabularData(data) {
		console.warn("We've updated the charting data format to be tabular by default. The current format you're using is deprecated and will be removed in v1.0, read more here")
		const tabularData = [];
		const { datasets, labels } = data;

		// Loop through all datasets
		datasets.forEach(dataset => {
			const group = dataset.label;

			// Update each data point to the new format
			dataset.data.forEach((datum, i) => {
				const updatedDatum = {
					group,
					key: labels[i]
				};

				if (isNaN(datum)) {
					updatedDatum["value"] = datum.value;
					updatedDatum["date"] = datum.date;
				} else {
					updatedDatum["value"] = datum;
				}

				tabularData.push(updatedDatum);
			});
		});

		return tabularData;
	}

	protected sanitize(data) {
		// if data is not an array
		if (!Array.isArray(data)) {
			return this.transformToTabularData(data);
		}

		return data;
	}

	getDisplayData() {
		if (!this.get("data")) {
			return null;
		}

		const { ACTIVE } = Configuration.legend.items.status;
		const dataGroups = this.getDataGroups();

		// Remove datasets that have been disabled
		const displayData = Tools.clone(this.get("data"));
		const { groupIdentifier } = this.getOptions().data;

		return displayData.filter(datum => {
			const group = dataGroups.find(group => group.name === datum[groupIdentifier]);

			return group.status === ACTIVE;
		});
	}

	getData() {
		return this.get("data");
	}

	isDataEmpty() {
		return !this.getData().length;
	}

	/**
	 *
	 * @param newData The new raw data to be set
	 */
	setData(newData) {
		const sanitizedData = this.sanitize(Tools.clone(newData));
		const dataGroups = this.generateDataGroups(sanitizedData);

		this.set({
			data: sanitizedData,
			dataGroups
		});

		return sanitizedData;
	}

	/*
	 * Data groups
	*/
	protected updateAllDataGroups() {
		// If allDataGroups hasn't been initialized yet
		// Set it to the current set of data groups
		if (!this.allDataGroups) {
			this.allDataGroups = this.getDataGroups().map(group => group.name);
		} else {
			// Loop through current data groups
			this.getDataGroups().forEach(dataGroup => {
				// If group name hasn't been stored yet, store it
				if (this.allDataGroups.indexOf(dataGroup.name) === -1) {
					this.allDataGroups.push(dataGroup.name);
				}
			});
		}
	}

	protected generateDataGroups(data) {
		const { groupIdentifier } = this.getOptions().data;
		const { ACTIVE } = Configuration.legend.items.status;

		const uniqueDataGroups = map(data, datum => datum[groupIdentifier]).keys();
		return uniqueDataGroups.map(groupName => ({
			name: groupName,
			status: ACTIVE
		}));
	}

	getDataGroups() {
		return this.get("dataGroups");
	}


	getDataGroupNames() {
		return this.get("dataGroups").map(dataGroup => dataGroup.name);
	}

	getGroupedData() {
		const displayData = this.getDisplayData();
		const groupedData = {};
		const { groupIdentifier } = this.getOptions().data;

		displayData.map(datum => {
			const group = datum[groupIdentifier];
			if (groupedData[group] !== null && groupedData[group] !== undefined) {
				groupedData[group].push(datum);
			} else {
				groupedData[group] = [datum];
			}
		});

		return Object.keys(groupedData)
			.map(groupName => {
				return {
					name: groupName,
					data: groupedData[groupName]
				};
			});
	}

	getDataValuesGroupedByKeys() {
		const options = this.getOptions();
		const { groupIdentifier } = options.data;

		const displayData = this.getDisplayData();
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		const stackKeys = map(displayData, datum => datum[domainIdentifier]).keys();
		const dataGroupNames = this.getDataGroupNames();

		return stackKeys.map(key => {
			const correspondingValues = { sharedStackKey: key };
			dataGroupNames.forEach(dataGroupName => {
				const correspondingDatum = displayData.find(datum => {
					return datum[groupIdentifier] === dataGroupName &&
						`${datum[domainIdentifier]}` === key;
				});

				correspondingValues[dataGroupName] = correspondingDatum ? correspondingDatum[rangeIdentifier] : null;
			});
			return correspondingValues;
		}) as any;
	}

	getStackedData() {
		const options = this.getOptions();
		const { groupIdentifier } = options.data;

		const dataGroupNames = this.getDataGroupNames();
		const dataValuesGroupedByKeys = this.getDataValuesGroupedByKeys();

		return stack().keys(dataGroupNames)(dataValuesGroupedByKeys)
			.map((series, i) => {
				// Add data group names to each serie
				return Object.keys(series)
					.filter((key: any) => !isNaN(key))
					.map(key => {
						const element = series[key];
						element[groupIdentifier] = dataGroupNames[i];

						return element;
					});
			});
	}

	/**
	 * @return {Object} The chart's options
	 */
	getOptions() {
		return this.state.options;
	}

	set(newState: any, skipUpdate = false) {
		this.state = Object.assign({}, this.state, newState);

		if (!skipUpdate) {
			this.update();
		}
	}

	get(property?: string) {
		if (property) {
			return this.state[property];
		} else {
			return this.state;
		}
	}

	/**
	 *
	 * @param newOptions New options to be set
	 */
	setOptions(newOptions) {
		this.set({
			options: Tools.merge(this.getOptions(), newOptions)
		});
	}

	/**
	 *
	 * Updates miscellanous information within the model
	 * such as the color scales, or the legend data labels
	 */
	update() {
		if (!this.getDisplayData()) {
			return;
		}

		this.updateAllDataGroups();

		this.setColorScale();
		this.services.events.dispatchEvent("model-update");
	}

	setUpdateCallback(cb: Function) {
		this.updateCallback = cb;
	}

	/*
	 * Data labels
	*/
	toggleDataLabel(changedLabel: string) {
		const { ACTIVE, DISABLED } = Configuration.legend.items.status;
		const dataGroups = this.getDataGroups();

		const hasDeactivatedItems = dataGroups.some(group => group.status === DISABLED);
		const activeItems = dataGroups.filter(group => group.status === ACTIVE);

		// If there are deactivated items, toggle "changedLabel"
		if (hasDeactivatedItems) {
			// If the only active item is being toggled
			// Activate all items
			if (activeItems.length === 1 && activeItems[0].name === changedLabel) {
				// If every item is active, then enable "changedLabel" and disable all other items
				dataGroups.forEach((group, i) => {
					dataGroups[i].status = ACTIVE;
				});
			} else {
				const indexToChange = dataGroups.findIndex(group => group.name === changedLabel);
				dataGroups[indexToChange].status = dataGroups[indexToChange].status === DISABLED ? ACTIVE : DISABLED;
			}
		} else {
			// If every item is active, then enable "changedLabel" and disable all other items
			dataGroups.forEach((group, i) => {
				dataGroups[i].status = (group.name === changedLabel ? ACTIVE : DISABLED);
			});
		}

		// Update model
		this.set({
			dataGroups
		});
	}

	/*
	 * Fill scales
	*/
	protected setColorScale() {
		const colors = colorPalettes.DEFAULT;
		this.colorScale = scaleOrdinal().range(colors)
			.domain(this.allDataGroups);
	}

	/**
	 * Should the data point be filled?
	 * @param group
	 * @param key
	 * @param value
	 * @param defaultFilled the default for this chart
	 */
	getIsFilled(group: any, key?: any, data?: any, defaultFilled?: boolean) {
		const options = this.getOptions();
		if (options.getIsFilled) {
			return options.getIsFilled(group, key, data, defaultFilled);
		} else {
			return defaultFilled;
		}
	}

	getFillColor(group: any, key?: any, data?: any) {
		const options = this.getOptions();
		const defaultFillColor = this.getFillScale()(group);
		if (options.getFillColor) {
			return options.getFillColor(group, key, data, defaultFillColor);
		} else {
			return defaultFillColor;
		}
	}

	getStrokeColor(group: any, key?: any, data?: any) {
		const options = this.getOptions();
		const defaultStrokeColor = this.colorScale(group);
		if (options.getStrokeColor) {
			return options.getStrokeColor(group, key, data, defaultStrokeColor);
		} else {
			return defaultStrokeColor;
		}
	}

	getFillScale() {
		return this.colorScale;
	}
}
