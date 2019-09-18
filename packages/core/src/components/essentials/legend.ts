// Internal Imports
import * as Configuration from "../../configuration";
import { Component } from "../component";
import { Tools } from "../../tools";
import { LegendOrientations } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { select } from "d3-selection";

export class Legend extends Component {
	type = "legend";

	render() {
		const svg = this.getContainerSVG();

		const legendItems = svg.selectAll("g.legend-item")
			.data(this.getLegendItemArray());

		const addedLegendItems = legendItems.enter()
			.append("g")
			.classed("legend-item", true);

		// Configs
		const checkboxRadius = Configuration.legend.checkbox.radius;
		const legendItemsHorizontalSpacing = Configuration.legend.items.horizontalSpace;
		const legendItemsVerticalSpacing = Configuration.legend.items.verticalSpace;
		const spaceNeededForCheckbox = (checkboxRadius * 2) + Configuration.legend.checkbox.spaceAfter;

		// Check if there are disabled legend items
		const { DISABLED } = Configuration.legend.items.status;
		const dataLabels = this.model.get("dataLabels");
		const hasDeactivatedItems = Object.keys(dataLabels).some(label => dataLabels[label] === DISABLED);

		addedLegendItems.append("rect")
			.classed("checkbox", true)
			.merge(legendItems.select("rect.checkbox"))
			.attr("width", checkboxRadius * 2)
			.attr("height", checkboxRadius * 2)
			.attr("rx", 1)
			.attr("ry", 1)
			.style("fill", d => {
				if (d.value === Configuration.legend.items.status.ACTIVE) {
					return this.model.getStrokeColor(d.key);
				}

				return "white";
			})
			.attr("stroke", d => {
				if (d.value === Configuration.legend.items.status.ACTIVE) {
					return "white";
				}

				return "black";
			});

		addedLegendItems.append("text")
			.merge(legendItems.select("text"))
			.text(d => d.key)
			.style("font-size", "15px")
			.attr("alignment-baseline", "middle");

		const legendOrientation = Tools.getProperty(this.model.getOptions(), "legend", "orientation");

		// Crop legend items into lines
		const self = this;
		let startingPoint = 0;
		let lineNumber = 0;
		let itemIndexInLine = 0;
		addedLegendItems.merge(svg.selectAll("g.legend-item"))
			.each(function (d, i) {
				const legendItem = select(this);
				const previousLegendItem = select(svg.selectAll("g.legend-item").nodes()[i - 1]);

				if (itemIndexInLine === 0 || previousLegendItem.empty() || legendOrientation === LegendOrientations.VERTICAL) {
					// Position checkbox
					legendItem.select("rect.checkbox")
						.attr("x", 0)
						.attr("y", lineNumber * legendItemsVerticalSpacing);

					// Position text
					legendItem.select("text")
						.attr("x", spaceNeededForCheckbox)
						.attr("y", 8 + (lineNumber * legendItemsVerticalSpacing));

					if (legendOrientation === LegendOrientations.VERTICAL) {
						lineNumber++;
					}
				} else {
					const svgDimensions = DOMUtils.getSVGElementSize(self.parent, { useAttr: true });
					const legendItemTextDimensions = DOMUtils.getSVGElementSize(select(this).select("text"), { useBBox: true });
					const lastLegendItemTextDimensions = DOMUtils.getSVGElementSize(previousLegendItem.select("text"), { useBBox: true });
					startingPoint = startingPoint + lastLegendItemTextDimensions.width + spaceNeededForCheckbox + legendItemsHorizontalSpacing;

					if (startingPoint + spaceNeededForCheckbox + legendItemTextDimensions.width > svgDimensions.width) {
						lineNumber++;
						startingPoint = 0;
						itemIndexInLine = 0;
					}

					// Position checkbox
					legendItem.select("rect.checkbox")
						.attr("x", startingPoint)
						.attr("y", lineNumber * legendItemsVerticalSpacing);

					// Position text
					legendItem.select("text")
						.attr("x", startingPoint + spaceNeededForCheckbox)
						.attr("y", 8 + (lineNumber * legendItemsVerticalSpacing));
				}

				// Render checkbox check icon
				if (hasDeactivatedItems && legendItem.select("g.check").empty()) {
					legendItem.append("g")
						.classed("check", true)
						.html(`
							<svg focusable="false" preserveAspectRatio="xMidYMid meet"
								xmlns="http://www.w3.org/2000/svg" width="32" height="32"
								viewBox="0 0 32 32" aria-hidden="true"
								style="will-change: transform;">
								<path d="M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z"></path>
								<title>Checkmark</title>
							</svg>
						`);

					legendItem.select("g.check svg")
						.attr("width", checkboxRadius * 2 - 1)
						.attr("height", checkboxRadius * 2 - 1)
						.attr("x", parseFloat(legendItem.select("rect.checkbox").attr("x")) + 0.5)
						.attr("y", parseFloat(legendItem.select("rect.checkbox").attr("y")) + 0.5);

					legendItem.select("g.check svg path")
						.attr("stroke", "#fff")
						.attr("fill", "#fff");
				} else if (!hasDeactivatedItems && !legendItem.select("g.check").empty()) {
					legendItem.select("g.check").remove();
				}

				itemIndexInLine++;
			});

		// Remove old elements as needed.
		legendItems.exit()
			.on("mouseover", null)
			.on("click", null)
			.on("mouseout", null)
			.remove();

		const legendClickable = Tools.getProperty(this.model.getOptions(), "legend", "clickable");
		svg.classed("clickable", legendClickable);

		if (legendClickable && addedLegendItems.size() > 0) {
			this.addEventListeners();
		}
	}

	getLegendItemArray() {
		const legendItems = this.model.get("dataLabels");
		const legendItemKeys = Object.keys(legendItems);

		return legendItemKeys.map(key => ({
			key,
			value: legendItems[key]
		}));
	}

	addEventListeners() {
		const self = this;
		const svg = this.getContainerSVG();

		svg.selectAll("g.legend-item")
			.on("mouseover", function () {
				self.services.events.dispatchEvent("legend-item-onhover", {
					hoveredElement: select(this)
				});

				// Configs
				const checkboxRadius = Configuration.legend.checkbox.radius;

				const hoveredItem = select(this);
				hoveredItem.append("rect")
					.classed("hover-stroke", true)
					.attr("x", parseFloat(hoveredItem.select("rect.checkbox").attr("x")) - 2.5)
					.attr("y", parseFloat(hoveredItem.select("rect.checkbox").attr("y")) - 2.5)
					.attr("width", checkboxRadius * 2 + 5)
					.attr("height", checkboxRadius * 2 + 5)
					.attr("rx", 3)
					.attr("ry", 3)
					.attr("fill", "#0061ff")
					.lower();
			})
			.on("click", function () {
				self.services.events.dispatchEvent("legend-item-onclick", {
					clickedElement: select(this)
				});

				const clickedItem = select(this);
				const clickedItemData = clickedItem.datum() as any;

				self.model.toggleDataset(clickedItemData.key);
			})
			.on("mouseout", function () {
				const hoveredItem = select(this);
				hoveredItem.select("rect.hover-stroke").remove();

				self.services.events.dispatchEvent("legend-item-onmouseout", {
					hoveredElement: hoveredItem
				});
			});
	}
}
