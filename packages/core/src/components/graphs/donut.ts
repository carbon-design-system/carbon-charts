// Internal Imports
import { Pie } from "./pie";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { interpolateNumber } from "d3-interpolate";

const donutCenterNumberTween = (d3Ref, newNumber: number) => {
	// Remove commas from the current value string, and convert to an int
	const currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10) || 0;
	const i = interpolateNumber(currentValue, newNumber);

	const formatInterpolatedValue = number => Math.floor(number).toLocaleString();

	return t => d3Ref.text(formatInterpolatedValue(i(t)));
};

export class Donut extends Pie {
	type = "donut";

	render(animate = true) {
		// Call render() from Pie
		super.render(animate);

		const svg = DOMUtils.appendOrSelect(this.getContainerSVG(), "g.center");
		const options = this.model.getOptions();

		// Compute the outer radius needed
		const radius = this.computeRadius();

		let donutCenterFigure = Tools.getProperty(options, "center", "number");
		if (!donutCenterFigure) {
			donutCenterFigure = this.getDataList().reduce((accumulator, d) => {
				return accumulator + d.value;
			}, 0);
		}

		// Add the number shown in the center of the donut
		DOMUtils.appendOrSelect(svg, "text.donut-figure")
			.attr("text-anchor", "middle")
			.style("font-size", () => options.donut.center.numberFontSize(radius))
			.transition(this.services.transitions.getTransition("donut-figure-enter-update", animate))
			.tween("text", function() {
				return donutCenterNumberTween(select(this), donutCenterFigure);
			});

		// Add the label below the number in the center of the donut
		DOMUtils.appendOrSelect(svg, "text.donut-title")
			.attr("text-anchor", "middle")
			.style("font-size", () => options.donut.center.titleFontSize(radius))
			.attr("y", options.donut.center.titleYPosition(radius))
			.text(options.donut.center.label);
	}

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();

		return radius * (3 / 4);
	}
}
