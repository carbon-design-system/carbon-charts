// Internal imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';
import * as Configuration from '../../configuration';
import {
	Roles,
	Events,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';

// D3 imports
import { select } from 'd3-selection';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';

export class Alluvial extends Component {
	type = 'alluvial';
	renderType = RenderTypes.SVG;

	graph: any;

	render(animate = true) {
		// svg and container widths
		const svg = this.getComponentContainer({ withinChartClip: true });
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true,
		});

		const options = this.model.getOptions();
		const data = this.model.getData();

		// Set the custom node padding if provided
		let nodePadding = Configuration.alluvial.minNodePadding;
		if (options.nodePadding > Configuration.alluvial.minNodePadding) {
			nodePadding = options.nodePadding;
		}

		const sankey = d3Sankey()
			.nodeId((d) => d.name)
			.nodeWidth(Configuration.alluvial.nodeWidth)
			// Distance nodes are apart from each other
			.nodePadding(nodePadding)
			// size of the chart and its padding
			.extent([
				[2, 30],
				[width - 2, height],
			]);

		// Construct a graph with the provided user data
		this.graph = sankey({
			nodes: options.nodes.map((d) => Object.assign({}, d)),
			links: data.map((d) => Object.assign({}, d)),
		});

		// Determine the category name placement x position
		const nodeCoordinates = {};
		this.graph.nodes.forEach((element) => {
			const point = element.x0;

			// Only 1 category per x-value
			if (element.category) {
				nodeCoordinates[point] = element?.category;
			}
		});

		svg.html('');

		// Add node category text
		const alluvialCategory = svg
			.append('g')
			.classed('header-arrows', true)
			.selectAll('g')
			.data(Object.keys(nodeCoordinates))
			.join('g')
			.attr('transform', (d) => {
				return `translate(${d}, 0)`;
			});

		// Add the category text
		alluvialCategory
			.append('text')
			.attr('id', (d, i) => `category-${i}`)
			.style('font-size', '14px')
			.text((d) => {
				if (nodeCoordinates[d]) {
					return nodeCoordinates[d];
				}
				return '';
			})
			.attr('y', 20)
			.attr('x', (d, i) => {
				const { width } = this.parent
					.select(`text#category-${i}`)
					.node()
					.getBBox();
				// Make the text on the left on the last node group
				let x = 0;
				if (d + x >= width) {
					x = -width + 4;
				}
				return x;
			});

		// Draws the links (Waves)
		svg.append('g')
			.attr('fill', 'none')
			.selectAll('g')
			.data(this.graph.links)
			.join('path')
			.classed('link', true)
			.attr('d', sankeyLinkHorizontal())
			.attr('id', (d) => `line-${d.index}`)
			.attr('class', (d) => {
				return this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: d.source.index,
					originalClassName: 'link',
				});
			})
			.attr('stroke-width', (d) => Math.max(1, d.width))
			.attr('stroke-opacity', Configuration.alluvial.opacity.default)
			.attr(
				'aria-label',
				(d) => `${d.source.name} → ${d.target.name} (${d.value})`
			);

		// Creating the groups
		const node = svg
			.append('g')
			.selectAll('g')
			.data(this.graph.nodes)
			.enter()
			.append('g')
			.attr('id', (d) => `node-${d.index}`)
			.classed('node-group', true)
			.attr('transform', (d) => `translate(${d.x0}, ${d.y0})`);

		// Creating the nodes
		node.append('rect')
			.classed('node', true)
			.attr('height', (d) => d.y1 - d.y0)
			.attr('width', (d) => d.x1 - d.x0)
			.attr('stroke', 'black')
			.attr('fill', 'black');

		// Group to hold the text & rectangle background
		const textNode = node.append('g').classed('node-title', true);

		// Node title - text
		textNode
			.append('text')
			.attr('id', (d) => `node-text-${d.index}`)
			.attr('class', 'node-text')
			.style('font-size', '12px')
			.attr('text-anchor', 'start')
			.attr('fill', 'white')
			// Padding to text
			.attr('x', 4)
			// shift 13 pixels down to fit background container
			.attr('dy', 13)
			.text((d) => {
				return `${d.name} (${d.value})`;
			})
			.attr('aria-label', (d) => {
				return `${d.name} (${d.value})`;
			});

		// Text background
		textNode
			.append('rect')
			.classed('node-text-bg', true)
			.attr('width', (d, i) => {
				const { width } = this.parent
					.select(`text#node-text-${i}`)
					.node()
					.getBBox();
				return width + 8;
			})
			.attr('height', 18)
			.attr('stroke', 'black')
			.attr('stroke-width', 2)
			.lower();

		// Position group based on text width
		textNode.attr('transform', (d, i) => {
			const { width } = this.parent
				.select(`text#node-text-${i}`)
				.node()
				.getBBox();

			// Subtracting 9 since text background is 18 to center
			const y = (d.y1 - d.y0) / 2 - 9;
			// Node width
			let x = d.x1 - d.x0;

			// Display bars on the right instead of left of the node
			if (d.x1 >= width) {
				// 16 = node width (4) + text container padding (8) + distance between node and text container (4)
				x = x - (width + 16);
			} else {
				// Add padding to text containers
				x += 4;
			}

			return `translate(${x}, ${y})`;
		});
	}
}
