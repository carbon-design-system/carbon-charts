import { Tooltip } from "./tooltip";
import { AxisPositions, ScaleTypes } from "../../interfaces";
import { Tools } from "../../tools";

import { format } from "date-fns";

export class AxisChartsTooltip extends Tooltip {
	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items;
		}

		const data = e.detail.data;
		if (!data.length || !data[0]) {
			return [];
		}

		const options = this.model.getOptions();
		const { cartesianScales } = this.services;
		const domainAxisOptions = cartesianScales.getDomainAxisOptions();
		const domainIdentifier = cartesianScales.getDomainIdentifier();
		const domainAxisScaleType = cartesianScales.getDomainAxisScaleType();
		const rangeAxisOptions = cartesianScales.getRangeAxisOptions();
		const rangeIdentifier = cartesianScales.getRangeIdentifier();
		const rangeAxisScaleType = cartesianScales.getRangeAxisScaleType();

		// Generate default tooltip
		const { groupMapsTo } = options.data;
		let domainLabel = domainAxisOptions.title;
		if (!domainLabel) {
			const domainAxisPosition = cartesianScales.getDomainAxisPosition();
			if (
				domainAxisPosition === AxisPositions.BOTTOM ||
				domainAxisPosition === AxisPositions.TOP
			) {
				domainLabel = "x-value";
			} else {
				domainLabel = "y-value";
			}
		}

		let domainValue = data[0][domainIdentifier];
		if (domainAxisScaleType === ScaleTypes.TIME) {
			domainValue = format(
				new Date(data[0][domainIdentifier]),
				"MMM d, yyyy"
			);
		} else if (domainAxisScaleType === ScaleTypes.LINEAR) {
			domainValue = domainValue.toLocaleString();
		}

		let items: any[];
		if (data.length === 1) {
			const datum = data[0];

			let rangeLabel = rangeAxisOptions.title;
			if (!rangeLabel) {
				const rangeAxisPosition = cartesianScales.getRangeAxisPosition();
				if (
					rangeAxisPosition === AxisPositions.LEFT ||
					rangeAxisPosition === AxisPositions.RIGHT
				) {
					rangeLabel = "y-value";
				} else {
					rangeLabel = "x-value";
				}
			}

			items = [
				{
					label: domainLabel,
					value: domainValue
				},
				{
					label: rangeLabel,
					value: this.valueFormatter(datum[rangeIdentifier])
				},
				{
					label: "Group",
					value: datum[groupMapsTo],
					color: this.model.getStrokeColor(datum[groupMapsTo])
				}
			];
		} else if (data.length > 1) {
			items = [
				{
					label: domainLabel,
					value: this.valueFormatter(domainValue)
				}
			];

			items = items.concat(
				data
					.map(datum => ({
						label: datum[groupMapsTo],
						value: this.valueFormatter(datum[rangeIdentifier]),
						color: this.model.getStrokeColor(datum[groupMapsTo])
					}))
					.sort((a, b) => b.value - a.value)
			);

			if (Tools.getProperty(options, "tooltip", "showTotal") === true) {
				items.push({
					label: "Total",
					value: this.valueFormatter(
						data.reduce(
							(accumulator, datum) =>
								accumulator + datum[rangeIdentifier],
							0
						)
					),
					bold: true
				});
			}
		}

		return items;
	}
}
