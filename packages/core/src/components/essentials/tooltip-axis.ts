import { Tooltip } from './tooltip';
import { ColorClassNameTypes } from '../../interfaces';
import { Tools } from '../../tools';

import { get } from 'lodash-es';

export class AxisChartsTooltip extends Tooltip {
	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items;
		}

		const data = e.detail.data;
		if (!data.length || !data[0]) {
			return [];
		}

		const options = this.getOptions();
		const { cartesianScales } = this.services;
		const domainIdentifier = cartesianScales.getDomainIdentifier();

		// Generate default tooltip
		const { groupMapsTo } = options.data;
		const domainLabel = cartesianScales.getDomainLabel();
		const rangeLabel = cartesianScales.getRangeLabel();

		let domainValue = data[0][domainIdentifier];
		let items: any[];
		if (data.length === 1) {
			const datum = data[0];
			const rangeIdentifier = cartesianScales.getRangeIdentifier(datum);
			const value = datum[rangeIdentifier];

			items = [
				{
					label: domainLabel,
					value: domainValue,
				},
				...(Array.isArray(value) && value.length === 2
					? [
							{
								label: 'Start',
								value: value[0],
							},
							{
								label: 'End',
								value: value[1],
							},
					  ]
					: [
							{
								label: rangeLabel,
								value: datum[rangeIdentifier],
							},
					  ]),
			];

			if (e.detail.additionalItems) {
				e.detail.additionalItems.forEach((additionalItem) =>
					items.push({
						label: additionalItem.label,
						value: additionalItem.value,
					})
				);
			}

			items.push({
				label: options.tooltip.groupLabel,
				value: datum[groupMapsTo],
				color: this.model.getFillColor(datum[groupMapsTo]),
				class: this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.TOOLTIP],
					dataGroupName: datum[groupMapsTo],
				}),
			});
		} else if (data.length > 1) {
			items = [
				{
					label: domainLabel,
					value: domainValue,
				},
			];

			items = items.concat(
				data
					.map((datum) => ({
						label: datum[groupMapsTo],
						value: datum[cartesianScales.getRangeIdentifier(datum)],
						color: this.model.getFillColor(datum[groupMapsTo]),
						class: this.model.getColorClassName({
							classNameTypes: [ColorClassNameTypes.TOOLTIP],
							dataGroupName: datum[groupMapsTo],
						}),
					}))
					.sort((a, b) => b.value - a.value)
			);

			const dualAxes = cartesianScales.isDualAxes();
			if (
				!dualAxes &&
				Tools.getProperty(options, 'tooltip', 'showTotal') === true
			) {
				// use the primary/only range id
				const rangeIdentifier = cartesianScales.getRangeIdentifier();
				items.push({
					label: get(options, 'tooltip.totalLabel') || 'Total',
					value: data.reduce(
						(accumulator, datum) =>
							accumulator + datum[rangeIdentifier],
						0
					),
					bold: true,
				});
			}
		}

		return items;
	}
}
