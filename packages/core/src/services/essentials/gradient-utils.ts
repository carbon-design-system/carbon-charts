// Internal Imports
import { Service } from "../service";
import { DOMUtils } from "../";

export class GradientUtils extends Service {
	static appendLinearGradient(svg, id, x1, x2, y1, y2, stopAttrList) {
		const lg = svg
			.append("defs")
			.append("linearGradient")
			.attr("id", id)
			.attr("x1", x1)
			.attr("x2", x2)
			.attr("y1", y1)
			.attr("y2", y2);
		for (const stopAttr of stopAttrList) {
			lg.append("stop")
				.attr("offset", stopAttr.offset)
				.style("stop-color", stopAttr.color)
				.style("stop-opacity", stopAttr.opacity);
		}
	}

	static need3Stops(domain) {
		if (domain[0] < 0 && domain[1] > 0) {
			return true;
		}
	}

	static getOffsetRatio(dataset) {
		const minAndMax = [
			Math.min.apply(
				Math,
				dataset.map(function (o) {
					return o.value;
				})
			),
			Math.max.apply(
				Math,
				dataset.map(function (o) {
					return o.value;
				})
			)
		];
		const offsetRatio =
			(
				(Math.abs(minAndMax[1]) * 100) /
				Math.abs(minAndMax[0] - minAndMax[1])
			).toFixed(2) + "%";
		return offsetRatio;
	}

	static getStopArray(is3Stops, dataset, color) {
		let stopArray: object[] = [
			{
				offset: "0%",
				color: color,
				opacity: "1"
			},
			{
				offset: "100%",
				color: color,
				opacity: "0"
			}
		];
		if (is3Stops) {
			stopArray = [
				{
					offset: "0%",
					color: color,
					opacity: "1"
				},
				{
					offset: GradientUtils.getOffsetRatio(dataset.data),
					color: color,
					opacity: "0"
				},
				{
					offset: "100%",
					color: color,
					opacity: "1"
				}
			];
		}
		return stopArray;
	}
}
