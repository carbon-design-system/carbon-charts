// Internal Imports
import { Component } from "../component";
import { Title } from "./title";
import { DOMUtils } from "../../services";
import { TooltipTypes } from "./../../interfaces";

export class TitleMeter extends Title {
	type = "title";

	/**
	 * Appends the associated percentage to the end of the title
	 */
	appendPercentage() {
		const displayData = this.model.getDisplayData();
		// meter only deals with 1 dataset (like pie/donut)
		const dataset = displayData.datasets[0];
		// the value of the meter converted to percent
		const value = Math.round(dataset.data.value / dataset.data.max * 100);

		const svg = this.getContainerSVG();
		const title = DOMUtils.appendOrSelect(svg, "text.title");
		const percentage = DOMUtils.appendOrSelect(svg, "text.percent-value");

		// the horizontal offset of the percentage value from the title
		const offset = this.model.getOptions().meter.title.valueOffset;

		percentage.text(`${value}%`)
			.attr("x", +title.attr("x") + title.node().getComputedTextLength() + offset) // set the position to after the title
			.attr("y", title.attr("y"));
	}

	truncateTitle() {
		const containerWidth  = DOMUtils.getSVGElementSize(this.parent).width;
		const title =  DOMUtils.appendOrSelect(this.parent, "text.title");
		const percentage = DOMUtils.appendOrSelect(this.parent, "text.percent-value");
		// the horizontal offset of the value from the title
		const offset = this.model.getOptions().meter.title.valueOffset;

		// check if the title is too big for the containing svg
		if (title.node().getComputedTextLength() + percentage.node().getComputedTextLength() + offset > containerWidth) {
			// append the ellipses to their own tspan to calculate the text length
			title.append("tspan")
				.text("...");

			// get the bounding width including the elipses '...'
			const tspanLength = DOMUtils.appendOrSelect(title, "tspan").node().getComputedTextLength();
			const percentageLength = percentage.node().getComputedTextLength();
			const truncatedSize = Math.floor(containerWidth - tspanLength - percentageLength);
			const titleString = title.text();

			// get the index for creating the max length substring that fit within the svg
			// use one less than the index to avoid crowding (the elipsis)
			const substringIndex = this.getSubstringIndex(title.node(), 0, titleString.length - 1, truncatedSize);

			// use the substring as the title
			title.text(titleString.substring(0, substringIndex - 1))
				.append("tspan")
				.text("...");

			// update the percentage location
			percentage.attr("x", );

			// add events for displaying the tooltip with the title
			const self = this;
			title.on("mouseenter", function() {
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement: title,
					type: TooltipTypes.TITLE
				});
			})
			.on("mouseout", function() {
				self.services.events.dispatchEvent("hide-tooltip", {
					hoveredElement: title,
				});
			});
		}
	}

	render() {
		const displayData = this.model.getDisplayData();
		// meter only deals with 1 dataset (like pie/donut)
		const dataset = displayData.datasets[0];

		const svg = this.getContainerSVG();

		// the title for a meter, is the label for that dataset
		const text = DOMUtils.appendOrSelect(svg, "text.title");
		text.attr("x", 0)
			.attr("y", 20)
			.text(dataset.label);

		// TODO - Replace with layout component margins
		DOMUtils.appendOrSelect(svg, "rect.spacer")
			.attr("x", 0)
			.attr("y", 20)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "none");

		// appends the associated percentage after title
		this.appendPercentage();

		// title needs to first render so that we can check for overflow
		this.truncateTitle();

	}
}
