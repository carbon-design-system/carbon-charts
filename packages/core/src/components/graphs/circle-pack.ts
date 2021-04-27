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
		// svg and container widths
		const svg = this.getContainerSVG({ withinChartClip: true });
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		});

		if (width === 0 || height === 0) {
			// on first render the svg is width and height 0
			// the circle packing layout functionality will not run
			return;
		}

		// data and options (zoom/not zoom)
		let displayData = this.model.getDisplayData();
		const monochromatic = this.model.isMonochrome();
		const hierarchyLevel = this.model.getHierarchyLevel();
		const options = this.getOptions();
		const canvasZoomEnabled = Tools.getProperty(
			options,
			'canvasZoom',
			'enabled'
		);

		// check if there is one root for the data
		// that root will be the only datagroup (colorscale will be monochrome)
		if (monochromatic) {
			// remove want to remove the parent from being rendered
			displayData = displayData[0].children;
		}

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
				const originalClass =
					canvasZoomEnabled && hierarchyLevel === 3
						? this.getZoomClass(d)
						: '';
				// the root(s) of the determine the color
				let dataGroup = d;
				while (dataGroup.depth > 1) {
					dataGroup = dataGroup.parent;
				}
				return this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE,
					],
					dataGroupName: dataGroup.data.name,
					originalClassName: d.children
						? `node ${originalClass}`
						: `node node-leaf ${originalClass}`,
				});
			})
			.attr('r', (d) => d.r)
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)
			.transition(
				this.services.transitions.getTransition(
					'circlepack-leaf-update-enter',
					animate
				)
			)
			.attr('fill-opacity', Configuration.circlePack.circles.fillOpacity);

		if (canvasZoomEnabled === true && this.focal) {
			this.services.canvasZoom.zoomIn(
				this.focal,
				enteringCircles,
				Configuration.canvasZoomSettings
			);
			this.setBackgroundListeners();
		}

		if (!monochromatic) {
			// add legend filtering if it isnt a monochrome chart
			this.addLegendListeners();
		}

		// Add event listeners to elements drawn
		this.addEventListeners();
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

	getZoomClass(node) {
		if (this.model.getHierarchyLevel() === 3 && this.focal) {
			if (
				node.data === this.focal.data ||
				this.focal.children.some((d) => d.data === node.data)
			) {
				return 'focal';
			}
		}
		return 'zoomed-in';
	}

	addLegendListeners() {
		const { events } = this.services;
		// Highlight correct circle on legend item hovers
		events.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		// Un-highlight circles on legend item mouseouts
		events.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
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

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent
			.selectAll('circle.node')
			.transition(
				this.services.transitions.getTransition(
					'legend-hover-circlepack'
				)
			)
			.attr('opacity', (d) => {
				let dataGroup = d;
				while (dataGroup.depth > 1) {
					dataGroup = dataGroup.parent;
				}
				return dataGroup.data.name === hoveredElement.datum()['name']
					? 1
					: Configuration.circlePack.circles.fillOpacity;
			});
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('circle.node')
			.transition(
				this.services.transitions.getTransition(
					'legend-mouseout-circlepack'
				)
			)
			.attr('opacity', 1);
	};

	getZoomIcon() {
		return `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13">
			<polygon points="7.7 4.82 5.78 4.82 5.78 2.89 4.82 2.89 4.82 4.82 2.89 4.82 2.89 5.78 4.82 5.78 4.82 7.7 5.78 7.7 5.78 5.78 7.7 5.78 7.7 4.82"/>
			<path d="M9.36,8.67A5.22,5.22,0,0,0,10.59,5.3,5.3,5.3,0,1,0,5.3,10.59,5.22,5.22,0,0,0,8.67,9.36L12.32,13l.68-.68Zm-4.06,1A4.34,4.34,0,1,1,9.63,5.3,4.33,4.33,0,0,1,5.3,9.63Z"/>
		</svg>`;
	}

	// add event listeners for tooltip on the circles
	addEventListeners() {
		const self = this;
		this.parent
			.selectAll('circle.node')
			.on('mouseover', function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', true);

				const disabled = hoveredElement
					.node()
					.classList.contains('zoomed-in');

				const canvasZoomEnabled = Tools.getProperty(
					self.model.getOptions(),
					'canvasZoom',
					'enabled'
				);

				if (!disabled) {
					// get the children data for the tooltip
					let childrenData = [];
					let parentValue = null;
					if (datum.children) {
						childrenData = datum.children.map((child) => {
							if (child !== null) {
								// sum up the children values if there are any 3rd level
								let value;
								if (typeof child.data.value === 'number') {
									value = child.data.value;

									return {
										label: child.data.name,
										value: value,
									};
								} else {
									value = child.data.children.reduce(
										(a, b) => a + b.value,
										0
									);

									return {
										label: child.data.name,
										labelIcon: canvasZoomEnabled
											? self.getZoomIcon()
											: null,
										value: value,
									};
								}
							}
						});
						// children get a highlight stroke
						self.highlightChildren(datum.children);
					} else {
						// if there is no children we want to display the value for the data
						parentValue = datum.value;
					}

					let fillColor = getComputedStyle(
						this,
						null
					).getPropertyValue('fill');

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
				}

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
				const hoveredElement = select(this);
				const disabled = hoveredElement
					.node()
					.classList.contains('zoomed-in');
				// zoom if chart has zoom enabled and if its a depth 2 circle that has children
				if (
					Tools.getProperty(
						self.getOptions(),
						'canvasZoom',
						'enabled'
					) === true &&
					datum.depth === 2 &&
					datum.children &&
					!disabled
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

		// remove the listeners on the legend
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}
}
