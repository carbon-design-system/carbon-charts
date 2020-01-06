// Internal Imports
import { Component } from "../component";
import { Title } from "./title";
import { DOMUtils } from "../../services";
import { TooltipTypes } from "./../../interfaces";
import { selectAll } from "d3-selection";

export class TitleMeter extends Title {
	type = "meter-title";

	/**
	 * Appends the corresponding status based on the value and the peak.
	 */
	displayStatus() {
		const displayData = this.model.getDisplayData();
		const dataset = displayData.datasets[0];
		const svg = this.getContainerSVG();

		const containerBounds  = DOMUtils.getSVGElementSize(this.parent, {useAttr: true});
		// need to check if the width is 0, and try to use the parent attribute
		// this can happen if the chart is toggled on/off and the height is 0 for the parent, it wont validateDimensions
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");

		// remove any status indicators on the chart to re-render if ranges have been given
		const status = DOMUtils.appendOrSelect(svg, "circle.status-indicator");

		// if ranges are provided, and the status indicator is enabled, update it
		if (dataset.data.status && this.model.getOptions().meter.status.enabled) {
		// size of the status indicator
		const circleSize = this.model.getOptions().meter.status.indicatorSize;

		const self = this;
		status.attr("cx", containerWidth - circleSize)
			.attr("cy", 20 - circleSize)
			.attr("r", circleSize)
			.attr("class", function() {
				return `status-indicator status--${self.getStatus(dataset.data.value, dataset)}`;
			});
		} else {
			// remove any stale status indicators
			status.remove();
		}
	}

	/**
	 * Appends the associated percentage to the end of the title
	 */
	appendPercentage() {
		// meter only deals with 1 dataset (like pie/donut)
		const displayData = this.model.getDisplayData();
		const dataset = displayData.datasets[0];
		// the value of the meter converted to percent
		const value = Math.round(dataset.data.value / dataset.data.max * 100);

		// use the title's position to append the percentage to the end
		const svg = this.getContainerSVG();
		const title = DOMUtils.appendOrSelect(svg, "text.title");
		const percentage = DOMUtils.appendOrSelect(svg, "text.percent-value");

		// append a percentage if it is enabled, update it
		if (this.model.getOptions().meter.title.percentageIndicator.enabled) {
		// the horizontal offset of the percentage value from the title
		const offset = this.model.getOptions().meter.title.paddingRight;

		percentage.text(`${value}%`)
			.attr("x", +title.attr("x") + title.node().getComputedTextLength() + offset) // set the position to after the title
			.attr("y", title.attr("y"));
		} else {
			// remove it if it is not longer enabled in options
			percentage.remove();
		}
	}

	truncateTitle() {
		// get a reference to the title elements to calculate the size the title can be
		const containerBounds  = DOMUtils.getSVGElementSize(this.parent, {useAttr: true});
		// need to check if the width is 0, and try to use the parent attribute
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");

		const title =  DOMUtils.appendOrSelect(this.parent, "text.title");
		const percentage =  DOMUtils.appendOrSelect(this.parent, "text.percent-value");

		// sanity check to prevent stack overflow on binary search
		if (containerWidth <= 0) {
			return;
		}

		// the title needs to fit the width of the container without crowding the status, and percentage value
		const offset = this.model.getOptions().meter.title.paddingRight; // horizontal offset of percent from title
		const titleWidth = title.node().getComputedTextLength();
		const percentageWidth = percentage.node().getComputedTextLength();
		const statusWidth = DOMUtils.appendOrSelect(this.parent, "circle.status-indicator").node().getBBox().width +
			this.model.getOptions().meter.status.paddingLeft;

		// check if the title is too big for the containing svg
		if (titleWidth + percentageWidth + offset + statusWidth > containerWidth) {
			// the untruncated original title string
			const titleString = title.text();

			// append the ellipses to their own tspan to calculate the text length including ellipses
			title
			.data([titleString])
				.append("tspan")
				.text("...");

			// get the bounding width including the elipses '...' and the truncated size for the title text
			const tspanLength = Math.ceil(DOMUtils.appendOrSelect(title, "tspan").node().getComputedTextLength());
			const truncatedSize = Math.floor(containerWidth - tspanLength - percentageWidth - statusWidth);

			// get the index for creating the max length substring that fits within the svg
			// use one less than the index to avoid crowding (the elipsis)
			const substringIndex = this.getSubstringIndex(title.node(), 0, titleString.length - 1, truncatedSize);

			// use the substring as the title
			title.text(titleString.substring(0, substringIndex - 1))
				.append("tspan")
				.text("...");

			// update the percentage location
			percentage.attr("x", +title.attr("x") + title.node().getComputedTextLength() + tspanLength + offset);

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
		} else {
			// if we don't truncate we want to remove any events that might have existed for tooltips on the previous title
			title
			.on("mouseenter", null)
			.on("mouseout", null);
		}

	}

	render() {
		const displayData = this.model.getDisplayData();
		// meter only deals with 1 dataset
		const dataset = displayData.datasets[0];

		const svg = this.getContainerSVG();

		// the title for a meter, is the label for that dataset
		const text = DOMUtils.appendOrSelect(svg, "text.title");
		text.attr("x", 0)
			.attr("y", 20)
			.text(dataset.label);

		// appends the associated percentage after title
		this.appendPercentage();

		// if status ranges are provided (custom or default), display indicator
		this.displayStatus();

		// title needs to first render so that we can check for overflow
		this.truncateTitle();
	}

	/**
	 * Get the associated status for the data by checking the ranges
	 * @param d
	 * @param dataset
	 */
	protected getStatus(d: any, dataset: any) {
		const allRanges = dataset.data.status;
		const result = allRanges.filter(step => (step.range[0] <= d && d <= step.range[1]) );
		return result[0].status;
	}
}
