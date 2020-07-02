// Internal Imports
import { Component } from "../component";

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth(allDataLabels?: string[]) {
		const options = this.model.getOptions();
		const mainXScale = this.services.cartesianScales.getMainXScale();

		if (!mainXScale.step) {
			return Math.min(
				options.bars.maxWidth,
				(5 / mainXScale.ticks().length) * options.bars.maxWidth
			);
		}

		return Math.min(options.bars.maxWidth, mainXScale.step() / 2);
	}

	protected isOutOfZoomDomain(x0: number, x1: number) {
		const zoomDomain = this.model.get("zoomDomain");
		if (zoomDomain !== undefined) {
			const domainScale = this.services.cartesianScales.getDomainScale();
			return (
				x0 < domainScale(zoomDomain[0]) ||
				x1 > domainScale(zoomDomain[1])
			);
		}
		return false;
	}
}
