// Internal Imports
import { Scatter } from "./scatter";
import { Tools } from "../../tools";
import { ColorClassNameTypes } from "../../interfaces";

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
			.attr("class", (d) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: d[groupMapsTo],
					originalClassName: "line"
				})
			)
			.transition(
				this.services.transitions.getTransition(
					"lollipop-line-update-enter",
					animate
				)
			)
			.attr("x1", getXValue)
			.attr("x2", getXValue)
			.attr("y1", mainYScale.range()[0])
			.attr("y2", (d, i) => getYValue(d, i) as any + 3)
			.attr("stroke", (d) =>
				this.model.getFillColor(d[groupMapsTo], d[domainIdentifier], d)
			)
			.attr("opacity", 1);
	}
}
