import { Component } from '../component';
import { Tools } from '../../tools';
import { ChartModel } from '../../model';
import { AxisPositions} from '../../interfaces';
import { select } from 'd3-selection';
import * as Configuration from '../../configuration'


export class Highlight extends Component {
	type = 'highlight';

	label: any;

	constructor(model: ChartModel, services: any) {
		super(model, services);
	}

	render(animate = false) {
		const axesOptions = Tools.getProperty(this.getOptions(), 'axes');

		const highlightData = [];
		Object.keys(axesOptions).forEach((axisPosition) => {
			if (Object.values(AxisPositions).includes(axisPosition as any)) {
				const axisOptions = axesOptions[axisPosition];

				if (
					axisOptions.highlights?.data &&
					axisOptions.highlights.data.length > 0
				) {
					highlightData.push({
						axisPosition,
                        highlightStartMapsTo: axisOptions.highlights.highlightStartMapsTo,
                        highlightEndMapsTo: axisOptions.highlights.highlightEndMapsTo,
                        labelMapsTo: axisOptions.highlights.labelMapsTo,
						highlight: axisOptions.highlights.data,
                        color: axisOptions.highlights.color
					});
				}
			}
		});

		// Grab container SVG
		const svg = this.getContainerSVG({ withinChartClip: true });

		// Update data on all axis highlight groups
		const highlightAxisGroups = svg
			.selectAll('g.axis-highlight')
			.data(highlightData, (highlightData) => highlightData.axisPosition);

		// Remove axis highlight groups that are no longer needed
		highlightAxisGroups.exit().attr('opacity', 0).remove();

		// Add the axis highlight groups that need to be introduced
		const highlightAxisGroupsEnter = highlightAxisGroups
			.enter()
			.append('g');

		const highlightAxisGroupsMerge = highlightAxisGroupsEnter.merge(
			highlightAxisGroups
		);
		highlightAxisGroupsMerge.attr(
			'class',
			(d) => `axis-highlight ${d.axisPosition}`
		);

		const highlightGroups = highlightAxisGroupsMerge
			.selectAll('g.highlight-group')
			.data((d) =>
				d.highlight.map((highlight) => {
					highlight.axisPosition = d.axisPosition;
                    highlight.highlightStartMapsTo = d.highlightStartMapsTo
                    highlight.labelMapsTo = d.labelMapsTo
                    highlight.color = d.color
                    highlight.highlightEndMapsTo = d.highlightEndMapsTo
					return highlight;
				})
			);

		// Remove highlight groups that are no longer needed
		highlightGroups.exit().attr('opacity', 0).remove();

		// Add the highlight groups that need to be introduced
		const highlightGroupsEnter = highlightGroups.enter().append('g');

		highlightGroupsEnter.append('rect').attr('class', 'highlight-bar');
        highlightGroupsEnter.append('line').attr('class', 'highlight-line');

		const highlightGroupsMerge = highlightGroupsEnter.merge(
			highlightGroups
		);
		highlightGroupsMerge.attr('class', 'highlight-group');

		const self = this;
		highlightAxisGroupsMerge.each(function ({ axisPosition }) {
			const mainXScale = self.services.cartesianScales.getMainXScale();
			const mainYScale = self.services.cartesianScales.getMainYScale();
			const [xScaleStart, xScaleEnd] = mainXScale.range();
			const [yScaleEnd, yScaleStart] = mainYScale.range();

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
					.selectAll('rect.highlight-bar')
					.transition(
						self.services.transitions.getTransition(
							'highlight-bar-update',
							animate
						)
					)
					.attr('y', yScaleStart)
					.attr('height', yScaleEnd)
					.attr(
						'x',
                        ({highlightStartMapsTo, ...d}) => getXValue(d[highlightStartMapsTo])
					)
					.attr(
						'width',
						({highlightStartMapsTo, highlightEndMapsTo,...d}) =>
							Math.max(getXValue(d[highlightEndMapsTo]) - getXValue(d[highlightStartMapsTo]), 0) 
					)
					.style('fill', ({color, labelMapsTo, ...data}) => {
                        return color.scale[data[labelMapsTo]]
                    })
                    .style('fill-opacity', Configuration.area.opacity.selected / 2);

                    // Add highlight line
                    group
					.selectAll('line.highlight-line')
					.transition(
						self.services.transitions.getTransition(
							'highlight-line-update',
							animate
						)
					)
					.attr('y', axisPosition === AxisPositions.TOP? yScaleEnd : yScaleStart)
					.attr(
						'x2', ({highlightStartMapsTo, ...d}) => getXValue(d[highlightStartMapsTo])
					)
					.attr(
						'x1',
						({highlightEndMapsTo, ...d}) =>
                        getXValue(d[highlightEndMapsTo]) 
					)
					.style('stroke', ({color, labelMapsTo, ...data}) => {
                        return color.scale[data[labelMapsTo]]
                    })
         
			} else {
				group
					.selectAll('rect.highlight-bar')
					.transition(
						self.services.transitions.getTransition(
							'highlight-line-update',
							animate
						)
					)
					.attr('x', xScaleStart)
					.attr('width', Math.max(xScaleEnd - xScaleStart, 0))
					.attr(
						'y',
						({highlightEndMapsTo, ...d}) => getYValue(d[highlightEndMapsTo])
					)
					.attr(
						'height',
						({highlightStartMapsTo, highlightEndMapsTo, ...d}) =>
							Math.max(getYValue(d[highlightStartMapsTo]) - getYValue(d[highlightEndMapsTo]), 0)
					)
					.style('fill', ({color, labelMapsTo, ...data}) => {
                        return color.scale[data[labelMapsTo]]
                    })
                    .style('fill-opacity', Configuration.area.opacity.selected / 2);

                    // Add highlight line
                    group
					.selectAll('line.highlight-line')
					.transition(
						self.services.transitions.getTransition(
							'highlight-line-update',
							animate
						)
					)
					.attr('x1', AxisPositions.LEFT ? xScaleEnd : xScaleStart)
                    .attr('x2', AxisPositions.LEFT ? xScaleEnd : xScaleStart)
					.attr(
						'y2', ({highlightStartMapsTo, ...d}) => getYValue(d[highlightStartMapsTo])
					)
					.attr(
						'y1',
						({highlightEndMapsTo, ...d}) =>
                        getYValue(d[highlightEndMapsTo]) 
					)
					.style('stroke', ({color, labelMapsTo, ...data}) => {
                        return color.scale[data[labelMapsTo]]
                    })
			}
		});




	}

}
