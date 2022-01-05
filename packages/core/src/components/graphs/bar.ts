// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth(allDataLabels?: string[]) {
		const options = this.getOptions();
		if (options.bars.width) {
			return options.bars.width;
		}

		const numberOfDatapoints = this.model.getDisplayData().length;
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const chartWidth = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		}).width;

		if (!mainXScale.step) {
			return Math.min(
				options.bars.maxWidth,
				(chartWidth * 0.25) / numberOfDatapoints
			);
		}

		return Math.min(options.bars.maxWidth, mainXScale.step() / 2);
	}

	protected isOutsideZoomedDomain(x0: number, x1: number) {
		const dataCount = this.model.getDisplayData().length;
		// if only one data point, never out of zoom domain
		// or it becomes a blank chart
		if (dataCount <= 1) {
			return false;
		}

		const zoomDomain = this.model.get('zoomDomain');
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
