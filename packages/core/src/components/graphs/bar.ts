// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth(allDataLabels?: string[]) {
		const options = this.model.getOptions();
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const width = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		}).width;

		if (!mainXScale.step) {
			return Math.min(
				options.bars.maxWidth,
				width * 0.9 / mainXScale.ticks().length
			);
		}

		return Math.min(options.bars.maxWidth, mainXScale.step() / 2);
	}
}
