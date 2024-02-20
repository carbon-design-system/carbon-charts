import {
	curveLinearClosed,
	extent,
	lineRadial,
	max,
	min,
	scaleBand,
	scaleLinear,
	select,
	type Selection as D3Selection,
	type Transition
} from 'd3'
import { flatMapDeep, kebabCase, merge } from 'lodash-es'
import { getProperty } from '@/tools'
import { radar as radarConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events, ColorClassNameTypes, RenderTypes, Alignments } from '@/interfaces/enums'
import { Roles } from '@/interfaces/a11y'
import {
	Point,
	Angle,
	radialLabelPlacement,
	radToDeg,
	polarToCartesianCoords,
	distanceBetweenPointOnCircAndVerticalDiameter
} from '@/services/angle-utils'

export class Radar extends Component {
	type = 'radar'
	renderType = RenderTypes.SVG

	svg: SVGElement
	groupMapsTo: string
	uniqueKeys: string[]
	uniqueGroups: string[]
	fullDataNormalized: any
	groupedDataNormalized: any

	init() {
		const { events } = this.services
		// Highlight correct line legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate = true) {
		const svg = this.getComponentContainer()
		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		const data = this.model.getData()
		const groupedData = this.model.getGroupedData()

		const options = this.getOptions()

		const groupMapsTo = getProperty(options, 'data', 'groupMapsTo')
		const valueMapsTo = getProperty(options, 'radar', 'axes', 'value')

		const { angle, value } = getProperty(options, 'radar', 'axes')

		const { xLabelPadding, yLabelPadding, yTicksNumber, minRange, xAxisRectHeight } = radarConfigs

		this.uniqueKeys = Array.from(new Set(data.map((d: any) => d[angle])))
		this.uniqueGroups = Array.from(new Set(data.map((d: any) => d[groupMapsTo])))
		this.fullDataNormalized = this.normalizeFlatData(data)
		this.groupedDataNormalized = this.normalizeGroupedData(groupedData)

		const labelHeight = this.getLabelDimensions(this.uniqueKeys[0]).height
		const margin = 2 * (labelHeight + yLabelPadding)
		const size = Math.min(width, height)
		const diameter = size - margin
		const radius = diameter / 2

		if (radius <= 0) {
			return
		}

		// given a key, return the corresponding angle in radiants
		// rotated by -PI/2 because we want angle 0° at -y (12 o’clock)
		const xScale = scaleBand<string>()
			.domain(this.fullDataNormalized.map((d: any) => d[angle]))
			.range([0, 2 * Math.PI].map((a: number) => a - Math.PI / 2) as [Angle, Angle])

		const centerPointMinValue = min(this.fullDataNormalized.map((d: any) => d[value]) as number[])
		const yScale = scaleLinear()
			.domain([
				centerPointMinValue >= 0 ? 0 : centerPointMinValue,
				max(this.fullDataNormalized.map((d: any) => d[value]) as number[])
			])
			.range([minRange, radius])
			.nice(yTicksNumber)
		const yTicks = yScale.ticks(yTicksNumber)

		const colorScale = (group: string, key?: any, data?: any): string =>
			this.model.getFillColor(group, key, data)

		// constructs a new radial line generator
		// the angle accessor returns the angle in radians with 0° at -y (12 o’clock)
		// so map back the angle
		const radialLineGenerator = lineRadial<any>()
			.angle((d: any) => xScale(d[angle]) + Math.PI / 2)
			.radius((d: any) => yScale(d[value]))
			.curve(curveLinearClosed)

		// compute the space that each x label needs
		const horizSpaceNeededByEachXLabel = this.uniqueKeys.map((key: any) => {
			const tickWidth = this.getLabelDimensions(key).width
			// compute the distance between the point that the label rapresents and the vertical diameter
			const distanceFromDiameter = distanceBetweenPointOnCircAndVerticalDiameter(
				xScale(key),
				radius
			)
			// the space each label occupies is the sum of these two values
			return tickWidth + distanceFromDiameter
		})
		const leftPadding = max(horizSpaceNeededByEachXLabel)

		// center coordinates
		const c: Point = {
			x: leftPadding + xLabelPadding,
			y: height / 2
		}

		/////////////////////////////
		// Drawing the radar
		/////////////////////////////

		// y axes
		const yAxes = DOMUtils.appendOrSelect(svg, 'g.y-axes').attr('role', Roles.GROUP)
		const yAxisUpdate = yAxes.selectAll('path').data(yTicks, (tick: any) => tick)
		// for each tick, create array of data corresponding to the points composing the shape
		const shapeData = (tick: number) =>
			this.uniqueKeys.map((key: any) => ({ [angle]: key, [value]: tick }))
		yAxisUpdate.join(
			(enter: any) =>
				enter
					.append('path')
					.attr('opacity', 0)
					.attr('transform', `translate(${c.x}, ${c.y})`)
					.attr('fill', 'none')
					.call((selection: D3Selection<Element, any, Element, any>) =>
						selection
							/*
						 	BUG (D3): when "Radar - Missing datapoints" is displayed, the path that represents the third
							blob (shaded area for Water) generates a d="M0,-59L118.248,-38.421L29.879,41.125L-25.079,34.518LNaN,NaNZ"
							value because of the intentionally missing datapoint for the path (other paths have 5 points, this one has 4).
							In this case, D3 should generate a d="M0,-59L118.248,-38.421L29.879,41.125L-25.079,34.518". Because the path ends
							with "LNaN,NaNZ", browsers render the path up to that point creating the desired look but
							causing D3 to throw an error (that we cannot catch because it's async). The error fires on
							d3-transition/src/transition/attrTween.js:5 (but it's a long call-chain).
						*/
							.transition()
							.call((t: Transition<Element, any, Element, any>) =>
								this.services.transitions.setupTransition({
									transition: t,
									name: 'radar_y_axes_enter',
									animate
								})
							)
							.attr('opacity', 1)
							.attr('d', (tick: number) => radialLineGenerator(shapeData(tick)))
					),
			(update: any) =>
				update.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_y_axes_update',
								animate
							})
						)
						.attr('opacity', 1)
						.attr('transform', `translate(${c.x}, ${c.y})`)
						.attr('d', (tick: any) => radialLineGenerator(shapeData(tick)))
				),
			(exit: any) =>
				exit.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_y_axes_exit',
								animate
							})
						)
						.attr('d', (tick: any) => radialLineGenerator(shapeData(tick)))
						.attr('opacity', 0)
						.remove()
				)
		)

		// x axes
		const xAxes = DOMUtils.appendOrSelect(svg, 'g.x-axes').attr('role', Roles.GROUP)
		const xAxisUpdate = xAxes.selectAll('line').data(this.uniqueKeys, (key: any) => key)
		xAxisUpdate.join(
			(enter: any) =>
				enter
					.append('line')
					.attr('opacity', 0)
					.attr('class', (key: any) => `x-axis-${kebabCase(key)}`) // replace spaces with -
					.attr('stroke-dasharray', '0')
					.attr('x1', (key: any) => polarToCartesianCoords(xScale(key), 0, c).x)
					.attr('y1', (key: any) => polarToCartesianCoords(xScale(key), 0, c).y)
					.attr('x2', (key: any) => polarToCartesianCoords(xScale(key), 0, c).x)
					.attr('y2', (key: any) => polarToCartesianCoords(xScale(key), 0, c).y)
					.call((selection: any) =>
						selection
							.transition()
							.call((t: any) =>
								this.services.transitions.setupTransition({
									transition: t,
									name: 'radar_x_axes_enter',
									animate
								})
							)
							.attr('opacity', 1)
							.attr('x1', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[0], c).x)
							.attr('y1', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[0], c).y)
							.attr('x2', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[1], c).x)
							.attr('y2', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[1], c).y)
					),
			(update: any) =>
				update.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_x_axes_update',
								animate
							})
						)
						.attr('opacity', 1)
						.attr('x1', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[0], c).x)
						.attr('y1', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[0], c).y)
						.attr('x2', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[1], c).x)
						.attr('y2', (key: any) => polarToCartesianCoords(xScale(key), yScale.range()[1], c).y)
				),
			(exit: any) =>
				exit.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_x_axes_exit',
								animate
							})
						)
						.attr('opacity', 0)
						.remove()
				)
		)

		// x labels
		const xLabels = DOMUtils.appendOrSelect(svg, 'g.x-labels').attr('role', Roles.GROUP)
		const xLabelUpdate = xLabels.selectAll('text').data(this.uniqueKeys)
		xLabelUpdate.join(
			(enter: any) =>
				enter
					.append('text')
					.text((key: any) => key)
					.attr('opacity', 0)
					.attr(
						'x',
						(key: any) =>
							polarToCartesianCoords(xScale(key), yScale.range()[1] + xLabelPadding, c).x
					)
					.attr(
						'y',
						(key: any) =>
							polarToCartesianCoords(xScale(key), yScale.range()[1] + xLabelPadding, c).y
					)
					.style('text-anchor', (key: any) => radialLabelPlacement(xScale(key)).textAnchor)
					.style(
						'dominant-baseline',
						(key: any) => radialLabelPlacement(xScale(key)).dominantBaseline
					)
					.call((selection: any) =>
						selection
							.transition()
							.call((t: any) =>
								this.services.transitions.setupTransition({
									transition: t,
									name: 'radar_x_labels_enter',
									animate
								})
							)
							.attr('opacity', 1)
					),
			(update: any) =>
				update.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_x_labels_update',
								animate
							})
						)
						.attr('opacity', 1)
						.attr(
							'x',
							(key: any) =>
								polarToCartesianCoords(xScale(key), yScale.range()[1] + xLabelPadding, c).x
						)
						.attr(
							'y',
							(key: any) =>
								polarToCartesianCoords(xScale(key), yScale.range()[1] + xLabelPadding, c).y
						)
						.end()
						.finally(() => {
							// Align chart horizontally after x-axies has finished rendering
							const alignment = getProperty(options, 'radar', 'alignment')

							const alignmentXOffset = this.getAlignmentXOffset(alignment, svg, this.getParent())
							svg.attr('x', alignmentXOffset)
						})
				),
			(exit: any) =>
				exit.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_x_labels_exit',
								animate
							})
						)
						.attr('opacity', 0)
						.remove()
				)
		)

		// blobs
		const blobs = DOMUtils.appendOrSelect(svg, 'g.blobs').attr('role', Roles.GROUP)
		const blobUpdate = blobs
			.selectAll('path')
			.data(this.groupedDataNormalized, (group: any) => group.name)

		blobUpdate.join(
			(enter: any) =>
				enter
					.append('path')
					.attr('class', (group: any) =>
						this.model.getColorClassName({
							classNameTypes: [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE],
							dataGroupName: group.name,
							originalClassName: 'blob'
						})
					)
					.attr('role', Roles.GRAPHICS_SYMBOL)
					.attr('aria-label', (d: any) => d['name'])
					.attr('opacity', 0)
					.attr(
						'transform',
						animate
							? () => `translate(${c.x}, ${c.y}) scale(${1 + Math.random() * 0.35})`
							: `translate(${c.x}, ${c.y})`
					)
					.style('fill', (group: any) => colorScale(group.name, null, group.data))
					.style('fill-opacity', radarConfigs.opacity.selected)
					.style('stroke', (group: any) => colorScale(group.name, null, group.data))
					.call((selection: any) => {
						const selectionUpdate = selection.transition().call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_blobs_enter',
								animate
							})
						)

						if (animate) {
							selectionUpdate
								.delay(() => Math.random() * 30)
								.attr('transform', `translate(${c.x}, ${c.y})`)
						}

						selectionUpdate
							.attr('opacity', 1)
							.attr('d', (group: any) => radialLineGenerator(group.data))
					}),
			(update: any) => {
				update
					.attr('class', (group: any) =>
						this.model.getColorClassName({
							classNameTypes: [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE],
							dataGroupName: group.name,
							originalClassName: 'blob'
						})
					)
					.style('fill', (group: any) => colorScale(group.name, null, group.data))
					.style('stroke', (group: any) => colorScale(group.name, null, group.data))
				update.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_blobs_update',
								animate
							})
						)
						.attr('opacity', 1)
						.attr('transform', `translate(${c.x}, ${c.y})`)
						.attr('d', (group: any) => radialLineGenerator(group.data))
				)
				return update
			},
			(exit: any) =>
				exit.call((selection: any) => {
					const selectionUpdate = selection.transition().call((t: any) =>
						this.services.transitions.setupTransition({
							transition: t,
							name: 'radar_blobs_exit',
							animate
						})
					)

					if (animate) {
						selectionUpdate
							.delay(() => Math.random() * 30)
							.attr(
								'transform',
								() => `translate(${c.x}, ${c.y}) scale(${1 + Math.random() * 0.35})`
							)
					}

					selectionUpdate.attr('opacity', 0).remove()
				})
		)

		// data dots
		const dots = DOMUtils.appendOrSelect(svg, 'g.dots').attr('role', Roles.GROUP)

		const dotsUpdate = dots
			.selectAll('circle')
			// Filter out dots with no value so they are not rendered
			.data(this.fullDataNormalized.filter((d: any) => getProperty(d, value) !== null))

		dotsUpdate
			.join(
				(enter: any) =>
					enter
						.append('circle')
						.attr('role', Roles.GRAPHICS_SYMBOL)
						.attr('aria-label', (d: any) => d[valueMapsTo]),
				(update: any) => update,
				(exit: any) => exit.remove()
			)
			.attr('class', (d: any) =>
				this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d[groupMapsTo],
					originalClassName: kebabCase(d[angle])
				})
			)
			.attr('cx', (d: any) => polarToCartesianCoords(xScale(d[angle]), yScale(d[value]), c).x)
			.attr('cy', (d: any) => polarToCartesianCoords(xScale(d[angle]), yScale(d[value]), c).y)
			.attr('r', 0)
			.attr('opacity', 0)
			.style('fill', (d: any) => colorScale(d[groupMapsTo]))

		// rectangles
		const xAxesRect = DOMUtils.appendOrSelect(svg, 'g.x-axes-rect').attr('role', Roles.GROUP)
		const xAxisRectUpdate = xAxesRect.selectAll('rect').data(this.uniqueKeys)
		xAxisRectUpdate
			.join(
				(enter: any) => enter.append('rect'),
				(update: any) => update,
				(exit: any) => exit.remove()
			)
			.attr('x', c.x)
			.attr('y', c.y - xAxisRectHeight / 2)
			.attr('width', yScale.range()[1])
			.attr('height', xAxisRectHeight)
			.style('fill', 'red')
			.style('fill-opacity', 0)
			.attr('transform', (key: any) => `rotate(${radToDeg(xScale(key))}, ${c.x}, ${c.y})`)

		// y labels (show only the min and the max labels)
		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		const yLabels = DOMUtils.appendOrSelect(svg, 'g.y-labels').attr('role', Roles.GROUP)
		const yLabelUpdate = yLabels.selectAll('text').data(extent(yTicks))
		yLabelUpdate.join(
			(enter: any) =>
				enter
					.append('text')
					.attr('opacity', 0)
					.text((tick: any) => numberFormatter(tick, localeCode))
					.attr(
						'x',
						(tick: any) => polarToCartesianCoords(-Math.PI / 2, yScale(tick), c).x + yLabelPadding
					)
					.attr('y', (tick: any) => polarToCartesianCoords(-Math.PI / 2, yScale(tick), c).y)
					.style('text-anchor', 'start')
					.style('dominant-baseline', 'middle')
					.call((selection: any) =>
						selection
							.transition()
							.call((t: any) =>
								this.services.transitions.setupTransition({
									transition: t,
									name: 'radar_y_labels_enter',
									animate
								})
							)
							.attr('opacity', 1)
					),
			(update: any) =>
				update.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_y_labels_update',
								animate
							})
						)
						.text((tick: any) => tick)
						.attr('opacity', 1)
						.attr(
							'x',
							(tick: any) => polarToCartesianCoords(-Math.PI / 2, yScale(tick), c).x + yLabelPadding
						)
						.attr('y', (tick: any) => polarToCartesianCoords(-Math.PI / 2, yScale(tick), c).y)
				),
			(exit: any) =>
				exit.call((selection: any) =>
					selection
						.transition()
						.call((t: any) =>
							this.services.transitions.setupTransition({
								transition: t,
								name: 'radar_y_labels_exit',
								animate
							})
						)
						.attr('opacity', 0)
						.remove()
				)
		)

		// Add event listeners
		this.addEventListeners()
	}

	getAlignmentXOffset(alignment: any, svg: any, parent: any) {
		const svgDimensions = DOMUtils.getSVGElementSize(svg, {
			useBBox: true
		})
		const { width } = DOMUtils.getSVGElementSize(parent, {
			useAttrs: true
		})

		let alignmentOffset = 0
		if (alignment === Alignments.CENTER) {
			alignmentOffset = Math.floor((width - svgDimensions.width) / 2)
		} else if (alignment === Alignments.RIGHT) {
			alignmentOffset = width - svgDimensions.width
		}

		return alignmentOffset
	}

	// append temporarily the label to get the exact space that it occupies
	getLabelDimensions = (label: string) => {
		const tmpTick = DOMUtils.appendOrSelect(this.getComponentContainer(), `g.tmp-tick`)
		const tmpTickText = DOMUtils.appendOrSelect(tmpTick, `text`).text(label)
		const { width, height } = DOMUtils.getSVGElementSize(tmpTickText.node(), { useBBox: true })
		tmpTick.remove()
		return { width, height }
	}

	// Given a flat array of objects, if there are missing data on key,
	// creates corresponding data with value = null
	normalizeFlatData = (dataset: any) => {
		const options = this.getOptions()
		const { angle, value } = getProperty(options, 'radar', 'axes')
		const groupMapsTo = getProperty(options, 'data', 'groupMapsTo')
		const completeBlankData = flatMapDeep(
			this.uniqueKeys.map((key: any) => {
				return this.uniqueGroups.map(group => ({
					[angle]: key,
					[groupMapsTo]: group,
					[value]: null
				}))
			})
		)
		return merge(completeBlankData, dataset)
	}

	// Given a a grouped array of objects, if there are missing data on key,
	// creates corresponding data with value = null
	normalizeGroupedData = (dataset: any) => {
		const options = this.getOptions()
		const { angle, value } = getProperty(options, 'radar', 'axes')
		const groupMapsTo = getProperty(options, 'data', 'groupMapsTo')
		return dataset.map(({ name, data }: { name: any; data: any }) => {
			const completeBlankData = this.uniqueKeys.map((k: any) => ({
				[groupMapsTo]: name,
				[angle]: k,
				[value]: null
			}))
			return { name, data: merge(completeBlankData, data) }
		})
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail
		this.parent
			.selectAll('g.blobs path')
			.transition('legend-hover-blob')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-blob'
				})
			)
			.style('fill-opacity', (group: any) => {
				if (group.name !== hoveredElement.datum().name) {
					return radarConfigs.opacity.unselected
				}
				return radarConfigs.opacity.selected
			})
			.style('stroke-opacity', (group: any) => {
				if (group.name !== hoveredElement.datum().name) {
					return radarConfigs.opacity.unselected
				}
				return 1
			})
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('g.blobs path')
			.transition('legend-mouseout-blob')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-blob'
				})
			)
			.style('fill-opacity', radarConfigs.opacity.selected)
			.style('stroke-opacity', 1)
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('.x-axes-rect > rect')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
		// Remove legend listeners
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	addEventListeners() {
		const self = this
		const {
			axes: { angle }
		} = getProperty(this.getOptions(), 'radar')

		// events on x axes rects
		this.parent
			.selectAll('.x-axes-rect > rect')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Radar.X_AXIS_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})

				const axisLine = self.parent.select(`.x-axes .x-axis-${kebabCase(datum)}`)
				const dots = self.parent.selectAll(`.dots circle.${kebabCase(datum)}`)

				const activeDataGroupNames = self.model.getActiveDataGroupNames()

				const options = self.getOptions()
				const { groupMapsTo } = options.data
				const valueMapsTo = getProperty(options, 'radar', 'axes', 'value')

				// Change style
				axisLine.classed('hovered', true).attr('stroke-dasharray', '4 4')
				dots
					.classed('hovered', true)
					.attr('opacity', (d: any) =>
						activeDataGroupNames.indexOf(d[groupMapsTo]) !== -1 ? 1 : 0
					)
					.attr('r', radarConfigs.dotsRadius)

				// get the items that should be highlighted
				const itemsToHighlight = self.fullDataNormalized.filter(
					(d: any) => d[angle] === datum && activeDataGroupNames.indexOf(d[groupMapsTo]) !== -1
				)

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: itemsToHighlight
						.filter((d: any) => typeof d[valueMapsTo] === 'number')
						.map((d: any) => ({
							label: d[groupMapsTo],
							value: d[valueMapsTo],
							color: self.model.getFillColor(d[groupMapsTo], null, d),
							class: self.model.getColorClassName({
								classNameTypes: [ColorClassNameTypes.TOOLTIP],
								dataGroupName: d[groupMapsTo]
							})
						}))
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Radar.X_AXIS_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Radar.X_AXIS_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				const axisLine = self.parent.select(`.x-axes .x-axis-${kebabCase(datum)}`)
				const dots = self.parent.selectAll(`.dots circle.${kebabCase(datum)}`)

				// Change style
				axisLine.classed('hovered', false).attr('stroke-dasharray', '0')

				dots.classed('hovered', false).attr('opacity', 0).attr('r', 0)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Radar.X_AXIS_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE)
			})
	}
}
