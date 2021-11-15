// Internal Imports
import { Tools } from '../../tools';
import {
	RenderTypes,
	Roles,
	TruncationTypes,
	ColorLegendType,
} from '../../interfaces';
import * as Configuration from '../../configuration';

// D3 imports
import { axisBottom } from 'd3-axis';
import { Legend } from '..';
import { scaleBand, scaleLinear } from 'd3-scale';
import { interpolateRound, quantize } from 'd3-interpolate';

export class ColorScaleLegend extends Legend {
	type = 'color-legend';
	renderType = RenderTypes.SVG;

	private gradient_id =
		'gradient-id-' + Math.floor(Math.random() * 99999999999);

	render() {
		const options = this.getOptions();

		// svg and container widths
		const svg = this.getComponentContainer();
		svg.html('').attr('role', Roles.GROUP);

		const customColors = Tools.getProperty(
			options,
			'color',
			'gradient',
			'colors'
		);
		const customColorsEnabled = !Tools.isEmpty(customColors);

		const palette = this.model.selectedPalette;
		const domain = this.model.getValueDomain();

		const group = svg.append('g');

		if (this.model.colorScaleType === ColorLegendType.LINEAR) {
			const stopLengthPercentage = 100 / (palette.length - 1);

			// Generate the gradient
			const linearGradient = group
				.append('linearGradient')
				.attr('id', `${this.gradient_id}-legend`)
				.selectAll('stop')
				.data(palette)
				.enter()
				.append('stop')
				.attr('offset', (_, i) => `${i * stopLengthPercentage}%`)
				.attr('stop-color', (d) => d);

			const rectangle = group
				.append('rect')
				.attr('width', Configuration.legend.color.barWidth)
				.attr('height', Configuration.legend.color.barHeight)
				.style('fill', `url(#${this.gradient_id}-legend)`);

			// Create scale & ticks
			const linearScale = scaleLinear()
				.domain(domain)
				.range([0, Configuration.legend.color.barWidth]);
			domain.splice(1, 0, (domain[0] + domain[1]) / 2);

			const xAxis = axisBottom(linearScale)
				.tickSize(0)
				.tickValues(domain);

			// Align axes at the bottom of the rectangle and delete the domain line
			const axis = group
				.append('g')
				.attr(
					'transform',
					`translate(0,${Configuration.legend.color.axisYTranslation})`
				)
				.call(xAxis);

			// Remove domain
			axis.select('.domain').remove();

			// Align text to fit in container
			axis.style('text-anchor', 'start');
		} else if (this.model.colorScaleType === ColorLegendType.QUANTIZE) {
			const colorScaleBand = scaleBand()
				.domain(palette)
				.rangeRound([0, Configuration.legend.color.barWidth]);

			// Generate equal chunks between range to act as ticks
			const interpolator = interpolateRound(domain[0], domain[1]);
			const quant = quantize(interpolator, palette.length);

			const rect = group
				.selectAll('rect')
				.data(colorScaleBand.domain())
				.join('rect')
				.attr('x', colorScaleBand)
				.attr('y', 0)
				.attr('width', Math.max(0, colorScaleBand.bandwidth() - 1))
				.attr('height', Configuration.legend.color.barHeight);

			// Use attribute fill or css depending on custom Colors
			if (customColorsEnabled) {
				rect.attr('fill', (_, i) => {
					return palette[i];
				});
			} else {
				rect.attr('class', (_, i) => {
					return palette[i];
				});
			}

			const xAxis = axisBottom(colorScaleBand)
				.tickSize(0)
				.tickValues(palette)
				.tickFormat((_, i) => {
					// Use the quant interpolators as ticks
					return quant[i].toString();
				});

			// Align axis to match bandwidth start after initial (white)
			group
				.append('g')
				.attr(
					'transform',
					`translate(${colorScaleBand.bandwidth() / 2}, ${
						Configuration.legend.color.axisYTranslation
					})`
				)
				.call(xAxis)
				.select('.domain')
				.remove();
		} else {
			throw Error('Entered color legend type is not supported.');
		}
	}
}
