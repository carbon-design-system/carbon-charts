// Internal Imports
import { Title } from "./title";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

export class MeterTitle extends Title {
	type = "meter-title";

	render() {
		const dataset = this.model.getDisplayData();
		const svg = this.getContainerSVG();
		const self = this;

		// the title for a meter, is the label for that dataset
		const title = svg.selectAll("text.meter-title")
			.data([dataset.label]);

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

		if (titleElement.node().getComputedTextLength() > maxWidth) {
			this.truncateTitle(titleElement, maxWidth);
		}
	}

	/**
	 * Appends the corresponding status based on the value and the peak.
	 */
	displayStatus() {
		const dataset = this.model.getDisplayData().data;
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();

		const containerBounds  = DOMUtils.getSVGElementSize(this.parent, {useAttr: true});
		// need to check if the width is 0, and try to use the parent attribute
		// this can happen if the chart is toggled on/off and the height is 0 for the parent, it wont validateDimensions
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");

		// check if ranges are provided, and the status indicator is enabled
		const data = dataset.status && Tools.getProperty(options, "meter", "status", "enabled") === true ? [dataset] : [];

		// remove any status indicators on the chart to re-render if ranges have been given
		const status = svg.selectAll("circle.status-indicator")
			.data(data);

		// size of the status indicator
		const circleSize = Tools.getProperty(options, "meter", "status", "indicatorSize");

		const self = this;
		status.enter()
			.append("circle")
			.classed("status-indicator", true)
			.merge(status)
			.attr("cx", containerWidth - circleSize)
			.attr("cy", 20 - circleSize)
			.attr("r", circleSize)
			.attr("class", d => `status-indicator status--${self.getStatus(d.value, dataset)}`);

		status.exit().remove();
	}

	/**
	 * Appends the associated percentage to the end of the title
	 */
	appendPercentage() {
		const dataset = this.model.getDisplayData().data;
		const value = Math.round(dataset.value / dataset.max * 100);

		// use the title's position to append the percentage to the end
		const svg = this.getContainerSVG();
		const title = DOMUtils.appendOrSelect(svg, "text.meter-title");

		// check if it is enabled
		const data = Tools.getProperty(this.model.getOptions(), "meter", "title", "percentageIndicator", "enabled") === true ?
			[dataset.value] : [];

		// append a percentage if it is enabled, update it
		const percentage = svg.selectAll("text.percent-value")
			.data(data);

		// the horizontal offset of the percentage value from the title
		const offset = Tools.getProperty(this.model.getOptions(), "meter", "title", "paddingRight");

		percentage.enter()
			.append("text")
			.classed("percent-value", true)
			.merge(percentage)
			.text(`${value}%`)
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

		// update the position on the percentage to be inline with the title (following title)
		// const titleString =  title.text();
		const tspan = DOMUtils.appendOrSelect(this.parent, "tspan");
		const offset = this.model.getOptions().meter.title.paddingRight; // horizontal offset of percent from title
		const tspanLength = Math.ceil(tspan.node().getComputedTextLength());


		const percentage =  DOMUtils.appendOrSelect(this.parent, "text.percent-value");
		percentage.attr("x", +title.attr("x") + title.node().getComputedTextLength() + tspanLength + offset);
	}

	// computes the maximum space a title can take
	protected getMaxTitleWidth() {
		// get a reference to the title elements to calculate the size the title can be
		const containerBounds  = DOMUtils.getSVGElementSize(this.parent, {useAttr: true});
		// need to check if the width is 0, and try to use the parent attribute
		const containerWidth = containerBounds.width ? containerBounds.width : this.parent.node().getAttribute("width");
		const percentage =  DOMUtils.appendOrSelect(this.parent, "text.percent-value");

		// the title needs to fit the width of the container without crowding the status, and percentage value
		const offset = Tools.getProperty(this.model.getOptions(), "meter", "title", "paddingRight"); // horizontal offset of percent from title
		const percentageWidth = percentage.node().getComputedTextLength();
		const statusWidth = DOMUtils.appendOrSelect(this.parent, "circle.status-indicator").node().getBBox().width +
			Tools.getProperty(this.model.getOptions(), "meter", "status", "paddingLeft");

		return containerWidth - percentageWidth - offset - statusWidth;
	}

	/**
	 * Get the associated status for the data by checking the ranges
	 * @param d
	 * @param dataset
	 */
	protected getStatus(d: any, dataset: any) {
		const allRanges = dataset.status;
		const result = allRanges.filter(step => (step.range[0] <= d && d <= step.range[1]) );
		return result[0].status;
	}
}
