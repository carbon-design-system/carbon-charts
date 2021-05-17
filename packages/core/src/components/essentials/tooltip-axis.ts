import { Tooltip } from './tooltip';
import { AxisPositions, ColorClassNameTypes } from '../../interfaces';
import { Tools } from '../../tools';
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

			const value = datum[rangeIdentifier];

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
					label: options.tooltip.totalLabel || 'Total',
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
