// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

export class HorizontalZeroLine extends Component {
	type = "horizontal-zero-line";

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getContainerSVG();

		// Get x & y position of the line
		const [x1, x2] = this.services.axes.getMainXAxis().scale.range();
		const yPosition = this.services.axes.getYValue(0) + 0.5;

		const horizontalLine = DOMUtils.appendOrSelect(svg, "line.domain");
		horizontalLine
			.transition(this.services.transitions.getTransition("horizontal-line-update", animate))
			.attr("y1", yPosition)
			.attr("y2", yPosition)
			.attr("x1", x1)
			.attr("x2", x2);
	}
}
