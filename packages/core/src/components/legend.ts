// Internal Imports
import * as Configuration from "../configuration";

import { ChartComponent } from "./base-component";

export class Legend extends ChartComponent {
	render() {
		const svg = this._parent;

		const legendItems = svg.selectAll("g.legend-item")
			.data(this.getLegendItemArray());

		const addedLegendItems = legendItems.enter()
			// .each((d, i) => console.log(">> ENTER", i))
			.append("g")
			.classed("legend-item", true);

		addedLegendItems.append("circle")
			.merge(legendItems.select("circle"))
				.attr("cx", 7)
				.attr("cy", (d, i) => 7 + (30 * i))
				.attr("r", 6)
				.style("fill", (d, i) => {
					if (d.value === Configuration.legend.items.status.ACTIVE) {
						return this._model.getStrokeColor(d.key);
					}

					return "white";
				});

		addedLegendItems.append("text")
			.merge(legendItems.select("text"))
				.attr("x", 20)
				.attr("y", (d, i) => 9 + (30 * i))
				.text(d => d.key)
				.style("font-size", "15px")
				.attr("alignment-baseline", "middle");

		// Remove old elements as needed.
		legendItems.exit()
			// .each((d, i) => console.log(">> EXIT", i))
			.remove();
	}

	update() {
		this.render();
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
