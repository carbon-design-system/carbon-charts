// Internal Imports
import { Title } from "./title";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import { MeterRanges } from "./../../interfaces/enums";

export class MeterTitle extends Title {
	type = "meter-title";

	render() {
		const dataset = this.model.getDisplayData();
		const options = this.model.getOptions();
		const svg = this.getContainerSVG();
		const { groupMapsTo } = options.data;

		// the title for a meter, is the label for that dataset
		const title = svg.selectAll("text.meter-title")
			.data([dataset[groupMapsTo]]);

		title.enter()
			.append("text")
			.classed("meter-title", true)
			.merge(title)
			.attr("x", 0)
			.attr("y", 20)
			.text(d => d);

		title.exit().remove();

		// appends the associated percentage after title
		this.appendPercentage();

		// if status ranges are provided (custom or default), display indicator
		this.displayStatus();

		// get the max width of a title (with consideration for the status/percentage)
		const maxWidth = this.getMaxTitleWidth();
		const titleElement = DOMUtils.appendOrSelect(svg, "text.meter-title");

		if (maxWidth > 0 && titleElement.node().getComputedTextLength() > maxWidth) {
			this.truncateTitle(titleElement, maxWidth);
		}
	}

	/**
	 * Appends the corresponding status based on the value and the peak.
	 */
	displayStatus() {
		const value = this.model.getDisplayData().value;
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();

		const containerBounds = DOMUtils.getSVGElementSize(this.parent, { useAttr: true });
		// need to check if the width is 0, and try to use the parent attribute
		// this can happen if the chart is toggled on/off and the height is 0 for the parent, it wont validateDimensions
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");

		const statuses = Tools.getProperty(options, "meter", "status", "ranges");
		// check if ranges are provided, then bind the status and value
		const data = statuses ? [{ statuses, value }] : [];

		// size of the status indicator
		const circleSize = Tools.getProperty(options, "meter", "status", "indicatorSize");

		// create a group for the icon
		const statusGroup = DOMUtils.appendOrSelect(svg, "g.status-indicator")
			.attr("transform", `translate(${containerWidth - circleSize}, ${20 - circleSize})`);

		const self = this;
		const status = this.getStatus(value, statuses);
		const icon = statusGroup.selectAll("path.circle")
			.data(data);

		icon
			.enter()
			.append("path")
			.merge(icon)
			.attr("class", `circle status--${status}`)
			.attr("d", self.getStatusIcon(status));

		// only warning status has an inner fill
		const innerFillData = (status === MeterRanges.WARNING) ? [status] : [];
		const innerIcon = statusGroup.selectAll("path.innerFill")
			.data(innerFillData);

		innerIcon.enter()
			.append("path")
			.merge(innerIcon)
			.attr("d", "M9.2,5 L10.7,5 L10.7,12 L9.2,12 L9.2,5 Z M10,16 C9.4,16 9,15.6 9,15 C9,14.4 9.4,14 10,14 C10.6,14 11,14.4 11,15 C11,15.6 10.6,16 10,16 Z")
			.attr("class", `innerFill`);

		innerIcon.exit().remove();
		icon.exit().remove();
	}

	/**
	 * Appends the associated percentage to the end of the title
	 */
	appendPercentage() {
		const dataValue = this.model.getDisplayData().value;

		// use the title's position to append the percentage to the end
		const svg = this.getContainerSVG();
		const title = DOMUtils.appendOrSelect(svg, "text.meter-title");

		// check if it is enabled
		const data = Tools.getProperty(this.model.getOptions(), "meter", "title", "percentageIndicator", "enabled") === true ?
			[dataValue] : [];

		// append a percentage if it is enabled, update it
		const percentage = svg.selectAll("text.percent-value")
			.data(data);

		// the horizontal offset of the percentage value from the title
		const offset = Tools.getProperty(this.model.getOptions(), "meter", "title", "paddingRight");

		percentage.enter()
			.append("text")
			.classed("percent-value", true)
			.merge(percentage)
			.text(d => `${d}%`)
			.attr("x", +title.attr("x") + title.node().getComputedTextLength() + offset) // set the position to after the title
			.attr("y", title.attr("y"));

		percentage.exit().remove();
	}

	/**
	 * Uses the parent class truncate logic
	 * @param title d3 selection of title element that will be truncated
	 * @param titlestring the original string that needs truncation
	 * @param maxWidth the max width the title can take
	 */
	truncateTitle(title, maxWidth) {
		super.truncateTitle(title, maxWidth);

		// update the position on the percentage to be inline with the title
		const tspan = DOMUtils.appendOrSelect(this.parent, "tspan");
		const offset = this.model.getOptions().meter.title.paddingRight; // horizontal offset of percent from title
		const tspanLength = Math.ceil(tspan.node().getComputedTextLength());

		const percentage = DOMUtils.appendOrSelect(this.parent, "text.percent-value");
		percentage.attr("x", +title.attr("x") + title.node().getComputedTextLength() + tspanLength + offset);
	}

	// computes the maximum space a title can take
	protected getMaxTitleWidth() {
		// get a reference to the title elements to calculate the size the title can be
		const containerBounds = DOMUtils.getSVGElementSize(this.parent, { useAttr: true });


		// need to check if the width is 0, and try to use the parent attribute
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");

		const percentage = DOMUtils.appendOrSelect(this.parent, "text.percent-value");
		// the title needs to fit the width of the container without crowding the status, and percentage value
		const offset = Tools.getProperty(this.model.getOptions(), "meter", "title", "paddingRight"); // horizontal offset of percent from title
		const percentageWidth = percentage.node().getComputedTextLength();

		const statusGroup = DOMUtils.appendOrSelect(this.parent, "g.status-indicator").node();
		const statusWidth = DOMUtils.getSVGElementSize(statusGroup, { useBBox: true }).width + Tools.getProperty(this.model.getOptions(), "meter", "status", "paddingLeft");

		return containerWidth - percentageWidth - offset - statusWidth;
	}

	/**
	 * Get the associated status icon for the data
	 * @param status the active status for the meter chart
	 */
	protected getStatusIcon(status) {
		switch (status) {
			case MeterRanges.SUCCESS:
				return "M10,1 C5.1,1 1,5.1 1,10 C1,14.9 5.1,19 10,19 C14.9,19 19,15 19,10 C19,5 15,1 10,1 Z M8.7,13.5 L5.5,10.3 L6.5,9.3 L8.7,11.5 L13.5,6.7 L14.5,7.7 L8.7,13.5 Z";
			case MeterRanges.DANGER:
				return "M10,1 C5,1 1,5 1,10 C1,15 5,19 10,19 C15,19 19,15 19,10 C19,5 15,1 10,1 Z M13.5,14.5 L5.5,6.5 L6.5,5.5 L14.5,13.5 L13.5,14.5 Z";
			case MeterRanges.WARNING:
				return "M10,1 C5,1 1,5 1,10 C1,15 5,19 10,19 C15,19 19,15 19,10 C19,5 15,1 10,1 Z M9.2,5 L10.7,5 L10.7,12 L9.2,12 L9.2,5 Z M10,16 C9.4,16 9,15.6 9,15 C9,14.4 9.4,14 10,14 C10.6,14 11,14.4 11,15 C11,15.6 10.6,16 10,16 Z";
		}
	}

	/**
	 * Get the associated status for the data by checking the ranges
	 * @param d
	 * @param dataset
	 */
	protected getStatus(d: any, statuses: any) {
		if (statuses) {
			const result = statuses.filter(step => (step.range[0] <= d && d <= step.range[1]));
			return result[0].status;
		}
		return null;
	}
}
