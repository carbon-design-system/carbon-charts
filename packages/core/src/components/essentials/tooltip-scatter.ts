import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { TooltipTypes } from "./../../interfaces";


export class TooltipScatter extends Tooltip {
	getTooltipHTML(data: any, type: TooltipTypes) {
		if (type === TooltipTypes.TITLE) {
			// the main tooltip component handles title styles
			return super.getTooltipHTML(data, type);
		}

		const valueFormatter = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter");
		const formattedValue = valueFormatter ? valueFormatter(data.value) : data.value.toLocaleString("en");

		const indicatorColor = this.model.getStrokeColor(data.datasetLabel, data.label, data.value);

		return `
			<div class="datapoint-tooltip">
				<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
				<p class="label">${data.datasetLabel}</p>
				<p class="value">${formattedValue}</p>
			</div>`;
	}
}
