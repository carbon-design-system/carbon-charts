import * as Configuration from "../../configuration";
import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, mouse, event } from "d3-selection";

export class TooltipBar extends Tooltip {
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

		return `<div class="datapoint-tooltip"><p class="label">${data.datasetLabel}</p><p class="value">${formattedValue}</p></div>`;
	}

	/**
	 * Multip tooltips for bar charts include totals for each stack
	 * @param data
	 */
	getMultiTooltipHTML(data: any) {
		const points = data;
		let total = 0;

		points.reverse();

		// get the total for the tooltip
		points.forEach(item => total += item.value);

		let listHTML = "<ul class='multi-tooltip'>";

		points.forEach(datapoint => {
			const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
			this.model.getOptions().tooltip.valueFormatter(datapoint.value) : datapoint.value.toLocaleString("en");

			const indicatorColor = this.model.getStrokeColor(datapoint.datasetLabel, datapoint.label, datapoint.value);

			listHTML += `<li><div class="datapoint-tooltip">
				<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
				<p class="label">${datapoint.datasetLabel}</p>
				<p class="value">${formattedValue}</p>
				</div></li>`;
		});

		return listHTML + `<li><div class='total-val'><p class='label'>Total</p><p class='value'>${total}</p></div></li></ul>` ;
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
