import { Tooltip } from './tooltip';
import {
	AxisPositions,
	ScaleTypes,
	ColorClassNameTypes,
} from '../../interfaces';
import { Tools } from '../../tools';

import { format } from 'date-fns';

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
		const domainAxisOptions = cartesianScales.getDomainAxisOptions();
		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const domainAxisScaleType = cartesianScales.getDomainAxisScaleType();

		// Generate default tooltip
		const { groupMapsTo } = options.data;
		let domainLabel = domainAxisOptions.title;
		if (!domainLabel) {
			const domainAxisPosition = cartesianScales.getDomainAxisPosition();
			if (
				domainAxisPosition === AxisPositions.BOTTOM ||
				domainAxisPosition === AxisPositions.TOP
			) {
				domainLabel = 'x-value';
			} else {
				domainLabel = 'y-value';
			}
		}

		let domainValue = data[0][domainIdentifier];
		if (domainAxisScaleType === ScaleTypes.TIME) {
			domainValue = format(
				new Date(data[0][domainIdentifier]),
				'MMM d, yyyy'
			);
		} else if (domainAxisScaleType === ScaleTypes.LINEAR) {
			domainValue = domainValue.toLocaleString();
		}

		let items: any[];
		if (data.length === 1) {
			const datum = data[0];
			const rangeAxisPosition = cartesianScales.getRangeAxisPosition({
				datum,
			});
			const rangeIdentifier = cartesianScales.getRangeIdentifier(datum);
			const rangeAxisOptions = cartesianScales.getAxisOptions(
				rangeAxisPosition
			);

			let rangeLabel = rangeAxisOptions.title;
			if (!rangeLabel) {
				if (
					rangeAxisPosition === AxisPositions.LEFT ||
					rangeAxisPosition === AxisPositions.RIGHT
				) {
					rangeLabel = 'y-value';
				} else {
					rangeLabel = 'x-value';
				}
			}

			items = [
				{
					label: domainLabel,
					value: domainValue,
				},
				{
					label: rangeLabel,
					value: datum[rangeIdentifier],
				},
				{
					label: options.tooltip.groupLabel || 'Group',
					value: datum[groupMapsTo],
					color: this.model.getFillColor(datum[groupMapsTo]),
					class: this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.TOOLTIP],
						dataGroupName: datum[groupMapsTo],
					}),
				},
			];
		} else if (data.length > 1) {
			items = [
				{
					label: domainLabel,
					value: this.valueFormatter(domainValue),
				},
			];

			items = items.concat(
				data
					.map((datum) => ({
						label: datum[groupMapsTo],
						value: this.valueFormatter(
							datum[cartesianScales.getRangeIdentifier(datum)]
						),
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
					label: options.tooltip.totalLabel || 'Total',
					value: this.valueFormatter(
						data.reduce(
							(accumulator, datum) =>
								accumulator + datum[rangeIdentifier],
							0
						)
					),
					bold: true,
				});
			}
		}

		return items;
	}
}
