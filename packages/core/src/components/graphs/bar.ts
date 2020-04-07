// Internal Imports
import { Component } from "../component";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth() {
		const options = this.model.getOptions();
		const mainXScale = this.services.cartesianScales.getMainXScale();

		if (!mainXScale.step) {
			return Math.min(
				options.bars.maxWidth,
				(5 / mainXScale.ticks().length) * options.bars.maxWidth
			);
		}

		return Math.min(
			options.bars.maxWidth,
			mainXScale.step() / 2
		);
	}
}
