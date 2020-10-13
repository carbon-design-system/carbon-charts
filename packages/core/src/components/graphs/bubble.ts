// Internal Imports
import { Scatter } from "./scatter";
import { DOMUtils } from "../../services";
import { Roles } from "../../interfaces";

// D3 Imports
import { Selection } from "d3-selection";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

export class Bubble extends Scatter {
	type = "bubble";

	getRadiusScale(selection: Selection<any, any, any, any>) {
		const options = this.model.getOptions();
		const { radiusMapsTo } = options.bubble;

		const data = selection.data();
		// Filter out any null/undefined values
		const allRadii = data
			.map((d) => d[radiusMapsTo])
			.filter((radius) => radius);
		const chartSize = DOMUtils.getSVGElementSize(
			this.services.domUtils.getMainSVG(),
			{ useAttr: true }
		);

		// We need the ternary operator here in case the user
		// doesn't provide radius values in data
		const radiusDataIsValid = allRadii.length > 0;
		const domain = radiusDataIsValid ? extent(allRadii) : [1, 1];
		return scaleLinear()
			.domain(domain)
			.range(
				radiusDataIsValid
					? options.bubble.radiusRange(chartSize, data)
					: [4, 4]
			);
	}

	styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();
		const { radiusMapsTo } = options.bubble;

		const radiusScale = this.getRadiusScale(selection);
		const { groupMapsTo } = options.data;

		selection
			.raise()
			.classed("dot", true)
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("cx", (d, i) =>
				this.services.cartesianScales.getDomainValue(d, i)
			)
			.transition(
				this.services.transitions.getTransition(
					"bubble-update-enter",
					animate
				)
			)
			.attr("cy", (d, i) =>
				this.services.cartesianScales.getRangeValue(d, i)
			)
			// We need `|| 1` here in case the user doesn't provide radius values in data
			.attr("r", (d) => radiusScale(d[radiusMapsTo] || 1))
			.attr("fill", (d) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d);
				return this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d);
			}
			)
			.attr("fill-opacity", options.bubble.fillOpacity)
			.attr("stroke", (d) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(d);
				return this.model.getStrokeColor(
					d[groupMapsTo],
					d[domainIdentifier],
					d
				);
			})
			.attr("opacity", 1);
	}
}
