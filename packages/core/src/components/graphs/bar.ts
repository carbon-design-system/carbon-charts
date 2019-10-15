// Internal Imports
import { Component } from "../component";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth() {
		const mainXAxis = this.services.axes.getMainXAxis();
		const options = this.model.getOptions();

		if (!mainXAxis.scale.step) {
			return options.bars.maxWidth;
		}

		return Math.min(
			options.bars.maxWidth,
			mainXAxis.scale.step() / 2
		);
	}
}
