import type { Selection as D3Selection } from 'd3'
import { getProperty } from '@/tools'
import { meter as meterConfigs } from '@/configuration'
import { Title } from './title'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { RenderTypes, Statuses } from '@/interfaces/enums'
import { MeterChartModel } from '@/model/meter'

export class MeterTitle extends Title {
	type = 'meter-title'
	renderType = RenderTypes.SVG

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = false) {
		const dataset = getProperty(this.model.getDisplayData(), 0)
		const options = this.getOptions()
		const svg = this.getComponentContainer()
		const { groupMapsTo } = options.data
		const meterTitle = options.locale.translations.meter.title
		const proportional = getProperty(options, 'meter', 'proportional')

		if (proportional) {
			this.displayTotal()
			this.displayBreakdownTitle()
		} else {
			// the title for a meter, is the label for that dataset
			const title = svg
				.selectAll('text.meter-title')
				.data(meterTitle ? [meterTitle] : [dataset[groupMapsTo]])
			title
				.enter()
				.append('text')
				.classed('meter-title', true)
				.merge(title as any)
				.attr('x', 0)
				.attr('y', '1em')
				.text((d: any) => d)

			title.exit().remove()

			// appends the associated percentage after title
			this.appendPercentage()
		}

		// if status ranges are provided (custom or default), display indicator
		this.displayStatus()

		// get the max width of a title (with consideration for the status/percentage)
		const maxWidth = this.getMaxTitleWidth()
		const titleElement = DOMUtils.appendOrSelect(svg, 'text.meter-title')

		if (maxWidth > 0 && titleElement.node().getComputedTextLength() > maxWidth) {
			this.truncateTitle(titleElement, maxWidth)
		}
	}

	displayBreakdownTitle() {
		const svg = this.getComponentContainer()
		const options = this.getOptions()
		const datasetsTotal = (this.model as MeterChartModel).getMaximumDomain(
			this.model.getDisplayData()
		)
		const total = getProperty(options, 'meter', 'proportional', 'total')
		const unit = getProperty(options, 'meter', 'proportional', 'unit')
			? getProperty(options, 'meter', 'proportional', 'unit')
			: ''

		let data
		if (datasetsTotal === total) {
			data = null
		} else {
			const difference = total !== null ? total - datasetsTotal : datasetsTotal
			//breakdownFormatter
			const breakdownFormatter = getProperty(options, 'meter', 'proportional', 'breakdownFormatter')
			const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
			data =
				breakdownFormatter !== null
					? breakdownFormatter({
							datasetsTotal: datasetsTotal,
							total: total
						})
					: `${numberFormatter(datasetsTotal, localeCode)} ${unit} used (${numberFormatter(difference, localeCode)} ${unit} available)`
		}

		// the breakdown part to whole of the datasets to the overall total
		const title = svg.selectAll('text.proportional-meter-title').data([data])

		title
			.enter()
			.append('text')
			.classed('proportional-meter-title', true)
			.merge(title as any)
			.attr('x', 0)
			.attr('y', '1em')
			.text((d: any) => d)

		title.exit().remove()

		const maxWidth = this.getMaxTitleWidth()
		const titleElement = DOMUtils.appendOrSelect(svg, 'text.proportional-meter-title')

		if (maxWidth > 0 && titleElement.node().getComputedTextLength() > maxWidth) {
			this.truncateTitle(titleElement, maxWidth)
		}
	}

	// show the total for prop meter
	displayTotal() {
		const svg = this.getComponentContainer()
		const options = this.getOptions()

		const total = getProperty(options, 'meter', 'proportional', 'total')

		const totalValue = total
			? getProperty(options, 'meter', 'proportional', 'total')
			: (this.model as MeterChartModel).getMaximumDomain(this.model.getDisplayData())

		const unit = getProperty(options, 'meter', 'proportional', 'unit')
			? getProperty(options, 'meter', 'proportional', 'unit')
			: ''

		// totalFormatter function
		const totalFormatter = getProperty(options, 'meter', 'proportional', 'totalFormatter')
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')

		const totalString =
			totalFormatter !== null
				? totalFormatter(totalValue)
				: `${numberFormatter(total, localeCode)} ${unit} total`

		const containerWidth = DOMUtils.getHTMLElementSize(this.parent.node() as HTMLElement).width

		const title = svg.selectAll('text.proportional-meter-total').data([totalString])

		title
			.enter()
			.append('text')
			.classed('proportional-meter-total', true)
			.merge(title as any)
			// Position the total text -24 pixels to add spacing between text and status icon (if status exists)
			.attr(
				'x',
				this.model.getStatus() && typeof containerWidth !== 'string'
					? containerWidth - meterConfigs.total.paddingRight
					: containerWidth
			)
			.attr('y', '1em')
			.attr('text-anchor', 'end')
			.text((d: any) => d)

		title.exit().remove()
	}

	/**
	 * Appends the corresponding status based on the value and the peak.
	 */
	displayStatus() {
		const self = this
		const svg = this.getComponentContainer()

		const containerWidth = DOMUtils.getHTMLElementSize(this.parent.node() as HTMLElement).width || 0

		// get the status from the model
		const status = this.model.getStatus()
		const radius = meterConfigs.status.indicatorSize / 2

		// create a group for the icon/inner path
		const statusGroup = DOMUtils.appendOrSelect(svg, `g.status-indicator`)
			.attr('class', status !== null ? `status-indicator status--${status}` : '')
			.attr('transform', `translate(${containerWidth - radius}, 0)`)

		const data = status ? [status] : []
		const icon = statusGroup.selectAll('circle.status').data(data) as D3Selection<
			SVGCircleElement,
			any,
			Element,
			any
		>

		icon
			.enter()
			.append('circle')
			.merge(icon)
			.attr('class', 'status')
			.attr('r', radius)
			.attr('cx', 0)
			.attr('cy', 8) // replaced `calc(1em / 2)` which is not an acceptable value for an SVG element's cy value

		const innerIcon = statusGroup.selectAll('path.innerFill').data(data)

		innerIcon
			.enter()
			.append('path')
			.merge(innerIcon as any)
			.attr('d', self.getStatusIconPathString(status))
			.attr('transform', `translate(-${radius}, 0)`)
			.attr('class', 'innerFill')

		innerIcon.exit().remove()
		icon.exit().remove()
	}

	/**
	 * Appends the associated percentage to the end of the title
	 */
	appendPercentage() {
		const dataValue = getProperty(this.model.getDisplayData(), 0, 'value')
		const { code: localeCode, number: numberFormatter } = getProperty(this.getOptions(), 'locale')
		// use the title's position to append the percentage to the end
		const svg = this.getComponentContainer()
		const title = DOMUtils.appendOrSelect(svg, 'text.meter-title')

		// check if it is enabled
		const data =
			getProperty(this.getOptions(), 'meter', 'statusBar', 'percentageIndicator', 'enabled') ===
			true
				? [dataValue]
				: []

		// append a percentage if it is enabled, update it
		const percentage = svg.selectAll('text.percent-value').data(data)

		// the horizontal offset of the percentage value from the title
		const offset = meterConfigs.statusBar.paddingRight

		percentage
			.enter()
			.append('text')
			.classed('percent-value', true)
			.merge(percentage as any)
			.text((d: any) => `${numberFormatter(d, localeCode)}%`)
			.attr('x', +title.attr('x') + title.node().getComputedTextLength() + offset) // set the position to after the title
			.attr('y', title.attr('y'))

		percentage.exit().remove()
	}

	/**
	 * Uses the parent class truncate logic
	 * @param title d3 selection of title element that will be truncated
	 * @param titlestring the original string that needs truncation
	 * @param maxWidth the max width the title can take
	 */
	truncateTitle(title: any, maxWidth: number) {
		super.truncateTitle(title, maxWidth)

		// update the position on the percentage to be inline with the title
		const tspan = DOMUtils.appendOrSelect(this.parent, 'tspan')
		const offset = meterConfigs.statusBar.paddingRight
		const tspanLength = Math.ceil(tspan.node().getComputedTextLength())

		const percentage = DOMUtils.appendOrSelect(this.parent, 'text.percent-value')
		percentage.attr(
			'x',
			+title.attr('x') + title.node().getComputedTextLength() + tspanLength + offset
		)
	}

	// computes the maximum space a title can take
	protected getMaxTitleWidth() {
		const proportional = getProperty(this.getOptions(), 'meter', 'proportional')

		const containerWidth = DOMUtils.getHTMLElementSize(this.parent.node() as HTMLElement).width

		if (proportional !== null) {
			const total = DOMUtils.appendOrSelect(this.parent, 'text.proportional-meter-total').node()

			const totalWidth = DOMUtils.getSVGElementSize(total, {
				useBBox: true
			}).width

			return containerWidth - totalWidth - meterConfigs.total.paddingLeft
		} else {
			const percentage = DOMUtils.appendOrSelect(this.parent, 'text.percent-value')
			// the title needs to fit the width of the container without crowding the status, and percentage value
			const offset = meterConfigs.statusBar.paddingRight
			const percentageWidth = percentage.node().getComputedTextLength()

			const statusGroup = DOMUtils.appendOrSelect(this.parent, 'g.status-indicator').node()
			const statusWidth =
				DOMUtils.getSVGElementSize(statusGroup, { useBBox: true }).width +
				meterConfigs.status.paddingLeft

			return containerWidth - percentageWidth - offset - statusWidth
		}
	}

	/**
	 * Get the associated status icon for the data
	 * @param status the active status for the meter chart
	 */
	protected getStatusIconPathString(status: Statuses) {
		switch (status) {
			case Statuses.SUCCESS:
				return 'M6.875 11.3125 3.75 8.1875 4.74375 7.25 6.875 9.34375 11.50625 4.75 12.5 5.7375 Z'
			case Statuses.DANGER:
				return 'M10.7 11.5 4.5 5.3 5.3 4.5 11.5 10.7 Z'
			case Statuses.WARNING:
				return 'M7.9375,11.125 C7.41973305,11.125 7,11.544733 7,12.0625 C7,12.580267 7.41973305,13 7.9375,13 C8.45526695,13 8.875,12.580267 8.875,12.0625 C8.875,11.544733 8.45526695,11.125 7.9375,11.125 M7.3125, 3 8.5625, 3 8.5625, 9.875 7.3125, 9.875, 7.3125, 3 Z'
		}
	}
}
