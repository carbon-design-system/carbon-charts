// Internal Imports
import { Component } from "../component";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth() {
		const options = this.model.getOptions();

		if (!this.services.axes.getMainXAxis().scale.step) {
			return options.bars.maxWidth;
		} else {
			return Math.min(
				options.bars.maxWidth,
				this.services.axes.getMainXAxis().scale.step() / 2
			);
		}
	};
}
