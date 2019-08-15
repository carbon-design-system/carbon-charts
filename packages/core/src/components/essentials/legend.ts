// Internal Imports
import * as Configuration from "../../configuration";
import { Component } from "../component";

// D3 Imports
import { select } from "d3-selection";

export class Legend extends Component {
	type = "legend";

	render() {
		const svg = this.getContainerSVG();

		const legendItems = svg.selectAll("g.legend-item")
			.data(this.getLegendItemArray(), d => d.key);

		const addedLegendItems = legendItems.enter()
			.append("g")
			.classed("legend-item", true);

		addedLegendItems.append("rect")
			.merge(legendItems.select("rect"))
				.attr("width", 12)
				.attr("height", 12)
				.attr("x", 1)
				.attr("y", (d, i) => 2 + (30 * i))
				.attr("r", 6)
				.attr("rx", 3)
				.attr("ry", 3)
				.style("fill", d => {
					if (d.value === Configuration.legend.items.status.ACTIVE) {
						return this._model.getStrokeColor(d.key);
					}

					return "white";
				})
				.attr("stroke", d => this._model.getStrokeColor(d.key));

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

		if (this._model.getOptions().legendClickable) {
			svg.classed("clickable", true);
			this.setClickableLegend();

			this.addEventListeners();
		}
	}

	setClickableLegend() {
		// const self = this;
		// const c = select(this.container);
		// const tooltip = c.select(".legend-tooltip-content");
		// tooltip.selectAll(".legend-btn").each(function() {
		// 	select(this).on("click", function() {
		// 		self.updateLegend(this);

		// 		// TODO - setClickableLegendInTooltip()
		// 	});
		// });
	}

	getLegendItemArray() {
		const legendItems = this._model.get("dataLabels");
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.map(key => ({
			key,
			value: legendItems[key]
		}));
	}

	getKeysFromData() {
		const keys = {};

		this._model.getDisplayData().datasets.forEach(dataset => {
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

	addEventListeners() {
		const self = this;
		const svg = this._parent;
		svg.selectAll("g.legend-item")
			.on("mouseover", () => {
				console.log("YOU HOVERED");
			})
			.on("click", function() {
				const clickedItem = select(this);
				const clickedItemData = clickedItem.datum() as any;
				console.log("clicked", clickedItemData);

				self._model.applyDataFilter(clickedItemData.key);
			});
	}
}
