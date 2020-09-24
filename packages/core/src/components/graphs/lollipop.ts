// Internal Imports
import { Scatter } from "./scatter";
import { Tools } from "../../tools";

// D3 Imports
import { Selection } from "d3-selection";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

export class Lollipop extends Scatter {
	type = "lollipop";

	render(animate: boolean) {
		super.render(animate);

		// Grab container SVG
		const svg = this.getContainerSVG({ withinChartClip: true });

		const options = this.model.getOptions();

		const { groupMapsTo } = options.data;

		const { cartesianScales, transitions } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const rangeIdentifier = cartesianScales.getRangeIdentifier();

		const getDomainValue = (d, i) => cartesianScales.getDomainValue(d, i);
		const getRangeValue = (d, i) => cartesianScales.getRangeValue(d, i);
		const [
			getXValue,
			getYValue
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		);

		// Update data on lines
		const lines = svg
			.selectAll("line.line")
			.data(
				this.scatterData,
				(datum) => `${datum[groupMapsTo]}-${datum[domainIdentifier]}`
			);

		// Remove lines that are no longer needed
		lines.exit().attr("opacity", 0).remove();

		// Remove lines that need to be removed
		const enteringLines = lines.enter().append("line").attr("opacity", 0);

		enteringLines
			.merge(lines)
			.classed("line", true)
			.transition(
				this.services.transitions.getTransition(
					"lollipop-line-update-enter",
					animate
				)
			)
			.attr("x1", getXValue)
			.attr("x2", getXValue)
			.attr("y1", mainYScale.range()[0])
			.attr("y2", getYValue)
			.attr("stroke", (d) =>
				this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
			)
			.attr("opacity", 1);
	}

	// getRadiusScale(selection: Selection<any, any, any, any>) {
	// 	const options = this.model.getOptions();
	// 	const { radiusMapsTo } = options.bubble;

	// 	const data = selection.data();
	// 	// Filter out any null/undefined values
	// 	const allRadii = data
	// 		.map((d) => d[radiusMapsTo])
	// 		.filter((radius) => radius);
	// 	const chartSize = DOMUtils.getSVGElementSize(
	// 		this.services.domUtils.getMainSVG(),
	// 		{ useAttr: true }
	// 	);

	// 	// We need the ternary operator here in case the user
	// 	// doesn't provide radius values in data
	// 	const radiusDataIsValid = allRadii.length > 0;
	// 	const domain = radiusDataIsValid ? extent(allRadii) : [1, 1];
	// 	return scaleLinear()
	// 		.domain(domain)
	// 		.range(
	// 			radiusDataIsValid
	// 				? options.bubble.radiusRange(chartSize, data)
	// 				: [4, 4]
	// 		);
	// }

	// styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
	// 	// Chart options mixed with the internal configurations
	// 	const options = this.model.getOptions();
	// 	const { radiusMapsTo } = options.bubble;

	// 	const radiusScale = this.getRadiusScale(selection);

	// 	const { groupMapsTo } = options.data;
	// 	const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

	// 	selection
	// 		.raise()
	// 		.classed("dot", true)
	// 		.attr("role", Roles.GRAPHICS_SYMBOL)
	// 		.attr("cx", (d, i) =>
	// 			this.services.cartesianScales.getDomainValue(d, i)
	// 		)
	// 		.transition(
	// 			this.services.transitions.getTransition(
	// 				"bubble-update-enter",
	// 				animate
	// 			)
	// 		)
	// 		.attr("cy", (d, i) =>
	// 			this.services.cartesianScales.getRangeValue(d, i)
	// 		)
	// 		// We need `|| 1` here in case the user doesn't provide radius values in data
	// 		.attr("r", (d) => radiusScale(d[radiusMapsTo] || 1))
	// 		.attr("fill", (d) =>
	// 			this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
	// 		)
	// 		.attr("fill-opacity", options.bubble.fillOpacity)
	// 		.attr("stroke", (d) =>
	// 			this.model.getStrokeColor(
	// 				d[groupMapsTo],
	// 				d[domainIdentifier],
	// 				d
	// 			)
	// 		)
	// 		.attr("opacity", 1);
	// }
}
