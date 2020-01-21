// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

export class ZeroLine extends Component {
	type = "zero-line";

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getContainerSVG();

		// Get x & y position of the line
		const [x0, x1] = this.services.cartesianScales.getDomainScale().range();
		const yPosition = +this.services.cartesianScales.getRangeValue(0) + 0.5;

		const lineCoordinates = Tools.flipSVGCoordinatesBasedOnOrientation({
			x0,
			x1,
			y0: yPosition,
			y1: yPosition
		}, this.services.cartesianScales.getOrientation());

		const line = DOMUtils.appendOrSelect(svg, "line.domain");
		line.transition(this.services.transitions.getTransition("zero-line-update", animate))
			.attr("y1", lineCoordinates.y0)
			.attr("y2", lineCoordinates.y1)
			.attr("x1", lineCoordinates.x0)
			.attr("x2", lineCoordinates.x1);
	}
}
