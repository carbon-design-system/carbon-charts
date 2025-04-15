import { select, pointer } from 'd3'
import { Position, PLACEMENTS } from '@carbon/utils-position' // position service
import { getProperty, truncateLabel } from '@/tools'
import { zoomBar as zoomBarConfigs, tooltips as tooltipConfigs } from '@/configuration'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import { Events, RenderTypes, TruncationTypes } from '@/interfaces/enums'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

export class Tooltip extends Component {
	type = 'tooltip'
	renderType = RenderTypes.HTML

	// flag for checking whether tooltip event listener is added or not
	isEventListenerAdded = false
	lastTriggeredEventType = ''
	tooltip: any
	positionService = new Position()

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)

		this.init()
	}

	handleShowTooltip = (e: any) => {
		const data = e.detail.data || e.detail.items
		const datum = select(e.detail.event.target).datum()

		let defaultHTML: any
		const formattedItems = this.formatItems(this.getItems(e))

		if (e.detail.content) {
			defaultHTML = `<div class="title-tooltip"><p>${sanitizeHtml(e.detail.content)}</p></div>`
		} else {
			defaultHTML = sanitizeHtml(this.getTooltipHTML(formattedItems))
		}

		const tooltipTextContainer = DOMUtils.appendOrSelect(this.tooltip, 'div.content-box')

		// if there is a provided tooltip HTML function call it
		if (getProperty(this.getOptions(), 'tooltip', 'customHTML')) {
			if (e.detail.content) {
				const labelHTML = `<div class="title-tooltip"><p>${sanitizeHtml(
					e.detail.content
				)}</p></div>`
				tooltipTextContainer.html(labelHTML)
			} else {
				tooltipTextContainer.html(
					`<div class="title-tooltip"><p>${sanitizeHtml(
						this.model.getOptions().tooltip.customHTML(data, defaultHTML, datum)
					)}</p></div>`
				)
			}
		} else {
			// Use default tooltip
			tooltipTextContainer.html(defaultHTML)
		}

		// Apply custom background colors
		tooltipTextContainer.selectAll('.datapoint-tooltip').each(function (_: any, i: number) {
			const item = formattedItems[i]

			if (formattedItems[i] && formattedItems[i].color) {
				select(this)
					.select('.tooltip-color')
					.attr('class', 'tooltip-color')
					.style('background-color', item.color)
			}
		})

		// Position the tooltip
		this.positionTooltip(e)

		// Fade in
		this.tooltip.classed('hidden', false).attr('aria-hidden', false)

		// Store the latest triggered custom event type
		this.lastTriggeredEventType = e.type
	}

	handleHideTooltip = () => {
		this.tooltip.classed('hidden', true).attr('aria-hidden', true)
	}

	addTooltipEventListener() {
		// listen to move-tooltip Custom Events to move the tooltip
		this.services.events.addEventListener(Events.Tooltip.MOVE, (e: CustomEvent) => {
			if (
				this.lastTriggeredEventType !== Events.Toolbar.SHOW_TOOLTIP &&
				this.tooltip.classed('hidden') === false
			) {
				this.positionTooltip(e)
			}
		})

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.addEventListener(Events.Tooltip.SHOW, this.handleShowTooltip)

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.addEventListener(Events.Tooltip.HIDE, this.handleHideTooltip)

		// listen to chart-mouseout event to hide the tooltip
		this.services.events.addEventListener(Events.Chart.MOUSEOUT, this.handleHideTooltip)

		// listen to toolbar events
		this.services.events.addEventListener(Events.Toolbar.SHOW_TOOLTIP, this.handleShowTooltip)
		this.services.events.addEventListener(Events.Toolbar.HIDE_TOOLTIP, this.handleHideTooltip)
	}

	removeTooltipEventListener() {
		// remove move-tooltip Custom Events
		this.services.events.removeEventListener(Events.Tooltip.MOVE, null)

		// remove show-tooltip Custom Events
		this.services.events.removeEventListener(Events.Tooltip.SHOW, this.handleShowTooltip)

		// remove hide-tooltip Custom Events
		this.services.events.removeEventListener(Events.Tooltip.HIDE, this.handleHideTooltip)

		// remove the listener on chart-mouseout
		this.services.events.removeEventListener(Events.Chart.MOUSEOUT, this.handleHideTooltip)

		// remove the listener of the toolbar
		this.services.events.removeEventListener(Events.Toolbar.SHOW_TOOLTIP, this.handleShowTooltip)
		this.services.events.removeEventListener(Events.Toolbar.HIDE_TOOLTIP, this.handleHideTooltip)
	}

	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items
		}

		return []
	}

	formatItems(items: any) {
		const options = this.getOptions()

		// get user provided custom values for truncation
		const truncationType = getProperty(options, 'tooltip', 'truncation', 'type')

		const truncationThreshold = getProperty(options, 'tooltip', 'truncation', 'threshold')

		const truncationNumCharacter = getProperty(options, 'tooltip', 'truncation', 'numCharacter')

		// truncate the label if it's too long
		// only applies to discrete type
		if (truncationType !== TruncationTypes.NONE) {
			return items.map((item: any) => {
				// get width of the label icon if it exists
				const labelIconSize = item.labelIcon ? 12 : 0

				item.value = this.valueFormatter(item.value, item.label)
				if (item.label && item.label.length + labelIconSize > truncationThreshold) {
					item.label = truncateLabel(item.label, truncationType, truncationNumCharacter)
				}

				if (item.value && item.value.length > truncationThreshold) {
					item.value = truncateLabel(item.value, truncationType, truncationNumCharacter)
				}

				return item
			})
		} else {
			return items.map((item: any) => {
				item.value = this.valueFormatter(item.value, item.label)
				return item
			})
		}
	}

	getTooltipHTML(formattedItems: any) {
		return (
			`<ul class="multi-tooltip">` +
			formattedItems
				.map(
					(item: any) =>
						`<li>
					<div class="datapoint-tooltip${item.bold ? ' bold' : ''}">
						${item.class || item.color ? `<div class="tooltip-color ${item.class}"></div>` : ''}
						<div class="label">
						<p>${item.label || ''}</p>
						${item.labelIcon ? `<span class="label-icon"/>${item.labelIcon}</span>` : ''}
						</div>
						${item.value === undefined || item.value === null ? '' : `<p class="value"/>${item.value}</p>`}
					</div>
				</li>`
				)
				.join('') +
			`</ul>`
		)
	}

	isDate(value: any): value is Date {
		return value instanceof Date
	}

	valueFormatter(value: number | Date | null | undefined, label: string) {
		const options = this.getOptions()
		const valueFormatter = getProperty(options, 'tooltip', 'valueFormatter')
		const {
			code: localeCode,
			number: numberFormatter,
			date: dateFormatter
		} = getProperty(options, 'locale')

		if (valueFormatter) {
			return valueFormatter(value, label)
		}

		if (this.isDate(value)) {
			return dateFormatter(value, localeCode, { month: 'short', day: 'numeric', year: 'numeric' })
		}

		try {
			// it's a correct ISO format Date string
			if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)) {
				const newDate = new Date(value)
				return dateFormatter(newDate, localeCode, {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			}
		} catch (e) {
			// not a valid ISO format string
		}

		return numberFormatter(value, localeCode)
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const options = this.getOptions()
		const isTooltipEnabled = getProperty(options, 'tooltip', 'enabled')
		if (isTooltipEnabled) {
			// Grab the tooltip element
			const holder = select(this.services.domUtils.getHolder())
			const chartprefix = getProperty(options, 'style', 'prefix')
			this.tooltip = DOMUtils.appendOrSelect(holder, `div.${carbonPrefix}--${chartprefix}--tooltip`)

			this.tooltip.style('max-width', null).attr('role', 'tooltip')

			if (!this.isEventListenerAdded) {
				this.addTooltipEventListener()
				this.isEventListenerAdded = true
			}
			this.tooltip.classed('hidden', true)
		} else if (!isTooltipEnabled && this.isEventListenerAdded) {
			// remove tooltip eventListener
			this.removeTooltipEventListener()
			this.isEventListenerAdded = false
		}
	}

	addOffsetByPlacement(position: any, placement: string, offset: number) {
		const newOffset = Object.assign({}, position)
		if (placement == PLACEMENTS.LEFT) {
			newOffset.left -= offset
		} else if (placement == PLACEMENTS.RIGHT) {
			newOffset.left += offset
		} else if (placement == PLACEMENTS.TOP) {
			newOffset.top -= offset
		} else if (placement == PLACEMENTS.BOTTOM) {
			newOffset.top += offset
		}
		return newOffset
	}

	positionTooltip(e: CustomEvent) {
		const holder = this.services.domUtils.getHolder()
		const holderWidth = holder.offsetWidth
		const holderHeight = holder.offsetHeight
		const target = this.tooltip.node()
		const options = this.getOptions()
		const isTopZoomBarEnabled = getProperty(options, 'zoomBar', 'top', 'enabled')
		const noWrap = !!getProperty(e, 'detail', 'noWrap')
		const hasCustomPlacements = Array.isArray(getProperty(e, 'detail', 'placements'))
		const placements = hasCustomPlacements
			? getProperty(e, 'detail', 'placements')
			: [PLACEMENTS.RIGHT, PLACEMENTS.LEFT, PLACEMENTS.TOP, PLACEMENTS.BOTTOM]

		let bestPlacementOption: any
		let { horizontalOffset } = tooltipConfigs
		const { defaultOffset } = tooltipConfigs

		this.tooltip.select('div.title-tooltip').classed('title-tooltip-nowrap', noWrap)

		// set tooltip based on reference element with candidate placements
		if (hasCustomPlacements) {
			const hoveredElement = getProperty(e, 'detail', 'event', 'target')
			// calculate the best placement from array "placements"
			const hoveredPos = this.services.domUtils.getElementOffset(hoveredElement, true)
			bestPlacementOption = this.positionService.findBestPlacementAt(
				hoveredPos,
				target,
				placements,
				() => ({
					top: 0,
					left: 0,
					width: holderWidth,
					height: holderHeight
				})
			)
			let bestPos = this.positionService.findPosition(
				hoveredElement,
				target,
				bestPlacementOption,
				() => this.services.domUtils.getElementOffset(hoveredElement)
			)
			bestPos = this.addOffsetByPlacement(bestPos, bestPlacementOption, defaultOffset)
			this.positionService.setElement(target, bestPos)
			return
		}

		// set tooltip based on mouse positions
		let mouseRelativePos = getProperty(e, 'detail', 'mousePosition')
		if (!mouseRelativePos) {
			mouseRelativePos = pointer(getProperty(e, 'detail', 'event'), holder)
		} else {
			const zoombarType = getProperty(options, 'zoomBar', 'top', 'type') as
				| 'graph_view'
				| 'slider_view'
			const zoombarHeight = zoomBarConfigs.height[zoombarType]

			// if the mouse position is from event (ruler)
			// we need add zoom bar height
			if (isTopZoomBarEnabled) {
				mouseRelativePos[1] += zoombarHeight + zoomBarConfigs.spacerHeight

				// TODO - we need to add toolbar height when toolbar is available
			}
		}

		if (mouseRelativePos[0] / holderWidth > 0.9) {
			bestPlacementOption = PLACEMENTS.LEFT
		} else if (mouseRelativePos[0] / holderWidth < 0.1) {
			bestPlacementOption = PLACEMENTS.RIGHT
		} else {
			// Find out whether tooltip should be shown on the left or right side
			bestPlacementOption = this.positionService.findBestPlacementAt(
				{
					left: mouseRelativePos[0],
					top: mouseRelativePos[1]
				},
				target,
				placements,
				() => ({
					top: undefined, // properties were never set to optional (probably should)
					left: undefined, // ditto
					width: holderWidth,
					height: holderHeight
				})
			)
		}

		if (bestPlacementOption === PLACEMENTS.LEFT) {
			horizontalOffset *= -1
		}

		// Get coordinates to where tooltip should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0] + horizontalOffset,
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		)

		this.positionService.setElement(target, pos)
	}
}
