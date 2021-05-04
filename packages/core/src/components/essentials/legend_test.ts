// Internal Imports
import { Component } from '../component';
import { Tools } from '../../tools';
import { ColorClassNameTypes, LegendItemType } from '../../interfaces/enums';
import {
	LegendOrientations,
	Roles,
	Events,
	TruncationTypes,
} from '../../interfaces';
import { DOMUtils } from '../../services';
import * as Configuration from '../../configuration';

// D3 Imports
import { select, event } from 'd3-selection';

export class Legend extends Component {
	type = 'legend';

	render() {
		const svg = this.parent;
		const options = this.getOptions();
		const legendOptions = Tools.getProperty(options, 'legend');
		let dataGroups = this.model.getDataGroups();
		const legendOrder = Tools.getProperty(legendOptions, 'order');

		if (legendOrder) {
			dataGroups = this.sortDataGroups(dataGroups, legendOrder);
		}

		var fo = svg
			.append('foreignObject')
			.attr('width', '100%')
			.attr('height', 200);
		var div = fo.append('xhtml:div').append('div');
		div.append('p')
			.attr('class', 'lead')
			.html('Holmes was certainly not a difficult man to live with.');
		div.append('p').html(
			'He was quiet in his ways, and his habits were regular. It was rare for him to be up after ten at night, and he had invariably breakfasted and gone out before I rose in the morning.'
		);
		// var foHeight = div[0][0].getBoundingClientRect().height;
		// fo.attr({
		// 	height: foHeight,
		// });

		// const legendItems = svg
		// 	.append('foreignObject')
		// 	.attr('requiredExtensions', 'http://www.w3.org/1999/xhtml')
		// 	.attr('width', '100%')
		// 	.attr('height', 200)
		// 	.selectAll('div')
		// 	.data(dataGroups, (dataGroup) => dataGroup.name);

		// const addedLegendItems = legendItems
		// 	.enter()
		// 	.append('div')
		// 	// .attr('xmlns', 'http://www.w3.org/1999/xhtml')
		// 	.html(
		// 		'Here is a <strong>paragraph</strong> that requires <em>word wrap</em>'
		// 	);
		// .classed('legend-item', true)
		// .classed('active', function (d, i) {
		// 	return d.status === Configuration.legend.items.status.ACTIVE;
		// });
	}

	sortDataGroups(dataGroups, legendOrder) {
		// Sort data in user defined order
		dataGroups.sort(
			(dataA, dataB) =>
				legendOrder.indexOf(dataA.name) -
				legendOrder.indexOf(dataB.name)
		);

		// If user only defined partial ordering, ordered items are placed before unordered ones
		if (legendOrder.length < dataGroups.length) {
			const definedOrderIndex = dataGroups.length - legendOrder.length;
			const definedOrder = dataGroups.slice(definedOrderIndex);

			return definedOrder.concat(dataGroups.slice(0, definedOrderIndex));
		}
		return dataGroups;
	}
}
