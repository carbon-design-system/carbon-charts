// Internal Imports
import { Component } from '../component';
import { RenderTypes } from '../../interfaces';

export class Candlestick extends Component {
	type = 'candlestick';
	renderType = RenderTypes.SVG;

	render(animate = true) {
		const svg = this.getComponentContainer({ withinChartClip: true });

		const { cartesianScales } = this.services;

		const displayData = this.model.getDisplayData();

		const groups = svg.selectAll('g.candlestick').data(displayData);

		const groupsEnter = groups
			.enter()
			.append('g')
			.attr('class', 'candlestick');

		groupsEnter.append('line').attr('class', 'wick');
		groupsEnter.append('line').attr('class', 'body');

		const allGroups = groups
			.merge(groupsEnter)
			.attr(
				'transform',
				(d) => `translate(${cartesianScales.getDomainValue(d.date)}, 0)`
			);

		allGroups
			.selectAll('line.wick')
			.attr('y1', (d) => cartesianScales.getRangeValue(d.low))
			.attr('y2', (d) => cartesianScales.getRangeValue(d.high))
			.style('pointer-events', 'none')
			.attr('stroke', 'grey')
			.attr('stroke-width', 1);

		allGroups
			.selectAll('line.body')
			.attr('y1', (d) => cartesianScales.getRangeValue(d.open))
			.attr('y2', (d) => cartesianScales.getRangeValue(d.close))
			.style('pointer-events', 'none')
			.attr('stroke', (d) =>
				d.open > d.close ? 'red' : d.close > d.open ? 'green' : 'grey'
			)
			.attr('stroke-width', 4);
	}
}
