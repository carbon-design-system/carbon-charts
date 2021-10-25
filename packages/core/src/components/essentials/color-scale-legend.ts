// Internal Imports
import { Tools } from '../../tools';
import {
	Alignments,
	RenderTypes,
	Roles,
	Events,
	TruncationTypes,
} from '../../interfaces';
import * as Configuration from '../../configuration';

import { Legend } from './legend';
import { DOMUtils } from '../../services';

// D3 imports
import { axisBottom } from 'd3-axis';

export class ColorScaleLegend extends Legend {
	type = 'color-legend';
	renderType = RenderTypes.SVG;

	private gradient_id =
		'gradient-id-' + Math.floor(Math.random() * 99999999999);

	render() {
		// svg and container widths
		const svg = this.getComponentContainer({ withinChartClip: true });
		svg.html('');
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		const options = this.getOptions();
		const legendOptions = Tools.getProperty(options, 'legend');

		const colors = this.model.getPalettes();
		const ticks = this.model.getTicks();
		const linarScale = this.model.getLinearScale().range([0, 250]);
		const stopLength = 100 / colors.length;

		/**
		 * @todo - Add legend orientation support
		 * Need designer feedback?
		 */
		const legendOrientation = Tools.getProperty(
			options,
			'legend',
			'orientation'
		);

		const group = svg
			.append('g')
			/**
			 * @todo - Determine translation value so that initial value isn't trimmed
			 */
			.attr('transform', `translate(18, 0)`);

		// Generate the gradient
		const linearGradient = group
			.append('linearGradient')
			.attr('id', (d) => `${this.gradient_id}-legend`)
			.selectAll('stop')
			.data(colors)
			.enter()
			.append('stop')
			.attr('offset', (d, i) => `${i * stopLength}%`)
			.attr('stop-color', (d) => d);

		const rectangle = group
			.append('rect')
			/**
			 * @todo - determine width & height
			 * x offset (or padding) to prevent the first letter from being clipped
			 */
			.attr('width', '250px')
			.attr('height', '18px')
			.style('fill', `url(#${this.gradient_id}-legend)`);

		const xAxis = axisBottom(linarScale).tickSize(0).tickValues(ticks);

		// Align axes at the bottom of the rectangle and delete the domain line
		group
			.append('g')
			.attr('transform', 'translate(0,18)')
			.call(xAxis)
			.select('.domain')
			.remove();
	}
}
