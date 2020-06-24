import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { TooltipTypes } from "../../interfaces";

export class TooltipPie extends Tooltip {
	getTooltipHTML(d: any, type: TooltipTypes) {
		// check if it is getting styles for a title tooltip
		if (type === ( TooltipTypes.TITLE || TooltipTypes.LEGEND )) {
			return super.getTooltipHTML(d, type);
		}

		const dataVal = d.data;
		const { groupMapsTo } = this.model.getOptions().data;

		// format the value if needed
		const formattedValue = Tools.getProperty(
			this.model.getOptions(),
			"tooltip",
			"valueFormatter"
		)
			? this.model.getOptions().tooltip.valueFormatter(dataVal.value)
			: dataVal.value.toLocaleString("en");

		// pie charts don't have a dataset label since they only support one dataset
		const label = dataVal[groupMapsTo];

		return `<div class="datapoint-tooltip">
				<p class="label">${label}</p>
				<p class="value">${formattedValue}</p>
			</div>`;
	}
}
