import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";

export class TooltipRadar extends Tooltip {
	getMultilineTooltipHTML(data: any) {
		// sort them so they are in the same order as the graph
		data.sort((a, b) => b.value - a.value);

		return  "<ul class='multi-tooltip'>" +
			data.map(datum => {
				const { groupMapsTo } = this.model.getOptions().data;

				const rangeIdentifier = "value";

				const userProvidedValueFormatter = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter");
				const formattedValue = userProvidedValueFormatter
					? userProvidedValueFormatter(datum[rangeIdentifier])
					: datum[rangeIdentifier].toLocaleString("en");

				// For the tooltip color, we always want the normal stroke color, not dynamically determined by data value.
				const indicatorColor = this.model.getStrokeColor(datum[groupMapsTo]);

				return `
				<li>
					<div class="datapoint-tooltip">
						<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
						<p class="label">${datum[groupMapsTo]}</p>
						<p class="value">${formattedValue}</p>
					</div>
				</li>`;
			}).join("") + "</ul>";
	}
}
