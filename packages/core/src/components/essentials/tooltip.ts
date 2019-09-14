import * as Configuration from "../../configuration";
import { Component } from "../component";
import { Tools } from "../../tools";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, mouse, event } from "d3-selection";
import { timeFormat } from "d3-time-format";

export class Tooltip extends Component {
	type = "cc-tooltip";

	tooltip: any;
	positionService: Position = new Position();

	eventListenerSet = false;

	init() {
		// Grab the tooltip element
		const holder = select(this._services.domUtils.getHolder());
		this.tooltip = this._services.domUtils.appendOrSelect(holder, "div.tooltip.chart-tooltip.cc-tooltip");

		// Apply html content to the tooltip
		const tooltipTextConainter = this._services.domUtils.appendOrSelect(this.tooltip, "div.text-box");

		// listen to show-tooltip Custom Events to render the tooltip
		this._services.events.getDocumentFragment().addEventListener("show-tooltip", e => {
			const data = select(event.target).datum() as any;
			if (Tools.getProperty(this._model.getOptions(), "tooltip", "size") === Configuration.tooltip.size.COMPACT) {
				tooltipTextConainter.html(`<b>${data.datasetLabel}:</b> ${data.value}<br/>`);
			} else {
				tooltipTextConainter.html(`
					<p class='bignum'>${data.datasetLabel}</p>
					<p>${data.value}</p>
				`);
			}

			// Position the tooltip
			this.positionTooltip();

			// Fade in
			this.tooltip.classed("hidden", false);
		});

		// listen to show-tooltip Custom Events to render the tooltip
		this._services.events.getDocumentFragment().addEventListener("hide-tooltip", e => {
			this.tooltip.classed("hidden", true);
		});
	}

	render() {
		this.tooltip.classed("hidden", true);
	}

	positionTooltip() {
		const holder = this._services.domUtils.getHolder();
		const target = this.tooltip.node();
		const mouseRelativePos = mouse(holder);

		// Find out whether tooltip should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT
			],
			() => ({
				width: holder.offsetWidth,
				height: holder.offsetHeight
			})
		);

		let { magicLeft2: horizontalOffset } = Configuration.tooltip;
		if (bestPlacementOption === PLACEMENTS.LEFT) {
			horizontalOffset *= -1;
		}

		// Get coordinates to where tooltip should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0] + horizontalOffset,
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}
}
