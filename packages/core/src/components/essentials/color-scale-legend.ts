// Internal Imports
import { Tools } from '../../tools';
import { ColorLegendType, Events, RenderTypes, Roles } from '../../interfaces';
import * as Configuration from '../../configuration';
import { Legend } from '../';
import { DOMUtils } from '../../services';

// D3 imports
import { axisBottom } from 'd3-axis';
import { scaleBand, scaleLinear } from 'd3-scale';
import { interpolateRound, quantize } from 'd3-interpolate';

export class ColorScaleLegend extends Legend {
	type = 'color-legend';
	renderType = RenderTypes.SVG;

	private gradient_id =
		'gradient-id-' + Math.floor(Math.random() * 99999999999);

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(
			Events.Axis.RENDER_COMPLETE,
			this.handleAxisComplete
		);
	}

	handleAxisComplete = (event: CustomEvent) => {
		const svg = this.getComponentContainer();

		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		if (width > Configuration.legend.color.barWidth) {
			const title = Tools.getProperty(
				this.getOptions(),
				'legend',
				'colorLegend',
				'title'
			);

			const { cartesianScales } = this.services;
			// Get available chart area
			const mainXScale = cartesianScales.getMainXScale();

			const xDimensions = mainXScale.range();

			// Align legend with the axis
			if (xDimensions[0] > 1) {
				svg.select('g.legend-rectangle').attr(
					'transform',
					`translate(${xDimensions[0]}, 0)`
				);

				if (title) {
					const {
						width: textWidth,
					} = DOMUtils.getSVGElementSize(
						svg.select('g.legend-title').select('text'),
						{ useBBox: true }
					);

					// -9 since LEFT y-axis labels are moved towards the left by 9 by d3
					const availableSpace = xDimensions[0] - textWidth - 9;

					// If space is available align the the label with the axis labels
					if (availableSpace > 1) {
						svg.select('g.legend-title').attr(
							'transform',
							`translate(${availableSpace}, 0)`
						);
					} else {
						// Move the legend down by 16 pixels to display legend text on top
						svg.select('g.legend-rectangle').attr(
							'transform',
							`translate(${xDimensions[0]}, 16)`
						);

						// Align legend title with start of axis
						svg.select('g.legend-title').attr(
							'transform',
							`translate(${xDimensions[0]}, 0)`
						);
					}
				}
			}
		}
	};

	render(animate = false) {
		const options = this.getOptions();

		const customColors = Tools.getProperty(
			options,
			'color',
			'gradient',
			'colors'
		);

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

		const title = Tools.getProperty(
			options,
			'legend',
			'colorLegend',
			'title'
		);

		const customColorsEnabled = !Tools.isEmpty(customColors);
		const domain = this.model.getValueDomain();

		const svg = this.getComponentContainer();
		svg.html('').attr('role', Roles.GROUP);
		const group = svg.append('g').classed('legend-rectangle', true);

		const { width } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		let barWidth = Configuration.legend.color.barWidth;
		if (width <= Configuration.legend.color.barWidth) {
			barWidth = width;
		}

		if (title) {
			svg.append('g')
				.classed('legend-title', true)
				.append('text')
				.text(title)
				.attr('dy', '0.7em');

			// Move the legend down by 16 pixels to display legend text on top
			svg.select('g.legend-rectangle').attr(
				'transform',
				`translate(0, 16)`
			);
		}

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
				.attr('width', barWidth)
				.attr('height', Configuration.legend.color.barHeight)
				.style('fill', `url(#${this.gradient_id}-legend)`);

			// Create scale & ticks
			const linearScale = scaleLinear()
				.domain(domain)
				.range([0, barWidth]);
			domain.splice(1, 0, (domain[0] + domain[1]) / 2);

			const xAxis = axisBottom(linearScale)
				.tickSize(0)
				.tickValues(domain);

			// Align axes at the bottom of the rectangle and delete the domain line
			const axis = group
				.append('g')
				.classed('legend-axis', true)
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

			// If divergent && non-custom color, remove 0/white from being displayed
			if (!customColorsEnabled && colorScheme === 'diverge') {
				colorPairing.splice(colorPairing.length / 2, 1);
			}

			const colorScaleBand = scaleBand()
				.domain(colorPairing)
				.rangeRound([0, barWidth]);

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
				.attr('transform', `translate(${barWidth}, 0)`)
				.classed('final-tick', true)
				.select('text')
				.text(quant[quant.length - 1]);

			legendAxis.enter().append(firstTick.node()).raise();

			legendAxis.select('.domain').remove();
		} else {
			throw Error('Entered color legend type is not supported.');
		}

		// Translate last axis tick if barWidth equals chart width
		if (width <= Configuration.legend.color.barWidth) {
			const legend = svg.select('g.legend-axis');
			const lastTick = legend.select('g.tick:last-of-type text');
			const { width } = DOMUtils.getSVGElementSize(lastTick, {
				useBBox: true,
			});
			lastTick.attr('x', `-${width}`);
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
