// Internal Imports
import { Component } from "../component";
import { BarOrientationOptions } from "../../interfaces";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth() {
		const options = this.model.getOptions();
		let mainAxis;

		// if its horizontal we want to use the Y axis to determine instead of X
		if (options.orientation === BarOrientationOptions.HORIZONTAL) {
			mainAxis =  this.services.axes.getMainYAxis();
		} else {
			mainAxis =  this.services.axes.getMainXAxis();
		}

		if (!mainAxis.scale.step) {
			return Math.min(
				options.bars.maxWidth,
				(5 / mainAxis.scale.ticks().length) * options.bars.maxWidth
			);
		}

		return Math.min(
			options.bars.maxWidth,
			mainAxis.scale.step() / 2
		);
	}
}
