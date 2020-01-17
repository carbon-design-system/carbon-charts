import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { TooltipTypes } from "./../../interfaces";


export class TooltipScatter extends Tooltip {
	getTooltipHTML(data: any, type: TooltipTypes) {
		if (type === TooltipTypes.TITLE) {
			// the main tooltip component handles title styles
			return super.getTooltipHTML(data, type);
		}

		const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");

		// For the tooltip color, we always want the normal stroke color, not dynamically determined by data value.
		const indicatorColor = this.model.getStrokeColor(data.datasetLabel, data.label);

		return `
			<div class="datapoint-tooltip">
				<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
				<p class="label">${data.datasetLabel}</p>
				<p class="value">${formattedValue}</p>
			</div>`;
	}
}
