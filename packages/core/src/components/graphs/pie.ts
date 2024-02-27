import { arc, interpolate, pie, select } from 'd3'
import { convertValueToPercentage, getProperty } from '@/tools'
import { pie as pieConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import {
	CalloutDirections,
	Events,
	Alignments,
	ColorClassNameTypes,
	RenderTypes
} from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'

// Pie slice tween function
function arcTween(a: any, arcFunc: any) {
	const i = interpolate(this._current, a)

	return (t: any) => {
		this._current = i(t)
		return arcFunc(this._current)
	}
}

export class Pie extends Component {
	type = 'pie'
	renderType = RenderTypes.SVG

	// We need to store our arcs
	// So that addEventListeners()
	// Can access them
	arc: any
	hoverArc: any

	init() {
		const eventsFragment = this.services.events

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	getInnerRadius() {
		return pieConfigs.innerRadius
	}

	render(animate = true) {
		const self = this
		const svg = this.getComponentContainer()

		const options = this.getOptions()
		const { groupMapsTo } = options.data
		const { valueMapsTo } = options.pie

		// remove any slices that are valued at 0 because they dont need to be rendered and will create extra padding
		const displayData = this.model.getDisplayData().filter((data: any) => data[valueMapsTo] > 0)

		// Compute the outer radius needed
		const radius = this.computeRadius()

		this.arc = arc().innerRadius(this.getInnerRadius()).outerRadius(radius)

		// Set the hover arc radius
		this.hoverArc = arc()
			.innerRadius(this.getInnerRadius())
			.outerRadius(radius + pieConfigs.hoverArc.outerRadiusOffset)

		// Setup the pie layout
		const pieLayout = pie()
			.value((d: any) => d[valueMapsTo])
			.sort(getProperty(options, 'pie', 'sortFunction'))
			.padAngle(pieConfigs.padAngle)

		// Add data to pie layout
		const pieLayoutData = pieLayout(displayData)

		// Update data on all slices
		const slicesGroup = DOMUtils.appendOrSelect(svg, 'g.slices')
			.attr('role', Roles.GROUP)
			.attr('data-name', 'slices')

		const paths = slicesGroup
			.selectAll('path.slice')
			.data(pieLayoutData, (d: any) => d.data[groupMapsTo])

		// Remove slices that need to be exited
		paths.exit().attr('opacity', 0).remove()

		// Add new slices that are being introduced
		const enteringPaths = paths.enter().append('path').classed('slice', true).attr('opacity', 0)

		// Update styles & position on existing and entering slices
		const allPaths = enteringPaths
			.merge(paths as any)
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d.data[groupMapsTo],
					originalClassName: 'slice'
				})
			)
			.style('fill', (d: any) => self.model.getFillColor(d.data[groupMapsTo], null, d.data))
			.attr('d', this.arc)

		allPaths
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'pie_slice_enter_update',
					animate
				})
			)
			.attr('opacity', 1)
			// a11y
			.attr('role', Roles.GRAPHICS_SYMBOL)
			.attr('aria-roledescription', 'slice')
			.attr(
				'aria-label',
				(d: any) =>
					`${d[valueMapsTo]}, ${
						convertValueToPercentage(d.data[valueMapsTo], displayData, valueMapsTo) + '%'
					}`
			)
			// Tween
			.attrTween('d', function (a: any) {
				return arcTween.bind(this)(a, self.arc)
			})

		// Draw the slice labels
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		const renderLabels = options.pie.labels.enabled
		const labelData = renderLabels
			? pieLayoutData.filter(x => (x.data as any)[valueMapsTo] > 0)
			: []
		const labelsGroup = DOMUtils.appendOrSelect(svg, 'g.labels')
			.attr('role', Roles.GROUP)
			.attr('data-name', 'labels')

		const labels = labelsGroup
			.selectAll('text.pie-label')
			.data(labelData, (d: any) => d.data[groupMapsTo])

		// Remove labels that are existing
		labels.exit().attr('opacity', 0).remove()

		// Add labels that are being introduced
		const enteringLabels = labels.enter().append('text').classed('pie-label', true)

		// Update styles & position on existing & entering labels
		const calloutData: any[] = []
		enteringLabels
			.merge(labels as any)
			.style('text-anchor', 'middle')
			.text((d: any) => {
				if (options.pie.labels.formatter) {
					return options.pie.labels.formatter({
						...d,
						percentageValue: convertValueToPercentage(
							d.data[valueMapsTo],
							displayData,
							valueMapsTo,
							true
						)
					})
				}
				return (
					numberFormatter(
						convertValueToPercentage(d.data[valueMapsTo], displayData, valueMapsTo),
						localeCode
					) + '%'
				)
			})
			// Calculate dimensions in order to transform
			.datum(function (d: any) {
				const marginedRadius = radius + 7

				const theta = (d.endAngle - d.startAngle) / 2 + d.startAngle
				const deg = (theta / Math.PI) * 180

				const textLength = this.getComputedTextLength()
				d.textOffsetX = textLength / 2
				d.textOffsetY = deg > 90 && deg < 270 ? 10 : 0

				d.xPosition = (d.textOffsetX + marginedRadius) * Math.sin(theta)
				d.yPosition = (d.textOffsetY + marginedRadius) * -Math.cos(theta)

				return d
			})
			.attr('transform', function (d: any, i: number) {
				const totalSlices = labelData.length
				const sliceAngleDeg = (d.endAngle - d.startAngle) * (180 / Math.PI)

				// check if last 2 slices (or just last) are < the threshold
				if (i >= totalSlices - 2) {
					if (sliceAngleDeg < pieConfigs.callout.minSliceDegree) {
						let labelTranslateX, labelTranslateY
						if (d.index === totalSlices - 1) {
							labelTranslateX =
								d.xPosition +
								pieConfigs.callout.offsetX +
								pieConfigs.callout.textMargin +
								d.textOffsetX
							labelTranslateY = d.yPosition - pieConfigs.callout.offsetY

							// Set direction of callout
							d.direction = CalloutDirections.RIGHT
							calloutData.push(d)
						} else {
							labelTranslateX =
								d.xPosition -
								pieConfigs.callout.offsetX -
								d.textOffsetX -
								pieConfigs.callout.textMargin
							labelTranslateY = d.yPosition - pieConfigs.callout.offsetY

							// Set direction of callout
							d.direction = CalloutDirections.LEFT
							calloutData.push(d)
						}

						return `translate(${labelTranslateX}, ${labelTranslateY})`
					}
				}

				return `translate(${d.xPosition}, ${d.yPosition})`
			})

		// Render pie label callouts
		this.renderCallouts(calloutData)

		const optionName = getProperty(options, 'donut') ? 'donut' : 'pie'
		const alignment = getProperty(options, optionName, 'alignment')

		const { width } = DOMUtils.getSVGElementSize(this.getParent() as any, {
			useAttrs: true
		})

		// don't add padding for labels & callouts if they are disabled
		const xOffset = renderLabels ? pieConfigs.xOffset : 0
		const yOffset = renderLabels ? pieConfigs.yOffset : 0

		// Position Pie
		let pieTranslateX = radius + xOffset
		if (alignment === Alignments.CENTER) {
			pieTranslateX = width / 2
		} else if (alignment === Alignments.RIGHT) {
			pieTranslateX = width - radius - pieConfigs.xOffset
		}

		let pieTranslateY = radius + yOffset
		if (calloutData.length > 0) {
			pieTranslateY += pieConfigs.yOffsetCallout
		}

		svg.attr('x', pieTranslateX + 7).attr('y', pieTranslateY)

		// Add event listeners
		this.addEventListeners()
	}

	renderCallouts(calloutData: any[]) {
		const svg = DOMUtils.appendOrSelect(this.getComponentContainer(), 'g.callouts')
			.attr('role', Roles.GROUP)
			.attr('data-name', 'callouts')

		// Update data on callouts
		const callouts = svg.selectAll('g.callout').data(calloutData)

		callouts.exit().remove()

		const enteringCallouts = callouts
			.enter()
			.append('g')
			.classed('callout', true)
			// a11y
			.attr('role', Roles.GROUP)
			.attr('aria-roledescription', 'label callout')

		// Update data values for each callout
		// For the horizontal and vertical lines to use
		enteringCallouts.merge(callouts as any).datum(function (d: any) {
			const { xPosition, yPosition, direction } = d

			if (direction === CalloutDirections.RIGHT) {
				d.startPos = {
					x: xPosition,
					y: yPosition + d.textOffsetY
				}

				// end position for the callout line
				d.endPos = {
					x: xPosition + pieConfigs.callout.offsetX,
					y: yPosition - pieConfigs.callout.offsetY + d.textOffsetY
				}

				// the intersection point of the vertical and horizontal line
				d.intersectPointX = d.endPos.x - pieConfigs.callout.horizontalLineLength
			} else {
				// start position for the callout line
				d.startPos = {
					x: xPosition,
					y: yPosition + d.textOffsetY
				}

				// end position for the callout line should be bottom aligned to the title
				d.endPos = {
					x: xPosition - pieConfigs.callout.offsetX,
					y: yPosition - pieConfigs.callout.offsetY + d.textOffsetY
				}

				// the intersection point of the vertical and horizontal line
				d.intersectPointX = d.endPos.x + pieConfigs.callout.horizontalLineLength
			}

			// Store the necessary data in the DOM element
			return d
		})

		// draw vertical line
		const enteringVerticalLines = enteringCallouts.append('line').classed('vertical-line', true)

		enteringVerticalLines
			.merge(svg.selectAll('line.vertical-line'))
			.datum(function () {
				return select(this.parentNode as any).datum()
			})
			.style('stroke-width', '1px')
			.attr('x1', (d: any) => d.startPos.x)
			.attr('y1', (d: any) => d.startPos.y)
			.attr('x2', (d: any) => d.intersectPointX)
			.attr('y2', (d: any) => d.endPos.y)

		// draw horizontal line
		const enteringHorizontalLines = enteringCallouts.append('line').classed('horizontal-line', true)

		enteringHorizontalLines
			.merge(svg.selectAll('line.horizontal-line'))
			.datum(function () {
				return select(this.parentNode as any).datum()
			})
			.style('stroke-width', '1px')
			.attr('x1', (d: any) => d.intersectPointX)
			.attr('y1', (d: any) => d.endPos.y)
			.attr('x2', (d: any) => d.endPos.x)
			.attr('y2', (d: any) => d.endPos.y)
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail
		const { groupMapsTo } = this.getOptions().data

		this.parent
			.selectAll('path.slice')
			.transition('legend-hover-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-bar'
				})
			)
			.attr('opacity', (d: any) =>
				d.data[groupMapsTo] !== hoveredElement.datum()['name'] ? 0.3 : 1
			)
	}

	// Un-highlight all elements
	handleLegendMouseOut = () => {
		this.parent
			.selectAll('path.slice')
			.transition('legend-mouseout-bar')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-bar'
				})
			)
			.attr('opacity', 1)
	}

	addEventListeners() {
		const self = this
		this.parent
			.selectAll('path.slice')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				hoveredElement
					.classed('hovered', true)
					.transition('pie_slice_mouseover')
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'pie_slice_mouseover'
						})
					)
					.attr('d', self.hoverArc)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOVER, {
					event,
					element: select(this),
					datum
				})

				const { groupMapsTo } = self.getOptions().data
				const { valueMapsTo } = self.getOptions().pie
				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: datum.data[groupMapsTo],
							value: datum.data[valueMapsTo]
						}
					]
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement
					.classed('hovered', false)
					.transition('pie_slice_mouseout')
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'pie_slice_mouseout'
						})
					)
					.attr('d', self.arc)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Pie.SLICE_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				})
			})
	}

	// Helper functions
	protected computeRadius() {
		const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
			useAttrs: true
		})

		const options = this.getOptions()
		const radius: number = Math.min(width, height) / 2
		const renderLabels = options.pie.labels.enabled

		return renderLabels ? radius + pieConfigs.radiusOffset : radius
	}
}
