// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { BarOrientationOptions, ScaleTypes } from "../../interfaces";

export class ZeroLine extends Component {
	type = "zero-line";

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getContainerSVG();

		if (this.model.getOptions().orientation === BarOrientationOptions.HORIZONTAL) {
			// no zero line should display if its scaled based on labels
			if (this.services.axes.getMainXAxis().scaleType === ScaleTypes.LABELS) {
				return;
			}
			// Get x & y position of the line
			const [y1, y2] = this.services.axes.getMainYAxis().scale.range();
			const xPosition = +this.services.axes.getXValue(0) + 0.5;

			const verticalLine = DOMUtils.appendOrSelect(svg, "line.domain");
			verticalLine
				.transition(this.services.transitions.getTransition("zero-line-update", animate))
				.attr("y1", y1)
				.attr("y2", y2)
				.attr("x1", xPosition)
				.attr("x2", xPosition);
		} else {
			// no zero line should display if its scaled based on labels
			if (this.services.axes.getMainYAxis().scaleType === ScaleTypes.LABELS) {
				return;
			}
			// Get x & y position of the line
			const [x1, x2] = this.services.axes.getMainXAxis().scale.range();
			const yPosition = +this.services.axes.getYValue(0) + 0.5;

			const horizontalLine = DOMUtils.appendOrSelect(svg, "line.domain");
			horizontalLine
				.transition(this.services.transitions.getTransition("zero-line-update", animate))
				.attr("y1", yPosition)
				.attr("y2", yPosition)
				.attr("x1", x1)
				.attr("x2", x2);
		}
	}
}
