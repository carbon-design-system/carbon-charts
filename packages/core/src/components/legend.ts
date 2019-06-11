// Internal Imports
import * as Configuration from "../configuration";

// D3 Imports
import { select } from "d3-selection";

import { ChartComponent } from "./base-component";

export class Legend extends ChartComponent {
	performRender() {
		let svg;
		if (select("#classy-scatter-chart-holder svg").nodes().length > 0) {
			svg = select("#classy-scatter-chart-holder svg");
		} else {
			svg = select("#classy-scatter-chart-holder")
				.append("svg")
				.attr("height", 350)
				.attr("width", 450);
		}

		const legendItems = svg.selectAll("g")
			.data(this.getLegendItemArray());

		const addedLegendItems = legendItems.enter().append("g");
		addedLegendItems.append("circle")
			.merge(legendItems.select("circle"))
				.attr("cx", 200)
				.attr("cy", (d, i) => 130 + (30 * i))
				.attr("r", 6)
				.style("fill", (d, i) => {
					if (d.value === Configuration.legend.items.status.ACTIVE) {
						return this._model.getStrokeColor(d.key);
					}

					return "white";
				});

		addedLegendItems.append("text")
			.merge(legendItems.select("text"))
				.attr("x", 220)
				.attr("y", (d, i) => 130 + (30 * i))
				.text(d => d.key)
				.style("font-size", "15px")
				.attr("alignment-baseline", "middle");

		// Remove old elements as needed.
		legendItems.exit().remove();
	}

	render() {
		this.performRender();
	}

	update() {
		this.performRender();
	}

	getLegendItemArray() {
		const legendItems = this.getKeysFromData();
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.map(key => ({
			key,
			value: legendItems[key]
		}));
	}

	getKeysFromData() {
		const keys = {};

		this._model.getData().datasets.forEach(dataset => {
			keys[dataset.label] = Configuration.legend.items.status.ACTIVE;
		});

		// Apply disabled legend items from previous data
		// That also are applicable to the new data
		// const disabledLegendItems = this.getDisabledLegendItems();
		// Object.keys(keys).forEach(key => {
		// 	if (disabledLegendItems.indexOf(key) !== -1) {
		// 		keys[key] = Configuration.legend.items.status.DISABLED;
		// 	}
		// });

		// if (!this.fixedDataLabels) {
		// 	this.fixedDataLabels = this.displayData.labels;
		// } else {
		// 	this.displayData.labels.forEach(element => {
		// 		if (this.fixedDataLabels.indexOf(element) === -1) {
		// 			this.fixedDataLabels.push(element);
		// 		}
		// 	});
		// }

		return keys;
	}

	// getLegendType() {
	// 	const { datasets } = this.displayData;

	// 	// TODO - Support the labels based legend for line chart
	// 	if (datasets.length === 1 && datasets[0].backgroundColors && datasets[0].backgroundColors.length > 1) {
	// 		return Configuration.legend.basedOn.LABELS;
	// 	} else {
	// 		return Configuration.legend.basedOn.SERIES;
	// 	}
	// }
}
