// Internal Imports
import { Axis } from './axis'
import { AxisPositions, Events, ScaleTypes } from '../../interfaces'
import type { ChartModel } from '../../model/model'
import { DOMUtils } from '../../services'
import { getProperty } from '../../tools'
import { axis } from '../../configuration'

// D3 Imports
import { select } from 'd3-selection'

export class HoverAxis extends Axis {
	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)
	}

	render(animate = true) {
		super.render(animate)

		// Remove existing event listeners to avoid flashing behavior
		super.destroy()

		const { position: axisPosition } = this.configs
		const svg = this.getComponentContainer()
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)

		const self = this
		container.selectAll('g.tick').each(function (_, index) {
			const g = select(this)
			g.classed('tick-hover', true).attr('tabindex', index === 0 ? 0 : -1)
			const textNode = g.select('text')
			const { width, height } = DOMUtils.getSVGElementSize(textNode, {
				useBBox: true
			})

			const rectangle = DOMUtils.appendOrSelect(g, 'rect.axis-holder')

			let x = 0,
				y = 0

			// Depending on axis position, apply correct translation & rotation to align the rect
			// with the text
			switch (axisPosition) {
				case AxisPositions.LEFT:
					x = -width + Number(textNode.attr('x'))
					y = -(height / 2)
					break
				case AxisPositions.RIGHT:
					x = Math.abs(Number(textNode.attr('x')))
					y = -(height / 2)
					break
				case AxisPositions.TOP:
					x = -(width / 2)
					y = -height + Number(textNode.attr('y')) / 2

					if (self.truncation[axisPosition]) {
						x = 0
						rectangle.attr('transform', `rotate(-45)`)
					}
					break
				case AxisPositions.BOTTOM:
					x = -(width / 2)
					y = height / 2 - 2

					if (self.truncation[axisPosition]) {
						x = -width
						rectangle.attr('transform', `rotate(-45)`)
					}
					break
			}

			// Translates x position -4 left to keep center after padding
			// Adds padding on left & right
			rectangle
				.attr('x', x - axis.hover.rectanglePadding)
				.attr('y', y)
				.attr('width', width + axis.hover.rectanglePadding * 2)
				.attr('height', height)
				.lower()
		})

		// Add event listeners to element group
		this.addEventListeners()
	}

	addEventListeners() {
		const svg = this.getComponentContainer()
		const { position: axisPosition } = this.configs
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)
		const options = this.getOptions()
		const axisOptions = getProperty(options, 'axes', axisPosition)
		const axisScaleType = getProperty(axisOptions, 'scaleType')
		const truncationThreshold = getProperty(axisOptions, 'truncation', 'threshold')

		const self = this
		container
			.selectAll('g.tick.tick-hover')
			.on('mouseover', function (event) {
				const hoveredElement = select(this).select('text')
				const datum = hoveredElement.datum() as string

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})

				if (axisScaleType === ScaleTypes.LABELS && datum.length > truncationThreshold) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						element: hoveredElement,
						datum
					})
				}
			})
			.on('mousemove', function (event) {
				const hoveredElement = select(this).select('text')
				const datum = hoveredElement.datum() as string
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_CLICK, {
					event,
					element: select(this).select('text'),
					datum: select(this).select('text').datum()
				})
			})
			.on('mouseout', function (event) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Axis.LABEL_MOUSEOUT, {
					event,
					element: select(this).select('text'),
					datum: select(this).select('text').datum()
				})

				if (axisScaleType === ScaleTypes.LABELS) {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
				}
			})
			.on('focus', function (event) {
				const coordinates = { clientX: 0, clientY: 0 }

				if (event.target) {
					// Focus element since we are using arrow keys
					event.target.focus()
					const boundingRect = event.target.getBoundingClientRect()
					coordinates.clientX = boundingRect.x
					coordinates.clientY = boundingRect.y
				}

				// Dispatch focus event
				self.services.events.dispatchEvent(Events.Axis.LABEL_FOCUS, {
					event: { ...event, ...coordinates },
					element: select(this),
					datum: select(this).select('text').datum()
				})
			})
			.on('blur', function (event) {
				// Dispatch blur event
				self.services.events.dispatchEvent(Events.Axis.LABEL_BLUR, {
					event,
					element: select(this),
					datum: select(this).select('text').datum()
				})
			})
			.on('keydown', function (event) {
				// Hide the tooltip when `Escape` is pressed, but keep focus
				if (event.key && event.key === 'Escape') {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
					self.services.events.dispatchEvent(Events.Axis.LABEL_BLUR, {
						event,
						element: select(this),
						datum: select(this).select('text').datum()
					})
				}

				// Choose specific arrow key depending on the axis
				if (axisPosition === AxisPositions.LEFT || axisPosition === AxisPositions.RIGHT) {
					if (event.key && event.key === 'ArrowUp') {
						self.goNext(this as HTMLElement, event)
					} else if (event.key && event.key === 'ArrowDown') {
						self.goPrevious(this as HTMLElement, event)
					}
				} else {
					if (event.key && event.key === 'ArrowLeft') {
						self.goPrevious(this as HTMLElement, event)
					} else if (event.key && event.key === 'ArrowRight') {
						self.goNext(this as HTMLElement, event)
					}
				}
			})
	}

	// Focus on the next HTML element sibling
	private goNext(element: HTMLElement, event: Event) {
		if (element.nextElementSibling && element.nextElementSibling.tagName !== 'path') {
			element.nextElementSibling.dispatchEvent(new Event('focus'))
		}

		event.preventDefault()
	}

	// Focus on the previous HTML element sibling
	private goPrevious(element: HTMLElement, event: Event) {
		if (element.previousElementSibling && element.previousElementSibling.tagName !== 'path') {
			element.previousElementSibling.dispatchEvent(new Event('focus'))
		}

		event.preventDefault()
	}

	destroy() {
		const svg = this.getComponentContainer()
		const { position: axisPosition } = this.configs
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`)

		// Remove event listeners
		container
			.selectAll('g.tick.tick-hover')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
			.on('focus', null)
			.on('blur', null)
	}
}
