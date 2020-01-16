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
			mainAxis =  this.services.cartesianScales.getMainYAxis();
		} else {
			mainAxis =  this.services.cartesianScales.getMainXAxis();
		}

		if (!mainAxis.step) {
			return Math.min(
				options.bars.maxWidth,
				(5 / mainAxis.ticks().length) * options.bars.maxWidth
			);
		}

		return Math.min(
			options.bars.maxWidth,
			mainAxis.step() / 2
		);
	}
}
