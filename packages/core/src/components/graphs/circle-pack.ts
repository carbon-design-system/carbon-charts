// Internal Imports
import { Component } from '../component';
import { DOMUtils, CanvasZoom } from '../../services';
import * as Configuration from '../../configuration';

// D3 Imports
import { hierarchy as d3Hierarchy, pack as D3Pack } from 'd3-hierarchy';
import { select } from 'd3-selection';

import { ColorClassNameTypes, Events } from '../../interfaces/enums';
import { easeCubicInOut } from 'd3';



let uidCounter = 0;
export class CirclePack extends Component {
	type = 'circle-pack';
	hierachyLevel = 1;

	zoomSettings = {
		duration: 1000,
		ease: easeCubicInOut,
		zoomLevel: 3
	}

	init() {
		const { events } = this.services;
	}

	render(animate = true) {
		const svg = this.getContainerSVG({ withinChartClip: true });
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

		const packLayout = D3Pack()
			.size([width, height])
			.padding((d) => {
				// add 3 px to account for the stroke width 1.5px
				return d.depth >= 1
					? Configuration.circlePack.padding.inner + 3
					: Configuration.circlePack.padding.outer + 3;
			});

		const nodeData = packLayout(root)
			.descendants()
			.splice(1)
			// .filter((node) => {
				// filter based on hierarchy level
			// });

		// enter the circles
		const circles = svg.selectAll('circle.node').data(nodeData);

		circles.exit().attr('width', 0).attr('height', 0).remove();

		const enteringCircles = circles
			.enter()
			.append('circle')
			.classed('node', true);

		enteringCircles
			.merge(circles)
			// .attr('id', function () {
			// 	const uid = select(this.parentNode).attr('data-uid');
			// 	return `${options.style.prefix}-leaf-${uid}`;
			// })
			.attr('class', (d) => {
				return this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: d.children ? 'node' : 'node node-leaf' ,
				});
			})
			.attr('fill-opacity', 0.3) // config
			.style('stroke', (d) => {
				if (d.depth === 3) {
					return 'white';
				}
			})
			.transition(
				this.services.transitions.getTransition(
					'circlepack-leaf-update-enter',
					animate
				)
			)
			.attr('r', (d) => d.r)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y);

		// Add event listeners to elements drawn
		this.addEventListeners();
		this.setBackgroundListeners();
	}

	// turn off the highlight class on children circles
	unhighlightChildren(childData) {
		const data = childData.map((d) => {
			return d.data;
		});

		this.parent
			.selectAll('circle.node')
			.filter(
				(d) => data.some((datum) => datum === d.data) && d.depth > 1
			)
			.classed('hovered-child', false);
	}

	// highlight the children circles with a stroke
	highlightChildren(childData) {
		const data = childData.map((d) => {
			return d.data;
		});

		this.parent
			.selectAll('circle.node')
			.filter(
				(d) => data.some((datum) => datum === d.data) && d.depth > 1
			)
			.classed('hovered-child', true);
	}

	removeBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getHolder());
		chartSvg
			.on('click', () => null);
	}

	setBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getHolder());
		const self = this;
		chartSvg
			.on('click', () => self.services.canvasZoom.zoomOut());
	}

	// add event listeners for tooltip on the circles
	addEventListeners() {
		const self = this;
		this.parent
			.selectAll('circle.node')
			.on('mouseover', function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', true);

				// get the children data for the tooltip
				let childrenData = [];
				let parentValue = null;
				if (datum.children) {
					childrenData = datum.children.map((child) => {
						if (child !== null) {
							// sum up the children values if there are any 3rd level
							const value =
								typeof child.data.value === 'number'
									? child.data.value
									: child.data.children.reduce(
										(a, b) => a + b.value,
										0
									);
							return {
								label: child.data.name,
								value: value,
							};
						}
					});
					// children get a highlight stroke
					self.highlightChildren(datum.children);
				} else {
					// if there is no children we want to display the value for the data
					parentValue = datum.value;
				}

				let fillColor = getComputedStyle(this, null).getPropertyValue(
					'fill'
				);

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					items: [
						{
							color: fillColor,
							label: datum.data.name,
							value: parentValue,
						},
						...childrenData,
					],
				});

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.CirclePack.CIRCLE_MOUSEOVER,
					{
						element: hoveredElement,
						datum,
					}
				);
			})
			.on('mousemove', function (datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.CirclePack.CIRCLE_MOUSEMOVE,
					{
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('mouseout', function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', false);

				if (datum.children) {
					self.unhighlightChildren(datum.children);
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.CirclePack.CIRCLE_MOUSEOUT,
					{
						element: hoveredElement,
						datum,
					}
				);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});
			})
			.on('click', function (datum) {
				self.services.canvasZoom.zoomIn(datum, self.parent, self.zoomSettings);
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.CirclePack.CIRCLE_CLICK,
					{
						element: hoveredElement,
						datum,
					}
				);
			});
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('circle.node')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
			.on('click', null);
	}
}
