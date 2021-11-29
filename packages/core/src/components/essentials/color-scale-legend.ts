// Internal Imports
import { Tools } from '../../tools';
import { ColorLegendType, Events, RenderTypes, Roles } from '../../interfaces';
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

	private dimensions = [];

	init() {
		console.log('inside here 2 - init');
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(
			Events.Axis.RENDER_COMPLETE,
			this.handleAxisComplete
		);
	}

	handleAxisComplete = (event: CustomEvent) => {
		const { cartesianScales } = this.services;
		// Get available chart area
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();

		this.dimensions = [mainXScale.range(), mainYScale.range()];

		// Move the legend to the right
		// Add the text
	};

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

		const domain = this.model.getValueDomain();

		const colorScaleType = Tools.getProperty(
			options,
			'legend',
			'colorLegend',
			'type'
		);

		let colorPairingOption = Tools.getProperty(
			options,
			'color',
			'pairing',
			'option'
		);

		const group = svg.append('g');

		// If domain consists of negative and positive values, use diverging palettes
		const colorScheme = domain[0] < 0 && domain[1] > 0 ? 'diverge' : 'mono';

		// Use default color pairing options if not in defined range
		if (
			colorPairingOption < 1 &&
			colorPairingOption > 4 &&
			colorScheme === 'mono'
		) {
			colorPairingOption = 1;
		} else if (
			colorPairingOption < 1 &&
			colorPairingOption > 2 &&
			colorScheme === 'diverge'
		) {
			colorPairingOption = 1;
		}

		let colorPairing = [];
		// Carbon charts has 11 colors for a single monochromatic palette & 17 for a divergent palette
		let colorGroupingLength = colorScheme === 'diverge' ? 17 : 11;

		if (!customColorsEnabled) {
			// Add class names to list and the amount based on the color scheme
			for (let i = 1; i < colorGroupingLength + 1; i++) {
				colorPairing.push(
					colorScaleType === ColorLegendType.LINEAR
						? `stop-color-${colorScheme}-${colorPairingOption}-${i}`
						: `fill-${colorScheme}-${colorPairingOption}-${i}`
				);
			}
		} else {
			// Use custom colors
			colorPairing = customColors;
		}

		if (colorScaleType === ColorLegendType.LINEAR) {
			const stopLengthPercentage = 100 / (colorPairing.length - 1);

			// Generate the gradient
			const linearGradient = group
				.append('linearGradient')
				.attr('id', `${this.gradient_id}-legend`)
				.selectAll('stop')
				.data(colorPairing)
				.enter()
				.append('stop')
				.attr('offset', (_, i) => `${i * stopLengthPercentage}%`)
				.attr('class', (_, i) => colorPairing[i])
				.attr('stop-color', (d) => d);

			// Create the legend container
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
		} else if (colorScaleType === ColorLegendType.QUANTIZE) {
			// Generate equal chunks between range to act as ticks
			const interpolator = interpolateRound(domain[0], domain[1]);
			const quant = quantize(interpolator, colorPairing.length);

			// Remove white if divergent is used
			const other = colorPairing;
			// If divergent && non-custom color, remove 0/white from being displayed
			if (!customColorsEnabled && colorScheme === 'diverge') {
				colorPairing.splice(colorPairing.length / 2, 1);
			}

			const colorScaleBand = scaleBand()
				.domain(colorPairing)
				.rangeRound([0, Configuration.legend.color.barWidth]);

			const rectangle = group
				.selectAll('rect')
				.data(colorScaleBand.domain())
				.join('rect')
				.attr('x', colorScaleBand)
				.attr('y', 0)
				.attr('width', Math.max(0, colorScaleBand.bandwidth() - 1))
				.attr('height', Configuration.legend.color.barHeight)
				.attr('class', (d) => d)
				.attr('fill', (d) => d);

			const xAxis = axisBottom(colorScaleBand)
				.tickSize(0)
				.tickValues(colorPairing)
				.tickFormat((_, i) => {
					// Display every other tick to create space
					if (
						!customColorsEnabled &&
						((i + 1) % 2 === 0 || i === colorPairing.length - 1)
					) {
						console.log('tick formating', i + 1, quant[i]);
						return null;
					}

					// Use the quant interpolators as ticks
					return quant[i].toString();
				});

			// Align axis to match bandwidth start after initial (white)
			const legendAxis = group
				.append('g')
				.classed('legend-axis', true)
				.attr(
					'transform',
					`translate(${
						!customColorsEnabled && colorScheme === 'diverge'
							? '-'
							: ''
					}${colorScaleBand.bandwidth() / 2}, ${
						Configuration.legend.color.axisYTranslation
					})`
				)
				.call(xAxis);

			const firstTick = legendAxis.select('g.tick').clone(true);
			firstTick
				.attr(
					'transform',
					`translate(${Configuration.legend.color.barWidth}, 0)`
				)
				.classed('final-tick', true)
				.select('text')
				.text(quant[quant.length - 1]);

			legendAxis.enter().append(firstTick.node()).raise();

			legendAxis.select('.domain').remove();

			console.log('legendAxis', legendAxis);
		} else {
			throw Error('Entered color legend type is not supported.');
		}
	}

	destroy() {
		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(
			Events.Axis.RENDER_COMPLETE,
			this.handleAxisComplete
		);
	}
}
