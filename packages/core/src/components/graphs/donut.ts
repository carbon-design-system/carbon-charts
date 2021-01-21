// Internal Imports
import { Pie } from './pie';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';

// D3 Imports
import { select } from 'd3-selection';
import { interpolateNumber, interpolateRound } from 'd3-interpolate';

export class Donut extends Pie {
	type = 'donut';

	render(animate = true) {
		// Call render() from Pie
		super.render(animate);

		const self = this;

		// if there are no data, remove the center content
		// that is the old one and do nothing
		if (this.model.isDataEmpty()) {
			this.getContainerSVG().select('g.center').remove();
			return;
		}

		const svg = DOMUtils.appendOrSelect(this.getContainerSVG(), 'g.center');
		const options = this.getOptions();

		// Compute the outer radius needed
		const radius = this.computeRadius();

		// Add the number shown in the center of the donut
		DOMUtils.appendOrSelect(svg, 'text.donut-figure')
			.attr('text-anchor', 'middle')
			.style('font-size', () =>
				options.donut.center.numberFontSize(radius)
			)
			.transition(
				this.services.transitions.getTransition(
					'donut-figure-enter-update',
					animate
				)
			)
			.tween('text', function () {
				return self.centerNumberTween(select(this));
			});

		// Add the label below the number in the center of the donut
		DOMUtils.appendOrSelect(svg, 'text.donut-title')
			.attr('text-anchor', 'middle')
			.style('font-size', () =>
				options.donut.center.titleFontSize(radius)
			)
			.attr('y', options.donut.center.titleYPosition(radius))
			.text(Tools.getProperty(options, 'donut', 'center', 'label'));
	}

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();

		return radius * (3 / 4);
	}

	centerNumberTween(d3Ref) {
		const options = this.getOptions();

		let donutCenterFigure = Tools.getProperty(
			options,
			'donut',
			'center',
			'number'
		);
		if (donutCenterFigure === null) {
			donutCenterFigure = this.model
				.getDisplayData()
				.reduce((accumulator, d) => {
					return accumulator + d.value;
				}, 0);
		}

		// Remove commas from the current value string, and convert to an int
		const currentValue =
			parseInt(d3Ref.text().replace(/[, ]+/g, ''), 10) || 0;

		let interpolateFunction;
		if (currentValue % 1 === 0 && donutCenterFigure % 1 === 0) {
			interpolateFunction = interpolateRound;
		} else {
			interpolateFunction = interpolateNumber;
		}

		const i = interpolateFunction(currentValue, donutCenterFigure);

		return (t) => {
			const { numberFormatter } = options.donut.center;
			d3Ref.text(numberFormatter(i(t)));
		};
	}
}
