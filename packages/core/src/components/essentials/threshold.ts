import { Component } from '../component';
import * as Tools from '../../tools';
import { DOMUtils } from '../../services';
import { ChartModel } from '../../model/model';
import {
	AxisPositions,
	Events,
	RenderTypes,
	ScaleTypes,
} from '../../interfaces';

// D3 Imports
// @ts-ignore
// ts-ignore is needed because `@types/d3`
// is missing the `pointer` function
import { select, pointer } from 'd3-selection';

// Carbon position service
import Position, { PLACEMENTS } from '@carbon/utils-position';

// import the settings for the css prefix
import { carbonPrefix } from '../../configuration-non-customizable';
import {
	formatTick,
	computeTimeIntervalName,
} from '../../services/time-series';

export class Threshold extends Component {
	type = 'threshold';
	renderType = RenderTypes.SVG;

	label: any;

	positionService = new Position();

	constructor(model: ChartModel, services: any) {
		super(model, services);
	}

	render(animate = false) {
		const axesOptions = Tools.getProperty(this.getOptions(), 'axes');

		const thresholdData = [];

		Object.keys(axesOptions).forEach((axisPosition) => {
			if (Object.values(AxisPositions).includes(axisPosition as any)) {
				const axisOptions = axesOptions[axisPosition];

				if (
					axisOptions.thresholds &&
					axisOptions.thresholds.length > 0
				) {
					thresholdData.push({
						axisPosition,
						thresholds: axisOptions.thresholds,
						correspondingDatasets:
							axisOptions?.correspondingDatasets,
						mapsTo: axisOptions?.mapsTo,
					});
				}
			}
		});

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		// Update data on all axis threshold groups
		const thresholdAxisGroups = svg
			.selectAll('g.axis-thresholds')
			.data(thresholdData, (thresholdData) => thresholdData.axisPosition);

		// Remove axis threshold groups that are no longer needed
		thresholdAxisGroups.exit().attr('opacity', 0).remove();

		// Add the axis threshold groups that need to be introduced
		const thresholdAxisGroupsEnter = thresholdAxisGroups
			.enter()
			.append('g');

		const thresholdAxisGroupsMerge = thresholdAxisGroupsEnter.merge(
			thresholdAxisGroups
		);
		thresholdAxisGroupsMerge.attr(
			'class',
			(d) => `axis-thresholds ${d.axisPosition}`
		);

		const thresholdGroups = thresholdAxisGroupsMerge
			.selectAll('g.threshold-group')
			.data((d) =>
				d.thresholds.map((threshold) => {
					// Merge relevant keys into the threshold object
					threshold.axisPosition = d.axisPosition;
					threshold.datum = this.constructDatumObj(d, threshold);
					return threshold;
				})
			);

		// Remove threshold groups that are no longer needed
		thresholdGroups.exit().attr('opacity', 0).remove();

		// Add the threshold groups that need to be introduced
		const thresholdGroupsEnter = thresholdGroups.enter().append('g');

		thresholdGroupsEnter.append('line').attr('class', 'threshold-line');
		thresholdGroupsEnter
			.append('rect')
			.attr('class', 'threshold-hoverable-area');

		const thresholdGroupsMerge = thresholdGroupsEnter.merge(
			thresholdGroups
		);
		thresholdGroupsMerge.attr('class', 'threshold-group');

		const self = this;
		thresholdAxisGroupsMerge.each(function ({ axisPosition }) {
			const scale = self.services.cartesianScales.getScaleByPosition(
				axisPosition
			);
			const scaleType = self.services.cartesianScales.getScaleTypeByPosition(
				axisPosition
			);

			let xScale = null;
			let yScale = null;

			// Depending on type of axis position, assign scale and main perpendicular axis
			if (
				axisPosition === AxisPositions.LEFT ||
				axisPosition === AxisPositions.RIGHT
			) {
				yScale = scale;
				xScale = self.services.cartesianScales.getMainXScale();
			} else {
				xScale = scale;
				yScale = self.services.cartesianScales.getMainYScale();
			}

			const isScaleTypeLabels = scaleType === ScaleTypes.LABELS;
			const [xScaleStart, xScaleEnd] = xScale.range();
			const [yScaleEnd, yScaleStart] = yScale.range();

			const { cartesianScales } = self.services;
			const orientation = cartesianScales.getOrientation();
			const getDomainValue = (d) => cartesianScales.getDomainValue(d);
			const getRangeValue = (d) => cartesianScales.getRangeValue(d);
			const [
				getXValue,
				getYValue,
			] = Tools.flipDomainAndRangeBasedOnOrientation(
				getDomainValue,
				getRangeValue,
				orientation
			);

			const group = select(this);
			if (
				axisPosition === AxisPositions.TOP ||
				axisPosition === AxisPositions.BOTTOM
			) {
				group
					.selectAll('line.threshold-line')
					.transition()
					.call((t) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'threshold-line-update',
							animate,
						})
					)
					.attr('y1', yScaleStart)
					.attr('y2', yScaleEnd)
					.attr(
						'x1',
						({ datum }) =>
							getXValue(datum) +
							(isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.attr(
						'x2',
						({ datum }) =>
							getXValue(datum) +
							(isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.style('stroke', ({ fillColor }) => fillColor);

				// Set hoverable area width and rotate it
				group
					.selectAll('rect.threshold-hoverable-area')
					.attr('x', 0)
					.attr('y', ({ datum }) => -getXValue(datum))
					.attr('width', Math.abs(yScaleEnd - yScaleStart))
					.classed('rotate', true);
			} else {
				group
					.selectAll('line.threshold-line')
					.transition()
					.call((t) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'threshold-line-update',
							animate,
						})
					)
					.attr('x1', xScaleStart)
					.attr('x2', xScaleEnd)
					.attr(
						'y1',
						({ datum }) =>
							getYValue(datum) +
							(isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.attr(
						'y2',
						({ datum }) =>
							getYValue(datum) +
							(isScaleTypeLabels ? scale.step() / 2 : 0)
					)
					.style('stroke', ({ fillColor }) => fillColor);

				// Set hoverable area width
				group
					.selectAll('rect.threshold-hoverable-area')
					.attr('x', xScaleStart)
					.attr('y', ({ datum }) => getYValue(datum))
					.attr('width', Math.abs(xScaleEnd - xScaleStart))
					.classed('rotate', false);
			}
		});

		// Add event listener for showing the threshold tooltip
		this.services.events.addEventListener(Events.Threshold.SHOW, (e) => {
			this.setThresholdLabelPosition(e.detail);

			this.label.classed('hidden', false);
		});

		// Add event listener for hiding the threshold tooltip
		this.services.events.addEventListener(Events.Threshold.HIDE, (e) => {
			this.label.classed('hidden', true);
		});

		this.appendThresholdLabel();

		this.addEventListeners();
	}

	getFormattedValue(datum) {
		const { value, axisPosition } = datum;
		const options = this.getOptions();
		const scaleType = this.services.cartesianScales.getScaleTypeByPosition(
			axisPosition
		);

		// If scale is time, format the threshold date as the ticks format
		if (scaleType === ScaleTypes.TIME) {
			const isVertical = [
				AxisPositions.LEFT,
				AxisPositions.RIGHT,
			].includes(axisPosition);
			const mainXScale = this.services.cartesianScales.getMainXScale();
			const mainYScale = this.services.cartesianScales.getMainYScale();
			const scale = isVertical ? mainYScale : mainXScale;

			const timeScaleOptions = Tools.getProperty(options, 'timeScale');
			const timeInterval = computeTimeIntervalName(scale.ticks());
			return formatTick(
				value,
				0,
				scale.ticks(),
				timeInterval,
				timeScaleOptions
			);
		}

		return value.toLocaleString('en');
	}

	appendThresholdLabel() {
		const holder = select(this.services.domUtils.getHolder());

		const chartprefix = Tools.getProperty(
			this.getOptions(),
			'style',
			'prefix'
		);

		this.label = DOMUtils.appendOrSelect(
			holder,
			`div.${carbonPrefix}--${chartprefix}--threshold--label`
		).classed('hidden', true);
	}

	setThresholdLabelPosition({ event, datum }) {
		const holder = this.services.domUtils.getHolder();
		const mouseRelativePos = pointer(event, holder);

		// Format the threshold value using valueFormatter if defined in user-provided options
		const formattedValue = datum.valueFormatter
			? datum.valueFormatter(datum.value)
			: this.getFormattedValue(datum);

		this.label
			.html(`${datum.label || 'Threshold'}: ${formattedValue}`)
			.style('background-color', datum.fillColor);

		const target = this.label.node();
		// Find out whether threshold label should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1],
			},
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT,
				PLACEMENTS.TOP,
				PLACEMENTS.BOTTOM,
			],
			() => ({
				width: holder.offsetWidth,
				height: holder.offsetHeight,
			})
		);

		// Get coordinates to where label should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1],
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}

	// Constructs object to pass in scale functions
	constructDatumObj(d, element) {
		const datum = {};

		// We only need to specify group only if correpsonding dataset is defined
		if (d.correspondingDatasets) {
			datum['group'] = Tools.getProperty(d, 'correspondingDatasets', 0);
		}

		// Add attribute with the mapsTo value as key
		datum[d['mapsTo']] = element.value;

		return datum;
	}

	addEventListeners() {
		const self = this;

		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		// Add events to the threshold hoverable area
		svg.selectAll('rect.threshold-hoverable-area')
			.on('mouseover mousemove', function (event) {
				select(this.parentNode)
					.select('line.threshold-line')
					.classed('active', true);

				self.services.events.dispatchEvent(Events.Threshold.SHOW, {
					event,
					hoveredElement: select(this),
					datum: select(this).datum(),
				});
			})
			.on('mouseout', function (event) {
				select(this.parentNode)
					.select('line.threshold-line')
					.classed('active', false);

				self.services.events.dispatchEvent(Events.Threshold.HIDE, {
					event,
					hoveredElement: select(this),
					datum: select(this).datum(),
				});
			});
	}
}
