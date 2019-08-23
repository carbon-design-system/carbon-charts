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

		// Configs
		const checkboxRadius = Configuration.legend.checkbox.radius;
		const legendItemsHorizontalSpacing = Configuration.legend.items.horizontalSpace;
		const legendItemsVerticalSpacing = Configuration.legend.items.verticalSpace;
		const spaceNeededForCheckbox = (checkboxRadius * 2) + Configuration.legend.checkbox.spaceAfter;

		addedLegendItems.append("rect")
			.merge(legendItems.select("rect"))
			.attr("width", 12)
			.attr("height", 12)
			.attr("r", checkboxRadius)
			.attr("rx", 1)
			.attr("ry", 1)
			.style("fill", d => {
				if (d.value === Configuration.legend.items.status.ACTIVE) {
					return this._model.getStrokeColor(d.key);
				}

				return "white";
			})
			.attr("stroke", d => this._model.getStrokeColor(d.key));

		addedLegendItems.append("text")
			.merge(legendItems.select("text"))
			.text(d => d.key)
			.style("font-size", "15px")
			.attr("alignment-baseline", "middle");

		const self = this;
		let startingPoint = 0;
		let lineNumber = 0;
		let itemIndexInLine = 0;
		addedLegendItems.merge(svg.selectAll("g.legend-item"))
			.each(function (d, i) {
				const legendItem = select(this);
				const previousLegendItem = select(svg.selectAll("g.legend-item").nodes()[i - 1]);

				if (itemIndexInLine === 0 || previousLegendItem.empty()) {
					// Position checkbox
					legendItem.select("rect")
						.attr("x", 0)
						.attr("y", lineNumber * legendItemsVerticalSpacing);

					// Position text
					legendItem.select("text")
						.attr("x", spaceNeededForCheckbox)
						.attr("y", 7 + (lineNumber * legendItemsVerticalSpacing));
				} else {
					const svgDimensions = self._services.domUtils.getSVGElementSize(self._parent, { useAttr: true });
					const legendItemTextDimensions = self._services.domUtils.getSVGElementSize(select(this).select("text"), { useBBox: true });
					const lastLegendItemTextDimensions = self._services.domUtils.getSVGElementSize(previousLegendItem.select("text"), { useBBox: true });
					startingPoint = startingPoint + lastLegendItemTextDimensions.width + spaceNeededForCheckbox + legendItemsHorizontalSpacing;

					if (startingPoint + spaceNeededForCheckbox + legendItemTextDimensions.width > svgDimensions.width) {
						lineNumber++;
						startingPoint = 0;
						itemIndexInLine = 0;
					}

					// Position checkbox
					legendItem.select("rect")
						.attr("x", startingPoint)
						.attr("y", lineNumber * legendItemsVerticalSpacing);

					// Position text
					legendItem.select("text")
						.attr("x", startingPoint + spaceNeededForCheckbox)
						.attr("y", 7 + (lineNumber * legendItemsVerticalSpacing));
				}

				itemIndexInLine++;
			});

		// Remove old elements as needed.
		legendItems.exit()
			// .each((d, i) => console.log(">> EXIT", i))
			.remove();

		if (this._model.getOptions().legendClickable) {
			svg.classed("clickable", true);

			this.addEventListeners();
		}
	}

	getLegendItemArray() {
		const legendItems = this._model.get("dataLabels");
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.map(key => ({
			key,
			value: legendItems[key]
		}));
	}

	addEventListeners() {
		const self = this;
		const svg = this._parent;
		svg.selectAll("g.legend-item")
			.on("mouseover", () => {
				console.log("YOU HOVERED");
			})
			.on("click", function () {
				const clickedItem = select(this);
				const clickedItemData = clickedItem.datum() as any;
				console.log("clicked", clickedItemData);

				self._model.applyDataFilter(clickedItemData.key);
			});
	}
}
