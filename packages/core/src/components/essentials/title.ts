// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { TooltipTypes } from "./../../interfaces";

export class Title extends Component {
	type = "title";

	/**
	 * Truncates title creating ellipses and attaching tooltip for exposing full title.
	 */
	truncateTitle() {
		const containerWidth = DOMUtils.getSVGElementSize(this.parent).width;
		const title = DOMUtils.appendOrSelect(this.parent, "text.title");

		// check if the title is too big for the containing svg
		if (title.node().getComputedTextLength() > containerWidth) {
			// append the ellipses to their own tspan to calculate the text length
			title.append("tspan")
				.text("...");

			// get the bounding width including the elipses '...'
			const tspanLength = DOMUtils.appendOrSelect(title, "tspan").node().getComputedTextLength();
			const truncatedSize = Math.floor(containerWidth - tspanLength);
			const titleString = this.model.getOptions().title;

			// get the index for creating the max length substring that fit within the svg
			// use one less than the index to avoid crowding (the elipsis)
			const substringIndex = this.getSubstringIndex(title.node(), 0, titleString.length - 1, truncatedSize);

			// use the substring as the title
			title.text(titleString.substring(0, substringIndex - 1))
				.append("tspan")
				.text("...");

			// add events for displaying the tooltip with the title
			const self = this;
			title.on("mouseenter", function () {
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement: title,
					type: TooltipTypes.TITLE
				});
			})
				.on("mouseout", function () {
					self.services.events.dispatchEvent("hide-tooltip", {
						hoveredElement: title,
					});
				});
		}
	}

	render() {
		const svg = this.getContainerSVG();

		const text = DOMUtils.appendOrSelect(svg, "text.title");
		text.attr("x", 0)
			.attr("y", 20)
			.text(this.model.getOptions().title);

		// TODO - Replace with layout component margins
		DOMUtils.appendOrSelect(svg, "rect.spacer")
			.attr("x", 0)
			.attr("y", 20)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "none");

		// title needs to first render so that we can check for overflow
		this.truncateTitle();
	}

	/**
	 * Returns the index for a maximum length substring that is less than the width parameter.
	 * @param title the title node used for getting the text lengths of substrings
	 * @param start the start index for the binary search
	 * @param end the end index for the binary search
	 * @param width the width of the svg container that holds the title
	 */
	protected getSubstringIndex(title, start, end, width) {
		const mid = Math.floor((end + start) / 2);
		if (title.getSubStringLength(0, mid) > width) {
			return this.getSubstringIndex(title, start, mid, width);
		} else if (title.getSubStringLength(0, mid) < width) {
			if (title.getSubStringLength(0, mid + 1) > width) {
				return mid;
			}
			return this.getSubstringIndex(title, mid, end, width);
		} else {
			return mid;
		}
	}
}
