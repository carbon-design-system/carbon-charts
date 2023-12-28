import type { Selection } from 'd3'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events, RenderTypes } from '@/interfaces/enums'
import { sanitizeText } from '@/utils/sanitizeHtml'

export class Title extends Component {
	type = 'title'
	renderType = RenderTypes.HTML

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const svg = this.getComponentContainer()
		const title = getProperty(this.getOptions(), 'title')

		const text = svg.selectAll('p.title').data([title]) as Selection<
			HTMLParagraphElement,
			any,
			Element,
			any
		>

		text
			.enter()
			.append('p')
			.classed('title', true)
			.attr('role', 'heading')
			.attr('aria-level', 2)
			.merge(text as any)
			.html((d: any) => sanitizeText(d))

		// check if title needs truncation (and tooltip support)
		if (text.node() && text.node().offsetWidth < text.node().scrollWidth) {
			// add events for displaying the tooltip with the title
			const self = this
			text
				.on('mouseover', function (event: MouseEvent) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement: text,
						content: text.text()
					})
				})
				.on('mousemove', function (event: MouseEvent) {
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event
					})
				})
				.on('mouseout', function () {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
				})
		}

		text.exit().remove()
	}

	/**
	 * Truncates title creating ellipses and attaching tooltip for exposing full title.
	 */
	truncateTitle(title: any, maxWidth: number) {
		// sanity check to prevent stack overflow on binary search
		if (maxWidth <= 0) {
			return
		}

		const untruncatedTitle = title.text()
		// check if the title is too big for the containing svg
		if (title.node().getComputedTextLength() > maxWidth) {
			// append the ellipses to their own tspan to calculate the text length
			title.append('tspan').text('...')

			// get the bounding width including the elipses '...'
			const tspanLength = DOMUtils.appendOrSelect(title, 'tspan').node().getComputedTextLength()

			// with elipses
			const titleString = title.text()

			// get the index for creating the max length substring that fit within the svg
			// use one less than the index to avoid crowding (the elipsis)
			const substringIndex = this.getSubstringIndex(
				title.node(),
				0,
				titleString.length - 1,
				maxWidth - tspanLength
			)

			// use the substring as the title
			title
				.html(titleString.substring(0, substringIndex - 1))
				.append('tspan')
				.text('...')

			// add events for displaying the tooltip with the title
			const self = this
			title
				.on('mouseover', function (event: MouseEvent) {
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement: title,
						content: untruncatedTitle
					})
				})
				.on('mousemove', function (event: MouseEvent) {
					self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
						event
					})
				})
				.on('mouseout', function () {
					self.services.events.dispatchEvent(Events.Tooltip.HIDE)
				})
		}
	}

	// computes the maximum space a title can take
	protected getMaxTitleWidth() {
		return DOMUtils.getSVGElementSize(this.parent.node() as any, {
			useAttrs: true
		}).width
	}

	/**
	 * Returns the index for a maximum length substring that is less than the width parameter.
	 * @param title the title node used for getting the text lengths of substrings
	 * @param start the start index for the binary search
	 * @param end the end index for the binary search
	 * @param width the width of the svg container that holds the title
	 */
	protected getSubstringIndex(title: any, start: number, end: number, width: number): number {
		const mid = Math.floor((end + start) / 2)
		if (title.getSubStringLength(0, mid) > width) {
			return this.getSubstringIndex(title, start, mid, width)
		} else if (title.getSubStringLength(0, mid) < width) {
			if (title.getSubStringLength(0, mid + 1) > width) {
				return mid
			}
			return this.getSubstringIndex(title, mid, end, width)
		} else {
			return mid
		}
	}
}
