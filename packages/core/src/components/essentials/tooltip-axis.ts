import { get } from 'lodash-es'
import { getProperty } from '@/tools'
import { Tooltip } from './tooltip'
import { ColorClassNameTypes } from '@/interfaces/enums'

export class AxisChartsTooltip extends Tooltip {
	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items
		}

		const { data } = e.detail
		if (!data || !data.length || !data[0]) {
			return []
		}

		const options = this.getOptions()
		const { cartesianScales } = this.services
		const domainIdentifier = cartesianScales.getDomainIdentifier()
		const dualAxes = cartesianScales.isDualAxes()

		// Generate default tooltip
		const { groupMapsTo } = options.data
		const domainLabel = cartesianScales.getDomainLabel()
		let rangeLabel = cartesianScales.getRangeLabel()

		const domainValue = data[0][domainIdentifier]
		let items: any[]
		if (data.length === 1) {
			const datum = data[0]
			const rangeIdentifier = cartesianScales.getRangeIdentifier(datum)

			if (dualAxes) {
				const position = cartesianScales.getRangeAxisPosition({
					datum,
					groups: [datum[groupMapsTo]]
				})
				rangeLabel = cartesianScales.getScaleLabel(position)
			}
			const value = datum[rangeIdentifier]

			items = [
				{
					label: domainLabel,
					value: domainValue
				},
				...(Array.isArray(value) && value.length === 2
					? [
							{
								label: 'Start',
								value: value[0]
							},
							{
								label: 'End',
								value: value[1]
							}
						]
					: [
							{
								label: rangeLabel,
								value: datum[rangeIdentifier]
							}
						])
			]

			if (e.detail.additionalItems) {
				e.detail.additionalItems.forEach((additionalItem: any) =>
					items.push({
						label: additionalItem.label,
						value: additionalItem.value
					})
				)
			}

			items.push({
				label: get(options, 'locale.translations.group') || get(options, 'tooltip.groupLabel'),
				value: datum[groupMapsTo],
				color: this.model.getFillColor(datum[groupMapsTo]),
				class: this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.TOOLTIP],
					dataGroupName: datum[groupMapsTo]
				})
			})
		} else if (data.length > 1) {
			items = [
				{
					label: domainLabel,
					value: domainValue
				}
			]

			items = items.concat(
				data
					.map((datum: any) => {
						// Format value if is array
						const value = datum[cartesianScales.getRangeIdentifier(datum)]

						return {
							label: datum[groupMapsTo],
							value:
								Array.isArray(value) && value.length === 2 ? `${value[0]} - ${value[1]}` : value,
							color: this.model.getFillColor(datum[groupMapsTo]),
							class: this.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: datum[groupMapsTo]
							})
						}
					})
					.sort((a: any, b: any) => b.value - a.value)
			)

			if (!dualAxes && getProperty(options, 'tooltip', 'showTotal') === true) {
				// use the primary/only range id
				const rangeIdentifier = cartesianScales.getRangeIdentifier()
				items.push({
					label:
						get(options, 'locale.translations.total') ||
						get(options, 'tooltip.totalLabel') ||
						'Total',
					value: data.reduce(
						(accumulator: number, datum: any) => accumulator + datum[rangeIdentifier],
						0
					),
					bold: true
				})
			}
		}

		return items
	}
}
