// Internal Imports
import { Service } from "../service";
import { DOMUtils } from "../";

export class GradientUtils extends Service {
	static appendLinearGradient(configs) {
		const lg = configs.svg
			.append("defs")
			.append("linearGradient")
			.attr("id", configs.id)
			.attr("x1", configs.x1)
			.attr("x2", configs.x2)
			.attr("y1", configs.y1)
			.attr("y2", configs.y2);
		for (const stop of configs.stops) {
			lg.append("stop")
				.attr("offset", stop.offset)
				.style("stop-color", stop.color)
				.style("stop-opacity", stop.opacity);
		}
	}

	static need3Stops(domain) {
		if (domain[0] < 0 && domain[1] > 0) {
			return true;
		}
	}

	static getOffsetRatio(domain) {
		const offsetRatio = (Math.abs(domain[1]) * 100 / Math.abs(domain[0] - domain[1])).toFixed(2) + "%";
		return offsetRatio;
	}

	static getStops(domain, color) {
		const is3Stops = GradientUtils.need3Stops(domain);
		let stops: object[] = [
			{
				offset: "0%",
				color: color,
				opacity: "0.6"
			},
			{
				offset: "80%",
				color: color,
				opacity: "0"
			}
		];

		if (is3Stops) {
			stops = [
				{
					offset: "0%",
					color: color,
					opacity: "0.6"
				},
				{
					offset: GradientUtils.getOffsetRatio(domain),
					color: color,
					opacity: "0"
				},
				{
					offset: "100%",
					color: color,
					opacity: "0.6"
				}
			];
		}
		return stops;
	}
}
