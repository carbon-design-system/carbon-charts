// Internal Imports
import * as Configuration from "./configuration";
import { ChartModel } from "./model";
import { Tools } from "./tools";
import * as colorPalettes from "./services/colorPalettes";

// D3 Imports
import { scaleOrdinal } from "d3-scale";

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
export class PieChartModel extends ChartModel {
	constructor(services: any) {
		super(services);
	}

	generateDataLabels(newData) {
		const dataLabels = {};
		newData.labels.forEach(label => {
			dataLabels[label] = Configuration.legend.items.status.ACTIVE;
		});

		return dataLabels;
	}

	getDisplayData() {
		const { ACTIVE } = Configuration.legend.items.status;
		const dataLabels = this.get("dataLabels");

		if (!this.get("data")) {
			return null;
		}

		// Remove datasets that have been disabled
		const displayData = Tools.clone(this.get("data"));
		const dataset = displayData.datasets[0];

		// Remove data values that correspond to labels that are disabled
		dataset.data = dataset.data.filter((datum, i) => {
			const label = displayData.labels[i];

			return dataLabels[label] === ACTIVE;
		});

		// Remove labels that are disabled
		displayData.labels = displayData.labels.filter(label => dataLabels[label] === ACTIVE);

		return displayData;
	}


	/*
	 * Data labels
	*/
	toggleDataLabel(changedLabel: string) {
		const { ACTIVE, DISABLED } = Configuration.legend.items.status;
		const dataLabels = this.get("dataLabels");

		const hasDeactivatedItems = Object.keys(dataLabels).some(label => dataLabels[label] === DISABLED);
		const activeItems = Object.keys(dataLabels).filter(label => dataLabels[label] === ACTIVE);
		// If there are deactivated items, toggle "changedLabel"
		if (hasDeactivatedItems) {
			// If the only active item is being toggled
			// Activate all items
			if (activeItems.length === 1 && activeItems[0] === changedLabel) {
				// If every item is active, then enable "changedLabel" and disable all other items
				Object.keys(dataLabels).forEach(label => {
					dataLabels[label] = ACTIVE;
				});
			} else {
				dataLabels[changedLabel] = dataLabels[changedLabel] === DISABLED ? ACTIVE : DISABLED;
			}
		} else {
			// If every item is active, then enable "changedLabel" and disable all other items
			Object.keys(dataLabels).forEach(label => {
				dataLabels[label] = (label === changedLabel ? ACTIVE : DISABLED);
			});
		}

		// Update model
		this.set({
			dataLabels
		});
	}

	/*
	 * Fill scales
	*/
	setColorScale() {
		const dataset = this.getDisplayData().datasets[0];
		if (dataset.fillColors) {
			this.colorScale = scaleOrdinal().range(dataset.fillColors).domain(this.allDataLabels);
		} else {
			const colors = colorPalettes.DEFAULT;
			this.colorScale = scaleOrdinal().range(colors).domain(this.allDataLabels);
		}
	}


	getFillColor(label: string) {
		const options = this.getOptions();
		if (options.getFillColor) {
			return options.getFillColor(label);
		}

		return this.getFillScale()(label);
	}

	getStrokeColor(label: string) {
		const options = this.getOptions();
		if (options.getStrokeColor) {
			return options.getStrokeColor(label);
		}

		return this.colorScale(label);
	}
}
