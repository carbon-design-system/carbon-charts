import * as Configuration from "../configuration";

// D3 Imports
import { select, selectAll, mouse } from "d3-selection";

export class ChartTooltip {
	holder: Element;

	constructor(holder: Element) {
		this.holder = holder;
	}

	show(contentHTML) {
		// Remove existing tooltips on the page
		// TODO - Update class to not conflict with other elements on page
		selectAll(".chart-tooltip").remove();

		// Draw tooltip
		const tooltip = select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop2 + "px");

		// Apply html content to the tooltip
		tooltip.append("div")
			.attr("class", "text-box")
			.html(contentHTML);

		// Position tooltip
		if (mouse(this.holder as SVGSVGElement)[0] + (tooltip.node() as Element).clientWidth > this.holder.clientWidth) {
			tooltip.style(
				"left",
				mouse(this.holder as SVGSVGElement)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px"
			);
		} else {
			tooltip.style(
				"left",
				mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.magicLeft2 + "px"
			);
		}

		// Fade in
		tooltip.style("opacity", 0)
			.transition()
			.duration(Configuration.tooltip.fadeIn.duration)
			.style("opacity", 1);

		this.addEventListeners();
	}

	hide() {
		const tooltipRef = select(this.holder).select("div.chart-tooltip");

		// Fade out and remove
		tooltipRef.style("opacity", 1)
			.transition()
			.duration(Configuration.tooltip.fadeOut.duration)
			.style("opacity", 0)
			.remove();

		this.removeEventLinteners();
	}

	handleTooltipEvents(evt: Event) {


		// If keyboard event
		if (evt["key"]) {
			if (evt["key"] === "Escape" || evt["key"] === "Esc") {
				this.hide();
			}
		} else {
			const targetTagName = evt.target["tagName"];
			const targetsToBeSkipped = Configuration.options.BASE.tooltip.targetsToSkip;
			if (targetsToBeSkipped.indexOf(targetTagName) === -1) {
				// If mouse event
				this.hide();
			}
		}
	}

	addEventListeners() {
		const tooltipRef = select(this.holder).select("div.chart-tooltip");

		// Apply the event listeners to close the tooltip
		// setTimeout is there to avoid catching the click event that opened the tooltip
		setTimeout(() => {
			// When ESC is pressed
			window.addEventListener("keydown", this.handleTooltipEvents);

			// If clicked outside
			this.holder.addEventListener("click", this.handleTooltipEvents);

			// Stop clicking inside tooltip from bubbling up to window
			tooltipRef.on("click", () => {
				event.stopPropagation();
			});
		}, 0);
	}

	removeEventLinteners() {
		// Remove eventlistener to close tooltip when ESC is pressed
		window.removeEventListener("keydown", this.handleTooltipEvents);

		// Remove eventlistener to close tooltip when clicked outside
		this.holder.removeEventListener("click", this.handleTooltipEvents);
	}
}
