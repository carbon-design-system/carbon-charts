import * as Configuration from "../../configuration";
import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, mouse, event } from "d3-selection";

export class TooltipScatter extends Tooltip {
	type = "tooltip";

	tooltip: any;
	positionService: Position = new Position();

	eventListenerSet = false;

	init() {
		// Grab the tooltip element
		const holder = select(this.services.domUtils.getHolder());
		this.tooltip = DOMUtils.appendOrSelect(holder, "div.tooltip.chart-tooltip.cc-tooltip");

		// Apply html content to the tooltip
		const tooltipTextContainer = DOMUtils.appendOrSelect(this.tooltip, "div.content-box");

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.getDocumentFragment().addEventListener("show-tooltip", e => {

			let data = select(event.target).datum() as any;

			// if there is a provided tooltip HTML function use that
			if (Tools.getProperty(this.model.getOptions(), "tooltip", "customHTML")) {
				tooltipTextContainer.html(this.model.getOptions().tooltip.customHTML(data));
			} else {
				if (e.detail.multidata) {
					// multi tooltip data
					data = e.detail.multidata;
					tooltipTextContainer.html(this.getMultiTooltipHTML(data));
				} else {
					tooltipTextContainer.html(this.getTooltipHTML(data));
				}
			}

			// Position the tooltip
			this.positionTooltip();

			// Fade in
			this.tooltip.classed("hidden", false);
		});

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.getDocumentFragment().addEventListener("hide-tooltip", e => {
			this.tooltip.classed("hidden", true);
		});
	}

	getTooltipHTML(data: any) {
		const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");

		const indicatorColor = this.model.getStrokeColor(data.datasetLabel, data.label, data.value);

		return `<div class="datapoint-tooltip">
			<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
			<p class="label">${data.datasetLabel}</p>
			<p class="value">${formattedValue}</p>
			</div>`;
	}

	render() {
		this.tooltip.classed("hidden", true);
	}

	positionTooltip() {
		const holder = this.services.domUtils.getHolder();
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
