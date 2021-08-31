// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { RenderTypes, TreeTypes } from '../../interfaces';

// D3 Imports
import { cluster as d3Cluster, tree as d3Tree, hierarchy } from 'd3-hierarchy';
import { linkHorizontal } from 'd3-shape';

import { get } from 'lodash-es';

export class Tree extends Component {
	type = 'tree';
	renderType = RenderTypes.SVG;

	init() {
		// 	const eventsFragment = this.services.events;
		// 	// Highlight correct circle on legend item hovers
		// 	eventsFragment.addEventListener(
		// 		Events.Legend.ITEM_HOVER,
		// 		this.handleLegendOnHover
		// 	);
		// 	// Un-highlight circles on legend item mouseouts
		// 	eventsFragment.addEventListener(
		// 		Events.Legend.ITEM_MOUSEOUT,
		// 		this.handleLegendMouseOut
		// 	);
	}

	render(animate = true) {
		const svg = this.getComponentContainer();
		svg.html('');

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		});

		const options = this.model.getOptions();
		const displayData = this.model.getDisplayData();

		const margin = { top: 0, right: 0, bottom: 0, left: 30 };
		const root = hierarchy({
			name: 'flare',
			children: displayData,
		}) as any;

		const dx = 10;
		const dy = width / 6;

		const update = (source) => {
			const nodes = root.descendants().reverse();
			const links = root.links();

			let left = root;
			let right = root;
			root.eachBefore((node) => {
				if (node.x < left.x) left = node;
				if (node.x > right.x) right = node;
			});

			const height = right.x - left.x;

			const transition = svg
				.transition()
				.call((t) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'tree-update-viewbox',
						animate: true,
					})
				)
				.attr('viewBox', [-margin.left, left.x, width, height]);

			// Update data on nodes
			const nodeGroups = nodeGroup
				.selectAll('g')
				.data(nodes, (d) => d.id);

			// Add any entering nodes
			const nodeGroupsEnter = nodeGroups
				.enter()
				.append('g')
				.attr('transform', () => `translate(${source.y0},${source.x0})`)
				.attr('class', (d) =>
					d.children && d.children.length > 0 ? 'clickable' : null
				)
				.on('click', (event, d) => {
					d.children = d.children ? null : d._children;

					update(d);
				});

			// Add node circles to entering nodes
			nodeGroupsEnter
				.append('circle')
				.attr('r', 2.5)
				.attr('class', (d) => (d._children ? 'parent' : 'child'))
				.attr('stroke-width', 10);

			// Add node labels
			nodeGroupsEnter
				.append('text')
				.attr('dy', '0.31em')
				.attr('x', (d) => (d._children ? -6 : 6))
				.attr('text-anchor', (d) => (d._children ? 'end' : 'start'))
				.text((d) => d.data.name)
				.clone(true)
				.attr('class', 'text-stroke')
				.lower();

			// Reposition nodes
			nodeGroups
				.merge(nodeGroupsEnter)
				.transition(transition)
				.attr('transform', (d) => `translate(${d.y},${d.x})`)
				.attr('fill-opacity', 1)
				.attr('stroke-opacity', 1);

			// Remove exiting nodes
			nodeGroups
				.exit()
				.transition(transition)
				.remove()
				.attr('transform', () => `translate(${source.y},${source.x})`)
				.attr('fill-opacity', 0)
				.attr('stroke-opacity', 0);

			// Update data on links
			const linkPaths = linkGroup
				.selectAll('path')
				.data(links, (d) => d.target.id);

			// Add any entering link paths
			const linkPathsEnter = linkPaths
				.enter()
				.append('path')
				.attr('d', (d) => {
					const o = { x: source.x0, y: source.y0 };
					return diagonal({ source: o, target: o });
				});

			// Reposition updating link paths
			linkPaths
				.merge(linkPathsEnter)
				.transition(transition)
				.attr('d', diagonal);

			// Remove any exiting link paths
			linkPaths
				.exit()
				.transition(transition)
				.remove()
				.attr('d', () => {
					const o = { x: source.x, y: source.y };
					return diagonal({ source: o, target: o });
				});

			// Update position data for nodes
			root.eachBefore((d) => {
				d.x0 = d.x;
				d.y0 = d.y;
			});
		};

		const tree =
			get(options, 'treeType') === TreeTypes.DENDROGRAM
				? d3Cluster().size([height, width - 155])
				: d3Tree()
						.nodeSize([dx, dy])
						.size([height, width - 155]);

		const diagonal = linkHorizontal()
			.x((d: any) => d.y)
			.y((d: any) => d.x) as any;

		root.x0 = dy / 2;
		root.y0 = 0;
		root.descendants().forEach((d, i) => {
			d.id = i;
			d._children = d.children;
		});

		tree(root);

		svg.attr('viewBox', [-margin.left, -margin.top, width, dx]).style(
			'user-select',
			'none'
		);

		const linkGroup = svg.append('g').attr('class', 'links');

		const nodeGroup = svg.append('g');

		update(root);
	}

	// // Highlight elements that match the hovered legend item
	// handleLegendOnHover = (event: CustomEvent) => {
	// 	const { hoveredElement } = event.detail;
	// 	const { groupMapsTo } = this.getOptions().data;

	// 	this.parent
	// 		.selectAll('path.slice')
	// 		.transition(
	// 			this.services.transitions.getTransition('legend-hover-bar')
	// 		)
	// 		.attr('opacity', (d) =>
	// 			d.data[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
	// 		);
	// };

	// // Un-highlight all elements
	// handleLegendMouseOut = (event: CustomEvent) => {
	// 	this.parent
	// 		.selectAll('path.slice')
	// 		.transition(
	// 			this.services.transitions.getTransition('legend-mouseout-bar')
	// 		)
	// 		.attr('opacity', 1);
	// };

	// addEventListeners() {
	// 	const self = this;
	// 	this.parent
	// 		.selectAll('path.slice')
	// 		.on('mouseover', function (event, datum) {
	// 			const hoveredElement = select(this);

	// 			hoveredElement
	// 				.classed('hovered', true)
	// 				.transition(
	// 					self.services.transitions.getTransition(
	// 						'pie_slice_mouseover'
	// 					)
	// 				)
	// 				.attr('d', self.hoverArc);

	// 			// Dispatch mouse event
	// 			self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOVER, {
	// 				event,
	// 				element: select(this),
	// 				datum,
	// 			});

	// 			const { groupMapsTo } = self.getOptions().data;
	// 			// Show tooltip
	// 			self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
	// 				event,
	// 				hoveredElement,
	// 				items: [
	// 					{
	// 						label: datum.data[groupMapsTo],
	// 						value: datum.data.value,
	// 					},
	// 				],
	// 			});
	// 		})
	// 		.on('mousemove', function (event, datum) {
	// 			const hoveredElement = select(this);

	// 			// Dispatch mouse event
	// 			self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEMOVE, {
	// 				event,
	// 				element: hoveredElement,
	// 				datum,
	// 			});

	// 			// Show tooltip
	// 			self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
	// 				event,
	// 			});
	// 		})
	// 		.on('click', function (event, datum) {
	// 			// Dispatch mouse event
	// 			self.services.events.dispatchEvent(Events.Pie.SLICE_CLICK, {
	// 				event,
	// 				element: select(this),
	// 				datum,
	// 			});
	// 		})
	// 		.on('mouseout', function (event, datum) {
	// 			const hoveredElement = select(this);
	// 			hoveredElement
	// 				.classed('hovered', false)
	// 				.transition(
	// 					self.services.transitions.getTransition(
	// 						'pie_slice_mouseover'
	// 					)
	// 				)
	// 				.attr('d', self.arc);

	// 			// Dispatch mouse event
	// 			self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOUT, {
	// 				event,
	// 				element: hoveredElement,
	// 				datum,
	// 			});

	// 			// Hide tooltip
	// 			self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
	// 				hoveredElement,
	// 			});
	// 		});
	// }
}
