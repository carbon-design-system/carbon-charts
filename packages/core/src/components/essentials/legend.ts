import { select } from 'd3'
import { getProperty, truncateLabel } from '@/tools'
import { legend as legendConfigs } from '@/configuration'
import { Component } from '@/components/component'
import {
	Alignments,
	ColorClassNameTypes,
	LegendItemType,
	RenderTypes,
	Events,
	TruncationTypes
} from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import { sanitizeText } from '@/utils/sanitizeHtml'

export class Legend extends Component {
	type = 'legend'
	renderType = RenderTypes.HTML

	// flag for checking if event listener is added
	isEventListenerAdded = false

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const options = this.getOptions()
		const legendOptions = getProperty(options, 'legend')
		const alignment = getProperty(legendOptions, 'alignment')

		const legendOrientation = getProperty(options, 'legend', 'orientation')

		let dataGroups = this.model.getDataGroups()

		// Check if there are disabled legend items
		const { DISABLED } = legendConfigs.items.status
		const hasDeactivatedItems = dataGroups.some((dataGroup: any) => dataGroup.status === DISABLED)
		const userProvidedOrder = getProperty(legendOptions, 'order')

		const svg = this.getComponentContainer()
			.classed('center-aligned', alignment === Alignments.CENTER)
			.classed('right-aligned', alignment === Alignments.RIGHT)
			.classed(legendOrientation, true)
			.classed('has-deactivated-items', hasDeactivatedItems)
			.attr('role', Roles.GROUP)
			.attr('aria-label', 'Data groups')
			.attr('data-name', 'legend-items')

		if (userProvidedOrder) {
			dataGroups = this.sortDataGroups(dataGroups, userProvidedOrder)
		}

		const legendItems = svg
			.selectAll('div.legend-item')
			.data(dataGroups, (dataGroup: any) => dataGroup.name)

		const addedLegendItems = legendItems.enter().append('div').attr('class', 'legend-item')

		addedLegendItems.merge(svg.selectAll('div.legend-item')).classed('active', function (d: any) {
			return d.status === legendConfigs.items.status.ACTIVE
		})

		const legendClickable = getProperty(this.getOptions(), 'legend', 'clickable')
		svg.classed('clickable', legendClickable && dataGroups.length > 1)

		const checkboxRadius = legendConfigs.checkbox.radius

		const addedCheckboxes = addedLegendItems.append('div').classed('checkbox', true)

		const allCheckboxes = addedCheckboxes
			.merge(legendItems.select('div.checkbox'))
			.attr('role', Roles.CHECKBOX)
			.attr('tabindex', legendClickable ? 0 : -1)
			.attr('aria-labelledby', (_: any, i: number) =>
				this.services.domUtils.generateElementIDString(`legend-datagroup-${i}-title`)
			)
			.attr('aria-checked', ({ status }) => status === legendConfigs.items.status.ACTIVE)
			.attr('width', checkboxRadius * 2)
			.attr('height', checkboxRadius * 2)
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.BACKGROUND],
					dataGroupName: d.name,
					originalClassName: 'checkbox'
				})
			)
			.style('background', (d: any) =>
				d.status === legendConfigs.items.status.ACTIVE
					? this.model.getFillColor(d.name) || this.model.getStrokeColor(d.name)
					: null
			)
			.classed('active', function (d: any) {
				return d.status === legendConfigs.items.status.ACTIVE
			})

		addedCheckboxes
			.append('svg')
			.attr('focusable', false)
			.attr('preserveAspectRatio', 'xMidYMid meet')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('width', '11')
			.attr('height', '11')
			.attr('viewBox', '0 0 31 28')
			.attr('aria-hidden', true)
			.style('will-change', 'transform')
			.append('path')
			.attr('d', 'M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z')

		addedLegendItems.append('p').merge(legendItems.select('p'))

		const additionalItemsOption = getProperty(options, 'legend', 'additionalItems')

		// add additional legend items
		if (additionalItemsOption && dataGroups.length) {
			const self = this

			const additionalItems = svg.selectAll('div.additional-item').data(additionalItemsOption)

			additionalItems.exit().remove()

			const addedAdditionalItems = additionalItems
				.enter()
				.append('div')
				.merge(additionalItems as any)
				.classed('legend-item', true)
				.classed('additional', true)
				.attr('aria-labelledby', (_: any, i: number) =>
					this.services.domUtils.generateElementIDString(
						`legend-datagroup-${allCheckboxes.size() + i}-title`
					)
				)

			// remove nested child elements that no longer needed
			addedAdditionalItems.selectAll('*').remove()

			// get index of item with same type to assign distinct classname
			let previousType: any
			let indexOfItem = 1

			// add different type of legend items
			addedAdditionalItems
				.append('svg')
				.classed('icon', true)
				.each(function (d: any) {
					const additionalItem = select(this)

					if (!previousType || previousType != d.type) {
						previousType = d.type
						indexOfItem = 1
					} else {
						indexOfItem++
					}

					self.addAdditionalItem(additionalItem, d, indexOfItem)
				})

			addedAdditionalItems.append('p').merge(addedAdditionalItems.select('p'))

			this.truncateLegendText()
		}

		// Remove old elements as needed.
		legendItems.exit().on('mouseover', null).on('click', null).on('mouseout', null).remove()

		if (!this.isEventListenerAdded) {
			this.addEventListeners()
			this.isEventListenerAdded = true
		}
	}

	sortDataGroups(dataGroups: any, legendOrder: any) {
		// Sort data in user defined order
		dataGroups.sort(
			(dataA: { name: string }, dataB: { name: string }) =>
				legendOrder.indexOf(dataA.name) - legendOrder.indexOf(dataB.name)
		)

		// If user only defined partial ordering, ordered items are placed before unordered ones
		if (legendOrder.length < dataGroups.length) {
			const definedOrderIndex = dataGroups.length - legendOrder.length
			const definedOrder = dataGroups.slice(definedOrderIndex)

			return definedOrder.concat(dataGroups.slice(0, definedOrderIndex))
		}
		return dataGroups
	}

	addAdditionalItem(additionalItem: any, itemConfig: any, indexOfItem: any) {
		const { width, height } = legendConfigs.area

		if (itemConfig.type === LegendItemType.RADIUS) {
			// Circular icon
			additionalItem.style('width', `${height}px`).style('height', `${height}px`)
		} else {
			additionalItem.style('width', `${width}px`).style('height', `${height}px`)
		}

		if (itemConfig.type === LegendItemType.RADIUS) {
			const { iconData, fill, stroke } = legendConfigs.radius

			const circleEnter = additionalItem
				.attr('fill', 'none')
				.selectAll('circle')
				.data(iconData)
				.enter()

			circleEnter
				.append('circle')
				.classed('radius', true)
				.attr('role', Roles.IMG)
				.attr('aria-label', 'radius')
				.attr('cx', (d: any) => d.cx)
				.attr('cy', (d: any) => d.cy)
				.attr('r', (d: any) => d.r)
				.style('fill', itemConfig.fill ? itemConfig.fill : fill)
				.style('stroke', itemConfig.stroke ? itemConfig.stroke : stroke)
		} else if (itemConfig.type === LegendItemType.LINE) {
			const lineConfig = legendConfigs.line

			if (additionalItem.select('line.line').empty()) {
				additionalItem
					.append('line')
					.classed(`line-${indexOfItem}`, true)
					.attr('role', Roles.IMG)
					.attr('aria-label', 'line')
					.attr('x1', 0)
					.attr('y1', lineConfig.yPosition)
					.attr('x2', width)
					.attr('y2', lineConfig.yPosition)
					.style('stroke', itemConfig.stroke ? itemConfig.stroke : lineConfig.stroke)
					.style('stroke-width', lineConfig.strokeWidth)
			}
		} else if (itemConfig.type === LegendItemType.AREA) {
			if (additionalItem.select('rect.area').empty()) {
				additionalItem
					.append('rect')
					.classed(`area-${indexOfItem}`, true)
					.attr('role', Roles.IMG)
					.attr('aria-label', 'area')
					.attr('width', width)
					.attr('height', height)
					.style(
						'fill',
						indexOfItem > 3 && !itemConfig.fill ? legendConfigs.area.fill : itemConfig.fill
					)
					.style('stroke', itemConfig.stroke)
			}
		} else if (itemConfig.type === LegendItemType.SIZE) {
			const { iconData, fill, stroke } = legendConfigs.size

			const sizeEnter = additionalItem
				.attr('fill', 'none')
				.attr('role', Roles.IMG)
				.attr('aria-label', 'size')
				.selectAll('rect')
				.data(iconData)
				.enter()

			sizeEnter
				.append('rect')
				.classed('size', true)
				.attr('width', (d: any) => d.width)
				.attr('height', (d: any) => d.height)
				.attr('y', () => 0)
				.style('fill', itemConfig.fill ? itemConfig.fill : fill)
				.style('stroke', itemConfig.stroke ? itemConfig.stroke : stroke)
				.style('stroke-width', 1)
		} else if (itemConfig.type === LegendItemType.QUARTILE) {
			const { iconData } = legendConfigs.quartile

			const quartileEnter = additionalItem
				.selectAll('rect')
				.attr('role', Roles.IMG)
				.attr('aria-label', 'quartile')
				.data(iconData)
				.enter()

			quartileEnter
				.append('rect')
				.attr('class', (_: any, i: number) => `quartile-${i === 0 ? 'wrapper' : 'line'}`)
				.attr('x', (d: any) => d.x)
				.attr('y', (d: any) => d.y)
				.attr('width', (d: any) => d.width)
				.attr('height', (d: any) => d.height)
		} else if (itemConfig.type === LegendItemType.ZOOM) {
			const { iconData, color } = getProperty(legendConfigs, 'zoom')

			const zoomEnter = additionalItem
				.attr('role', Roles.IMG)
				.attr('aria-label', 'zoom')
				.selectAll('g.icon')
				.data(iconData)
				.enter()

			// add '+' for the magnifying icon
			zoomEnter
				.append('g')
				.attr('x', (d: any) => d.x)
				.attr('y', (d: any) => d.y)
				.attr('width', (d: any) => d.width)
				.attr('height', (d: any) => d.height)
				.append('polygon')
				.attr(
					'points',
					'7.7 4.82 5.78 4.82 5.78 2.89 4.82 2.89 4.82 4.82 2.89 4.82 2.89 5.78 4.82 5.78 4.82 7.7 5.78 7.7 5.78 5.78 7.7 5.78 7.7 4.82'
				)
				.attr('fill', () => (itemConfig.color ? itemConfig.color : color))

			// add the magnifying zoom icon handle/circle
			zoomEnter
				.append('path')
				.attr(
					'd',
					'M9.36,8.67A5.22,5.22,0,0,0,10.59,5.3,5.3,5.3,0,1,0,5.3,10.59,5.22,5.22,0,0,0,8.67,9.36L12.32,13l.68-.68Zm-4.06,1A4.34,4.34,0,1,1,9.63,5.3,4.33,4.33,0,0,1,5.3,9.63Z'
				)
				.attr('fill', () => (itemConfig.color ? itemConfig.color : color))
		}
	}

	truncateLegendText() {
		const svg = this.getComponentContainer()

		const truncationOptions = getProperty(this.getOptions(), 'legend', 'truncation')
		// Truncation
		// get user provided custom values for truncation
		const truncationType = getProperty(truncationOptions, 'type')
		const truncationThreshold = getProperty(truncationOptions, 'threshold')
		const truncationNumCharacter = getProperty(truncationOptions, 'numCharacter')

		const addedLegendItemsText = svg.selectAll('div.legend-item p')

		// Add an ID for the checkbox to use through `aria-labelledby`
		addedLegendItemsText.attr('id', function () {
			const elementToReference: any =
				(this as any).parentNode.querySelector('div.checkbox') || (this as any).parentNode

			return elementToReference.getAttribute('aria-labelledby')
		})

		// truncate the legend label if it's too long
		if (truncationType !== TruncationTypes.NONE) {
			addedLegendItemsText.html(function (d: any) {
				const _sanitizedLabel = sanitizeText(d.name)
				if (
					_sanitizedLabel.length > truncationThreshold &&
					_sanitizedLabel.length !== truncationNumCharacter
				) {
					return truncateLabel(_sanitizedLabel, truncationType, truncationNumCharacter)
				} else {
					return _sanitizedLabel
				}
			})
		} else {
			addedLegendItemsText.html((d: any) => sanitizeText(d.name))
		}
	}

	addEventListeners() {
		const self = this
		const svg = this.getComponentContainer()
		const options = this.getOptions()
		const legendOptions = getProperty(options, 'legend')
		const truncation = getProperty(legendOptions, 'truncation')

		svg
			.selectAll('div.legend-item')
			.on('mouseover', function (event: MouseEvent) {
				self.services.events.dispatchEvent(Events.Legend.ITEM_HOVER, {
					hoveredElement: select(this)
				})

				const hoveredItem = select(this)
				hoveredItem.select('div.checkbox').classed('hovered', true)

				// Show tooltip if character length is greater than threshold & there is no truncation
				const hoveredItemData = hoveredItem.datum() as any
				if (
					hoveredItemData.name.length > truncation.threshold &&
					truncation.numCharacter < hoveredItemData.name.length &&
					truncation.type !== TruncationTypes.NONE
				) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement: hoveredItem,
						content: hoveredItemData.name
					})
				}
			})
			.on('mousemove', function (event: MouseEvent) {
				// Emit tooltip move event only if tooltip is shown
				const hoveredItemData = select(this).datum() as any
				if (
					hoveredItemData.name.length > truncation.threshold &&
					truncation.type !== TruncationTypes.NONE
				) {
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event
					})
				}
			})
			.on('click', function () {
				self.services.events.dispatchEvent(Events.Legend.ITEM_CLICK, {
					clickedElement: select(this)
				})

				const clickedItem = select(this)
				const clickedItemData = clickedItem.datum() as any

				self.model.toggleDataLabel(clickedItemData.name)
			})
			.on('mouseout', function () {
				const hoveredItem = select(this)
				hoveredItem.select('div.checkbox').classed('hovered', false)

				// Emit tooltip hide event only if tooltip is shown
				const hoveredItemData = hoveredItem.datum() as any
				if (
					hoveredItemData.name.length > truncation.threshold &&
					truncation.type !== TruncationTypes.NONE
				) {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
				}

				self.services.events.dispatchEvent(Events.Legend.ITEM_MOUSEOUT, {
					hoveredElement: hoveredItem
				})
			})

		svg.selectAll('div.legend-item div.checkbox').on('keyup', function (event: KeyboardEvent) {
			if (event.key && event.key === 'Tab') {
				// Higlight group
				self.services.events.dispatchEvent(Events.Legend.ITEM_HOVER, {
					hoveredElement: select(this)
				})
			}
		})

		svg
			.selectAll('div.legend-item div.checkbox')
			.on('keydown', function (event: KeyboardEvent, d: any) {
				if (event.key && event.key === ' ') {
					event.preventDefault()
					self.model.toggleDataLabel(d.name)
				} else if (event.key && event.key === 'Tab') {
					// Unhiglight group
					self.services.events.dispatchEvent(Events.Legend.ITEM_MOUSEOUT, {
						hoveredElement: select(this)
					})
				}
			})

		svg.selectAll('g.additional-item').on('mouseover', function (event: MouseEvent) {
			const hoveredItem = select(this)

			const hoveredItemData = hoveredItem.datum() as any
			if (hoveredItemData.name.length > truncation.threshold) {
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement: hoveredItem,
					content: hoveredItemData.name
				})
			}
		})
	}
}
