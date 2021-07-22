// Internal Imports
import { Component } from '../component';
import {
	Roles,
	Events,
	ColorClassNameTypes,
	RenderTypes,
} from '../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
import { select, Selection } from 'd3-selection';

export class Scatter extends Component {
	type = 'scatter';
	renderType = RenderTypes.SVG;

	scatterData: any;

	init() {
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

		const { fadeInOnChartHolderMouseover } = this.configs;
		if (fadeInOnChartHolderMouseover) {
			// Fade-in scatter circles
			events.addEventListener(
				Events.Chart.MOUSEOVER,
				this.handleChartHolderOnHover
			);
			// Fade-out scatter circles
			events.addEventListener(
				Events.Chart.MOUSEOUT,
				this.handleChartHolderOnMouseOut
			);
		}
	}

	filterBasedOnZoomDomain(data) {
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(
			data
		);
		const zoomDomain = this.model.get('zoomDomain');
		if (zoomDomain !== undefined) {
			return data.filter(
				(d) =>
					d[domainIdentifier].getTime() >= zoomDomain[0].getTime() &&
					d[domainIdentifier].getTime() <= zoomDomain[1].getTime()
			);
		}
		return data;
	}

	getScatterData() {
		const options = this.getOptions();

		const { stacked } = this.configs;

		let scatterData;
		if (stacked) {
			const percentage = Object.keys(options.axes).some(
				(axis) => options.axes[axis].percentage
			);
			scatterData = this.model.getStackedData({
				groups: this.configs.groups,
				percentage,
			});
		} else {
			scatterData = this.model
				.getDisplayData(this.configs.groups)
				.filter((d) => {
					const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
						d
					);
					return (
						d[rangeIdentifier] !== undefined &&
						d[rangeIdentifier] !== null
					);
				});
		}

		// filter out datapoints that aren't part of the zoomed domain
		return this.filterBasedOnZoomDomain(scatterData);
	}

	render(animate: boolean) {
		const isScatterEnabled =
			Tools.getProperty(this.getOptions(), 'points', 'enabled') ||
			Tools.getProperty(this.getOptions(), 'bubble', 'enabled');

		if (!isScatterEnabled) {
			return;
		}

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

		// Update data on dot groups
		const circles = svg
			.selectAll('circle.dot')
			.data(
				this.getScatterData(),
				(datum) => `${datum[groupMapsTo]}-${datum[domainIdentifier]}`
			);

		// Remove circles that need to be removed
		circles.exit().attr('opacity', 0).remove();

		// Add the dot groups that need to be introduced
		const enteringCircles = circles
			.enter()
			.append('circle')
			.classed('dot', true)
			.attr('opacity', 0);

		// Apply styling & position
		const circlesToStyle = enteringCircles.merge(circles);
		this.styleCircles(circlesToStyle, animate);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	// A value is an anomaly if is above all defined domain and range thresholds
	isDatapointThresholdAnomaly(datum: any, index: number) {
		const { handleThresholds } = this.configs;
		if (!handleThresholds) {
			return false;
		}

		const { cartesianScales } = this.services;
		const orientation = cartesianScales.getOrientation();

		// Get highest domain and range thresholds
		const [
			xThreshold,
			yThreshold,
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			this.services.cartesianScales.getHighestDomainThreshold(),
			this.services.cartesianScales.getHighestRangeThreshold(),
			orientation
		);

		const [
			getXValue,
			getYValue,
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			(d, i) => this.services.cartesianScales.getDomainValue(d, i),
			(d, i) => this.services.cartesianScales.getRangeValue(d, i),
			orientation
		);

		// Get datum x and y values
		const xValue = getXValue(datum, index);
		const yValue = getYValue(datum, index);

		// To be an anomaly, the value has to be higher or equal than the threshold value
		// (if are present, both range and domain threshold values)
		if (yThreshold && xThreshold) {
			return (
				yValue <= yThreshold.scaleValue &&
				xValue >= xThreshold.scaleValue
			);
		}

		if (yThreshold) {
			return yValue <= yThreshold.scaleValue;
		}

		if (xThreshold) {
			return xValue >= xThreshold.scaleValue;
		}
	}

	styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.getOptions();
		const { filled, fillOpacity } = options.points;
		const { cartesianScales, transitions } = this.services;

		const { groupMapsTo } = options.data;

		const getDomainValue = (d, i) => cartesianScales.getDomainValue(d, i);
		const getRangeValue = (d, i) => cartesianScales.getRangeValue(d, i);
		const [
			getXValue,
			getYValue,
		] = Tools.flipDomainAndRangeBasedOnOrientation(
			getDomainValue,
			getRangeValue,
			cartesianScales.getOrientation()
		);

		const { fadeInOnChartHolderMouseover } = this.configs;
		selection
			.raise()
			.classed('dot', true)
			.attr('class', (d) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d);
				const isFilled = this.model.getIsFilled(
					d[groupMapsTo],
					d[domainIdentifier],
					d,
					filled
				);
				const classNamesNeeded = isFilled
					? [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE]
					: [ColorClassNameTypes.STROKE];

				return this.model.getColorClassName({
					classNameTypes: classNamesNeeded,
					dataGroupName: d[groupMapsTo],
					originalClassName: 'dot',
				});
			})
			// Set class to highlight the dots that are above all the thresholds, in both directions (vertical and horizontal)
			.classed('threshold-anomaly', (d, i) =>
				this.isDatapointThresholdAnomaly(d, i)
			)
			.classed('filled', (d) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d);
				return this.model.getIsFilled(
					d[groupMapsTo],
					d[domainIdentifier],
					d,
					filled
				);
			})
			.classed('unfilled', (d) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d);
				return !this.model.getIsFilled(
					d[groupMapsTo],
					d[domainIdentifier],
					d,
					filled
				);
			})
			.transition(
				transitions.getTransition('scatter-update-enter', animate)
			)
			.attr('cx', getXValue)
			.attr('cy', getYValue)
			.attr('r', options.points.radius)
			.style('fill', (d) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d);
				if (
					this.model.getIsFilled(
						d[groupMapsTo],
						d[domainIdentifier],
						d,
						filled
					)
				) {
					return this.model.getFillColor(
						d[groupMapsTo],
						d[domainIdentifier],
						d
					);
				}
			})
			.style('stroke', (d) => {
				const domainIdentifier = cartesianScales.getDomainIdentifier(d);
				return this.model.getStrokeColor(
					d[groupMapsTo],
					d[domainIdentifier],
					d
				);
			})
			.attr('fill-opacity', filled ? fillOpacity : 1)
			.attr('opacity', fadeInOnChartHolderMouseover ? 0 : 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'point')
			.attr('aria-label', (d) => {
				const rangeIdentifier = cartesianScales.getRangeIdentifier(d);
				return d[rangeIdentifier];
			});

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleChartHolderOnHover = (event: CustomEvent) => {
		this.parent
			.selectAll('circle.dot')
			.transition(
				this.services.transitions.getTransition(
					'chart-holder-hover-scatter'
				)
			)
			.attr('opacity', 1);
	};

	handleChartHolderOnMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('circle.dot')
			.transition(
				this.services.transitions.getTransition(
					'chart-holder-mouseout-scatter'
				)
			)
			.attr('opacity', 0);
	};

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		const { groupMapsTo } = this.getOptions().data;

		this.parent
			.selectAll('circle.dot')
			.transition(
				this.services.transitions.getTransition('legend-hover-scatter')
			)
			.attr('opacity', (d) =>
				d[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
			);
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll('circle.dot')
			.transition(
				this.services.transitions.getTransition(
					'legend-mouseout-scatter'
				)
			)
			.attr('opacity', 1);
	};

	// This is extended in bubble graphs
	getTooltipAdditionalItems(datum) {
		return null;
	}

	addEventListeners() {
		const self = this;
		const { groupMapsTo } = self.getOptions().data;

		this.parent
			.selectAll('circle')
			.on('mouseover', function (datum) {
				const hoveredElement = select(this);

				hoveredElement
					.classed('hovered', true)
					.attr('class', (d) =>
						self.model.getColorClassName({
							classNameTypes: [ColorClassNameTypes.FILL],
							dataGroupName: d[groupMapsTo],
							originalClassName: hoveredElement.attr('class'),
						})
					)
					.style('fill', (d) => {
						const domainIdentifier = self.services.cartesianScales.getDomainIdentifier(
							d
						);
						return self.model.getFillColor(
							d[groupMapsTo],
							d[domainIdentifier],
							d
						);
					})
					.classed('unfilled', false);

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					data: [datum],
					additionalItems: self.getTooltipAdditionalItems(datum),
				});

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEOVER,
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
					Events.Scatter.SCATTER_MOUSEMOVE,
					{
						element: hoveredElement,
						datum,
					}
				);

				self.services.events.dispatchEvent(Events.Tooltip.MOVE);
			})
			.on('click', function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_CLICK,
					{
						element: select(this),
						datum,
					}
				);
			})
			.on('mouseout', function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed('hovered', false);

				if (!self.configs.filled) {
					const { filled } = self.getOptions().points;
					const domainIdentifier = self.services.cartesianScales.getDomainIdentifier(
						datum
					);
					const isFilled = self.model.getIsFilled(
						datum[groupMapsTo],
						datum[domainIdentifier],
						datum,
						filled
					);
					hoveredElement
						.classed('unfilled', !isFilled)
						.style('fill', (d) => {
							if (isFilled || filled) {
								return self.model.getFillColor(
									d[groupMapsTo],
									d[domainIdentifier],
									d
								);
							}
							return null;
						});
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(
					Events.Scatter.SCATTER_MOUSEOUT,
					{
						element: hoveredElement,
						datum,
					}
				);

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement,
				});
			});
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('circle')
			.on('mousemove', null)
			.on('mouseout', null);

		// Remove legend listeners
		const { events } = this.services;
		events.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		events.removeEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
		events.removeEventListener(
			Events.Chart.MOUSEOVER,
			this.handleChartHolderOnHover
		);
		events.removeEventListener(
			Events.Chart.MOUSEOUT,
			this.handleChartHolderOnMouseOut
		);
	}
}
