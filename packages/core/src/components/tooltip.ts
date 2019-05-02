import * as Configuration from "../configuration";

// Carbon position service
// import Position, { position } from "@carbon/utils-position";
import Position, { PLACEMENTS } from "./positionService";

// D3 Imports
import { select, selectAll, mouse } from "d3-selection";

export class ChartTooltip {
	holder: Element;
	positionService: Position = new Position();

	constructor(holder: Element) {
		this.holder = holder;
	}

	getRef = () => select(this.holder).select("div.chart-tooltip").node() as HTMLElement;

	positionTooltip() {
		const target = this.getRef();
		const mouseRelativePos = mouse(this.holder as SVGSVGElement);

		// Find out whether tooltip should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			this.holder,
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT
			]
		);

		// Get coordinates to where tooltip should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0] +  (bestPlacementOption === PLACEMENTS.RIGHT ? Configuration.tooltip.magicLeft2 : -Configuration.tooltip.magicLeft2),
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}

	show(contentHTML) {
		// Remove existing tooltips on the page
		// TODO - Update class to not conflict with other elements on page
		selectAll(".chart-tooltip").remove();

		// Draw tooltip
		const tooltip = select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip");

		// Apply html content to the tooltip
		tooltip.append("div")
			.attr("class", "text-box")
			.html(contentHTML);

		// Position the tooltip
		this.positionTooltip();

		// Fade in
		tooltip.style("opacity", 0)
			.transition()
			.duration(Configuration.tooltip.fadeIn.duration)
			.style("opacity", 1);

		// this.addEventListeners();
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
