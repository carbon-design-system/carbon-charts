// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import * as Configuration from '../../configuration';

// D3 Imports
import { hierarchy as d3Hierarchy, pack as D3Pack } from 'd3-hierarchy';
import { event, select } from 'd3-selection';

import { ColorClassNameTypes, Events } from '../../interfaces/enums';
import { Tools } from './../../tools';

export class CirclePack extends Component {
	type = 'circle-pack';
	focal;

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
		const hierarchyLevel = this.model.getHierarchyLevel();

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
			.filter((node) => {
				//filter based on hierarchy level
				return node.depth <= hierarchyLevel;
			});

		// enter the circles
		const circles = svg.selectAll('circle.node').data(nodeData);

		circles.exit().attr('width', 0).attr('height', 0).remove();

		const enteringCircles = circles
			.enter()
			.append('circle')
			.classed('node', true);

		enteringCircles
			.merge(circles)
			.attr('class', (d) => {
				const originalClass = hierarchyLevel === 3 ? this.getZoomClasses(d) : '';
				return this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					originalClassName: d.children ? `node ${originalClass}` : `node node-leaf ${originalClass}`,
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

		if (
			Tools.getProperty(this.getOptions(), 'canvasZoom', 'enabled') ===
			true &&
			this.focal
		) {
			this.services.canvasZoom.zoomIn(
				this.focal,
				enteringCircles,
				Configuration.canvasZoomSettings
			);

			// in zoomed in mode, we just want the focal and it's children to be in color (everything else in grayscale)
			// this.highlightSubtree(this.focal);
			console.log("here1");
		}

		// Add event listeners to elements drawn
		this.addEventListeners();
		this.setBackgroundListeners();
	}

	// turn off the highlight class on children circles
	unhighlightChildren(childData) {
		const data = childData.map((d) => d.data);

		this.parent
			.selectAll('circle.node')
			.filter(
				(d) => data.some((datum) => datum === d.data) && d.depth > 1
			)
			.classed('hovered-child', false);
	}

	// highlight the children circles with a stroke
	highlightChildren(childData, classname?) {
		const data = childData.map((d) => d.data);

		this.parent
			.selectAll('circle.node')
			.filter(
				(d) => data.some((datum) => datum === d.data) && d.depth > 1
			)
			.classed(classname ? classname : 'hovered-child', true);
	}

	getZoomClasses(node){
		if(Tools.getProperty(this.getOptions(), 'canvasZoom', 'enabled') ===
		true &&
		this.focal) {
			if(node.data === this.focal.data){
				return 'focal'
			}
		}
		return 'zoomed-in';
	}

	removeBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getHolder());
		chartSvg.on('click', () => null);
	}

	setBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getHolder());
		const self = this;
		const canvasSelection = this.parent.selectAll('circle.node');

		chartSvg.on('click', () => {
			self.focal = null;
			self.model.updateHierarchyLevel(2);
			self.services.canvasZoom.zoomOut(
				canvasSelection,
				Configuration.canvasZoomSettings
			);
		});
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
				// zoom if chart has zoom enabled AND if its a level 2 that has children
				if (
					Tools.getProperty(
						self.getOptions(),
						'canvasZoom',
						'enabled'
					) === true &&
					datum.depth === 2 &&
					datum.children
				) {
					const canvasSelection = self.parent.selectAll(
						'circle.node'
					);

					self.focal = datum;
					self.model.updateHierarchyLevel(3);
					self.services.canvasZoom.zoomIn(
						datum,
						canvasSelection,
						Configuration.canvasZoomSettings
					);
					// don't want the click event to propagate to the background zoom out
					// does not clash with the tooltip/other events because it does need to close the
					// tooltip on the click event in order to zoom in/out
					event.stopPropagation();
				}
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
