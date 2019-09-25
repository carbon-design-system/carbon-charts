import * as Configuration from "../../configuration";
import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// Carbon position service
import { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { mouse } from "d3-selection";

export class TooltipBar extends Tooltip {

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
