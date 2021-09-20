// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';
import { RenderTypes } from '../../interfaces';

export class ZeroLine extends Component {
	type = 'zero-line';
	renderType = RenderTypes.SVG;

	render(animate: boolean) {
		const axisPosition = this.services.cartesianScales.getRangeAxisPosition(
			{ groups: this.configs.groups }
		);
		const rangeScale = this.services.cartesianScales.getScaleByPosition(
			axisPosition
		);
		// check the domain
		const [minDomainValue, maxDomainValue] = rangeScale.domain();

		const drawZeroLine =
			(minDomainValue > 0 && maxDomainValue < 0) ||
			(minDomainValue < 0 && maxDomainValue > 0);

		// Grab container SVG
		const svg = this.getComponentContainer();

		// show zero line only if is necessary, otherwise make sure tto remove zero line if the chart
		// previously had a domain that went into negatives
		if (!drawZeroLine) {
			// otherwise if a chart draws a zero line and then the domain change the zero line is still in the DOM
			svg.selectAll('line.domain').remove();
			return;
		}

		// Get x & y position of the line
		const [x0, x1] = this.services.cartesianScales.getDomainScale().range();
		let yPosition = +rangeScale(0) + 0.5;

		// if scale domain contains NaN, return the first value of the range
		// this is necessary for the zero line y position that otherwise is NaN
		// so on the top of the chart while we want it on the bottom
		if (!yPosition) {
			yPosition = rangeScale.range()[0];
		}

		const lineCoordinates = Tools.flipSVGCoordinatesBasedOnOrientation(
			{
				x0,
				x1,
				y0: yPosition,
				y1: yPosition,
			},
			this.services.cartesianScales.getOrientation()
		);

		const line = DOMUtils.appendOrSelect(svg, 'line.domain');
		line.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'zero-line-update',
					animate,
				})
			)
			.attr('y1', lineCoordinates.y0)
			.attr('y2', lineCoordinates.y1)
			.attr('x1', lineCoordinates.x0)
			.attr('x2', lineCoordinates.x1);
	}
}
