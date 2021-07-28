// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';
import { Roles, ColorClassNameTypes, RenderTypes } from '../../interfaces';

// D3 Imports
import { scaleLinear } from 'd3-scale';

export class Meter extends Component {
	type = 'meter';
	renderType = RenderTypes.SVG;

	render(animate = true) {
		const self = this;
		const svg = this.getComponentContainer();
		const options = this.getOptions();
		const data = this.model.getDisplayData();
		const status = this.model.getStatus();

		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		const { groupMapsTo } = options.data;

		// each meter has a scale for the value but no visual axis
		const xScale = scaleLinear().domain([0, 100]).range([0, width]);

		// draw the container to hold the value
		DOMUtils.appendOrSelect(svg, 'rect.container')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', Tools.getProperty(options, 'meter', 'height'));

		// value larger than 100 will display as 100% on meter chart
		const maximumBarWidth = data.value >= 100;

		// rect with the value binded
		const value = svg.selectAll('rect.value').data([data]);

		// if user provided a color for the bar, we dont want to attach a status class
		const className =
			status != null && !self.model.isUserProvidedColorScaleValid()
				? `value status--${status}`
				: 'value';

		// draw the value bar
		value
			.enter()
			.append('rect')
			.classed('value', true)
			.merge(value)
			.attr('x', 0)
			.attr('y', 0)
			.attr('height', Tools.getProperty(options, 'meter', 'height'))
			.attr('class', (d) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d[groupMapsTo],
					originalClassName: className,
				})
			)
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'meter-bar-update',
					animate,
				})
			)
			.attr('width', (d) =>
				maximumBarWidth ? xScale(100) : xScale(d.value)
			)
			.style('fill', (d) => self.model.getFillColor(d[groupMapsTo]))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'value')
			.attr('aria-label', (d) => d.value);

		// draw the peak
		const peakValue = Tools.getProperty(options, 'meter', 'peak');

		// update the peak if it is less than the value, it should be equal to the value
		const updatedPeak =
			peakValue !== null && peakValue < data.value
				? data.value
				: peakValue;
		// dont display peak if there isnt one
		const peakData =
			updatedPeak === null || maximumBarWidth ? [] : [updatedPeak];

		// if a peak is supplied within the domain, we want to render it
		const peak = svg.selectAll('line.peak').data(peakData);

		peak.enter()
			.append('line')
			.classed('peak', true)
			.merge(peak)
			.attr('y1', 0)
			.attr('y2', Tools.getProperty(options, 'meter', 'height'))
			.transition()
			.call((t) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'peak-line-update',
					animate,
				})
			)
			.attr('x1', (d) => xScale(d))
			.attr('x2', (d) => xScale(d))
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'peak')
			.attr('aria-label', (d) => d);

		peak.exit().remove();

		// this forces the meter chart to only take up as much height as needed (if no height is provided)
		this.services.domUtils.setSVGMaxHeight();
	}
}
