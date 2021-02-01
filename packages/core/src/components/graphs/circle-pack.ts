// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Events, ColorClassNameTypes } from '../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
import { hierarchy as d3Hierarchy, pack as D3Pack } from 'd3-hierarchy';
import { sum } from 'd3-array';
import { hsl, color } from 'd3-color';
import { select } from 'd3-selection';

// Carbon colors
import { colors } from '@carbon/colors';
import { group } from 'd3';

let uidCounter = 0;
export class CirclePack extends Component {
	type = 'bubble-pack';

	init() {
		const { events } = this.services;
	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		});

		if (width === 0 || height === 0) {
			// on first render the svg is width and height 0
			// the circle packing layout functionality will not run
			return;
		}

		const displayData = this.model.getDisplayData();
		const options = this.getOptions();

		const root = d3Hierarchy({
			name: options.title || 'Circle Pack',
			children: displayData,
		})
			.sum((d: any) => d.value)
			.sort((a, b) => b.value - a.value);

		const packLayout = D3Pack().size([width, height]).padding(20);

		const nodeData = packLayout(root).descendants().splice(1);

		const leafGroups = svg.selectAll("g[data-name='leaf']").data(nodeData);

		// Remove leaf groups that need to be removed
		leafGroups.exit().attr('opacity', 0).remove();

		// Add the leaf groups that need to be introduced
		const enteringLeafGroups = leafGroups
			.enter()
			.append('g')
			.attr('data-name', 'leaf')
			.attr('data-uid', () => uidCounter++);

		const allLeafGroups = enteringLeafGroups.merge(leafGroups);

		// enter the circles
		const circles = allLeafGroups.selectAll('circle.leaf').data(nodeData);

		circles.exit().attr('width', 0).attr('height', 0).remove();

		const enteringCircles = circles
			.enter()
			.append('circle')
			.classed('leaf', true);

		enteringCircles
			.merge(circles)
			.attr('id', function () {
				const uid = select(this.parentNode).attr('data-uid');
				return `${options.style.prefix}-leaf-${uid}`;
			})
			.attr('class', (d) => {
				while (d.depth > 1) d = d.parent;

				return this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d.data.name,
					originalClassName: 'leaf',
				});
			})
			// .transition(
			// 	this.services.transitions.getTransition(
			// 		'circlepack-leaf-update-enter',
			// 		animate
			// 	)
			// )
			.attr('r', (d) => d.r)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	addEventListeners() {
		const self = this;
	}
}
