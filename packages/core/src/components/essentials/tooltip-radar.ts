import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import {TooltipTypes} from "../../interfaces";

export class TooltipRadar extends Tooltip {
	getMultilineTooltipHTML(data: any, type: TooltipTypes) {
		if (type === TooltipTypes.LEGEND) {
			return `<div class="title-tooltip"><text>${data.product}</text></div>`;
		}
		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;
		const { angle, value } = options.radar.axes;

		// sort them so they are in the same order as the graph
		data.sort((a, b) => b[value] - a[value]);

		return (
			"<ul class='multi-tooltip'>" +
			data
				.map((datum) => {
					const userProvidedValueFormatter = Tools.getProperty(
						options,
						"tooltip",
						"valueFormatter"
					);
					const formattedValue = userProvidedValueFormatter
						? userProvidedValueFormatter(datum[value])
						: datum[value];

					// For the tooltip color, we always want the normal stroke color, not dynamically determined by data value.
					const indicatorColor = this.model.getStrokeColor(
						datum[groupMapsTo]
					);

					return `
				<li>
					<div class="datapoint-tooltip">
						<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
						<p class="label">${datum[groupMapsTo]}</p>
						<p class="value">${formattedValue}</p>
					</div>
				</li>`;
				})
				.join("") +
			"</ul>"
		);
	}
}
