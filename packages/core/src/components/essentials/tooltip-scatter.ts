import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { TooltipTypes } from "./../../interfaces";

export class TooltipScatter extends Tooltip {
	getTooltipHTML(data: any, type: TooltipTypes) {
		if (type === TooltipTypes.TITLE) {
			// the main tooltip component handles title styles
			return super.getTooltipHTML(data, type);
		}

		const { groupIdentifier } = this.model.getOptions().data;
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(data[rangeIdentifier]) : data[rangeIdentifier].toLocaleString("en");

		// For the tooltip color, we always want the normal stroke color, not dynamically determined by data value.
		const indicatorColor = this.model.getStrokeColor(data[groupIdentifier]);

		return `
			<div class="datapoint-tooltip">
				<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
				<p class="label">${data[groupIdentifier]}</p>
				<p class="value">${formattedValue}</p>
			</div>`;
	}
}
