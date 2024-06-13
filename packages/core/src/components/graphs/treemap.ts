import { color as d3Color, hierarchy as d3Hierarchy, hsl, treemap as d3Treemap, select } from 'd3'
import { colors } from '@carbon/colors'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events, ColorClassNameTypes, RenderTypes } from '@/interfaces/enums'

const findColorShade = (hex: string) => {
	if (!hex) {
		return null
	}

	for (const colorName of Object.keys(colors)) {
		const colorShades = colors[colorName as keyof typeof colors]

		for (const colorShadeLevel of Object.keys(colorShades)) {
			const colorShade = colorShades[+colorShadeLevel]

			if (colorShade === hex) {
				return colorShadeLevel
			}
		}
	}

	return null
}

const textFillColor = function () {
	const correspondingLeaf = select(this.parentNode).select('rect.leaf') as any
	const correspondingLeafFill = getComputedStyle(correspondingLeaf.node(), null).getPropertyValue(
		'fill'
	)
	const cl = d3Color(correspondingLeafFill) as any

	let colorShade: any
	if (cl) {
		colorShade = findColorShade(cl ? cl.hex() : null)
	}

	if (colorShade === null || colorShade === undefined) {
		const lightness = hsl(cl).l
		colorShade = Math.abs(lightness * 100 - 100)
	}

	return colorShade > 50 ? 'white' : 'black'
}

let uidCounter = 0
export class Treemap extends Component {
	type = 'treemap'
	renderType = RenderTypes.SVG

	init() {
		const { events } = this.services
		// Highlight correct circle on legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		// Un-highlight circles on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	render(animate = true) {
		const svg = this.getComponentContainer()

		this.model.getData()
		const displayData = this.model.getDisplayData()
		const options = this.model.getOptions()

		const windowLocation = getProperty(window, 'location')

		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		const hierarchy = d3Hierarchy({
			name: options.title || 'Treemap',
			children: displayData
		})
			.sum((d: any) => d.value)
			.sort((a, b) => b.value - a.value)

		const root = d3Treemap().size([width, height]).paddingInner(1).paddingOuter(0).round(true)(
			hierarchy
		)

		const leafGroups = svg
			.selectAll("g[data-name='leaf']")
			.data(root.leaves(), (leaf: any) => leaf.data.name)

		// Remove leaf groups that need to be removed
		leafGroups.exit().attr('opacity', 0).remove()

		// Add the leaf groups that need to be introduced
		const enteringLeafGroups = leafGroups
			.enter()
			.append('g')
			.attr('data-name', 'leaf')
			.attr('data-uid', () => uidCounter++)

		const allLeafGroups = enteringLeafGroups.merge(leafGroups as any)

		allLeafGroups
			.attr('data-name', 'leaf')
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'treemap-group-update',
					animate
				})
			)
			.attr('transform', (d: any) => `translate(${d.x0},${d.y0})`)

		const rects = allLeafGroups.selectAll('rect.leaf').data((d: any) => [d])

		rects.exit().attr('width', 0).attr('height', 0).remove()

		const enteringRects = rects.enter().append('rect').classed('leaf', true)

		enteringRects
			.merge(rects as any)
			.attr('width', 0)
			.attr('height', 0)
			.attr('id', function () {
				const uid: any = select(this.parentNode as any).attr('data-uid')
				return `${options.style.prefix}-leaf-${uid}`
			})
			.attr('class', (d: any) => {
				while (d.depth > 1) d = d.parent

				return this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL],
					dataGroupName: d.data.name,
					originalClassName: 'leaf'
				})
			})
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'treemap-leaf-update-enter',
					animate
				})
			)
			.attr('width', (d: any) => d.x1 - d.x0)
			.attr('height', (d: any) => d.y1 - d.y0)
			.style('fill', (d: any) => {
				while (d.depth > 1) d = d.parent
				return this.model.getFillColor(d.data.name, null, d.data)
			})

		// Update all clip paths
		allLeafGroups
			.selectAll('clipPath')
			.data(
				(d: any) => {
					if (d.data.showLabel !== true) {
						return []
					}

					return [1]
				},
				(d: any) => d
			)
			.join(
				(enter: any) => {
					return enter
						.append('clipPath')
						.attr('id', function () {
							const uid = select(this.parentNode).attr('data-uid')
							return `${options.style.prefix}-clip-${uid}`
						})
						.append('use')
						.attr('xlink:href', function () {
							const uid = select(this.parentNode.parentNode).attr('data-uid')
							const leafID = `${options.style.prefix}-leaf-${uid}`

							return new URL(`#${leafID}`, windowLocation) + ''
						})
				},
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				(update: any) => null as any,
				(exit: any) => exit.remove()
			)

		// Update all titles
		allLeafGroups
			.selectAll('text')
			.data(
				(d: any) => {
					if (d.data.showLabel !== true) {
						return []
					}

					let parent = d
					while (parent.depth > 1) parent = parent.parent
					const color = hsl(this.model.getFillColor(parent.data.name))
					return [
						{
							text: d.data.name,
							color: color.l < 0.5 ? 'white' : 'black'
						}
					]
				},
				(d: any) => d
			)
			.join(
				(enter: any) => {
					const addedText = enter
						.append('text')
						.text((d: any) => d.text)
						.style('fill', textFillColor)
						.attr('x', 7)
						.attr('y', 18)

					if (windowLocation) {
						addedText.attr('clip-path', function () {
							const uid = select(this.parentNode).attr('data-uid')
							const clipPathID = `${options.style.prefix}-clip-${uid}`

							return `url(${new URL(`#${clipPathID}`, windowLocation) + ''})`
						})
					}
					return addedText
				},
				(update: any) => update.text((d: any) => d.text).style('fill', textFillColor),
				(exit: any) => exit.remove()
			)

		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	addEventListeners() {
		const self = this
		this.parent
			.selectAll('rect.leaf')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				let fillColor = getComputedStyle(this as Element, null).getPropertyValue('fill')

				let parent = datum
				while (parent.depth > 1) parent = parent.parent

				hoveredElement
					.transition('graph_element_mouseover_fill_update')
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'graph_element_mouseover_fill_update'
						})
					)
					.style('fill', (d: any) => {
						const customColor = self.model.getFillColor(d.parent.data.name, null, d.data)
						if (customColor) {
							fillColor = customColor
						}
						return d3Color(fillColor).darker(0.7).toString()
					})

				// Show tooltip
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							color: fillColor,
							label: parent.data.name,
							bold: true
						},
						{
							label: datum.data.name,
							value: datum.data.value
						}
					]
				})

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Treemap.LEAF_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Treemap.LEAF_MOUSEMOVE, {
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
				self.services.events.dispatchEvent(Events.Treemap.LEAF_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', false)

				let parent = datum
				while (parent.depth > 1) parent = parent.parent

				hoveredElement
					.transition()
					.call((t: any) =>
						self.services.transitions.setupTransition({
							transition: t,
							name: 'graph_element_mouseout_fill_update'
						})
					)
					.style('fill', (d: any) => self.model.getFillColor(d.parent.data.name, null, d.data))

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Treemap.LEAF_MOUSEOUT, {
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

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		this.parent
			.selectAll("g[data-name='leaf']")
			.transition('legend-hover-treemap')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-treemap'
				})
			)
			.attr('opacity', (d: any) =>
				d.parent.data.name === hoveredElement.datum()['name'] ? 1 : 0.3
			)
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll("g[data-name='leaf']")
			.transition('legend-mouseout-treemap')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-treemap'
				})
			)
			.attr('opacity', 1)
	}
}
