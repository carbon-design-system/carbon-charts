import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";


export class TooltipScatter extends Tooltip {
	getTooltipHTML(data: any) {
		const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");

		const indicatorColor = this.model.getStrokeColor(data.datasetLabel, data.label, data.value, data);

		return `
			<div class="datapoint-tooltip">
				<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
				<p class="label">${data.datasetLabel}</p>
				<p class="value">${formattedValue}</p>
			</div>`;
	}
}
