import * as Configuration from "../../configuration";
import { Component } from "../component";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, selectAll, mouse } from "d3-selection";
import { transition } from "d3-transition";
export class Tooltip extends Component {
	container: HTMLElement;
	positionService: Position = new Position();

	getRef = () => select(this.container).select("div.chart-tooltip").node() as HTMLElement;

	render() {
		// this._parent.append("rect")
		// 	.attr("x", 0)
		// 	.attr("y", 0)
		// 	.attr("width", 20)
		// 	.attr("height", 20);

		// Draw tooltip
		const holder = select(this._services.domUtils.getHolder());
		const tooltip = this._services.domUtils.appendOrSelect(holder, "div.tooltip.chart-tooltip");

		// Apply html content to the tooltip
		const tooltipTextConainter = this._services.domUtils.appendOrSelect(tooltip, "div.text-box");
		tooltipTextConainter.html("yo");

		// Position the tooltip
		// this.positionTooltip();

		// Fade in
		tooltip.style("opacity", 0)
			.transition(transition().duration(750))
			// .duration(Configuration.tooltip.fadeIn.duration)
			.style("opacity", 1);

		// this.addEventListeners();
	}
}
