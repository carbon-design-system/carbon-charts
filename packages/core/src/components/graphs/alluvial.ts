import { select } from 'd3'
import {
	sankey as d3Sankey,
	sankeyLinkHorizontal,
	sankeyLeft,
	sankeyRight,
	sankeyJustify
} from 'd3-sankey'
import { debounce } from 'lodash-es'
import { getProperty, getTransformOffsets } from '@/tools'
import { alluvial as alluvialConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events, ColorClassNameTypes, RenderTypes, Alignments } from '@/interfaces/enums'

// BUG: Typing is not working for this.services.domUtils from the base class Component.
// DOMUtils is already imported directly to this module so why bother using this.services.domUtils?

export class Alluvial extends Component {
	type = 'alluvial'
	renderType = RenderTypes.SVG

	private graph: any
	gradient_id = 'gradient-id-' + Math.floor(Math.random() * 99999999999)

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		// svg and container widths
		const svg = this.getComponentContainer({ withinChartClip: true })
		svg.html('')

		const { width, height } = DOMUtils.getSVGElementSize(svg, {
			useAttrs: true
		})

		// Because of a Firefox bug with regards to sizing & d3 packs,
		// rather than checking if height or width aren't 0,
		// we have to make sure they're not smaller than 1
		if (width < 1 || height < 1) {
			return
		}
		const options = this.model.getOptions()
		const data = this.model.getDisplayData()

		// Is gradient enabled or not
		const isGradientAllowed: boolean = getProperty(
			this.getOptions(),
			'color',
			'gradient',
			'enabled'
		)

		// Set the custom node padding if provided
		let nodePadding = alluvialConfigs.minNodePadding
		if (options.alluvial.nodePadding > alluvialConfigs.minNodePadding) {
			nodePadding = options.alluvial.nodePadding
		}

		const alignment = getProperty(options, 'alluvial', 'nodeAlignment')

		let nodeAlignment = sankeyJustify

		if (alignment === Alignments.LEFT) {
			nodeAlignment = sankeyLeft
		} else if (alignment === Alignments.RIGHT) {
			nodeAlignment = sankeyRight
		}

		const sankey = d3Sankey()
			.nodeId((node: any) => node.name)
			.nodeWidth(alluvialConfigs.nodeWidth)
			// Distance nodes are apart from each other
			.nodePadding(nodePadding)
			// Alignment of nodes within chart
			.nodeAlign(nodeAlignment)
			// Size of the chart and its padding
			// Chart starts at 2 and ends at width - 2 so the outer nodes can expand from center
			// Chart starts from 30 so node categories can be displayed
			.extent([
				[2, 30],
				[width - 2, height]
			])

		// Construct a graph with the provided user data
		// Data must be deep cloned to ensure user passed data isn't deleted when themes change
		this.graph = sankey({
			nodes: options.alluvial.nodes.map((d: any) => Object.assign({}, d)),
			links: data.map((d: any) => Object.assign({}, d))
		})

		// Filter out unused nodes so they are not rendered
		this.graph.nodes = this.graph.nodes.filter((node: any) => node.value !== 0)

		// Determine the category name placement x position
		const nodeCoordinates: any = {}
		this.graph.nodes.forEach((element: any) => {
			const point = element.x0

			// Only 1 category per x-value
			if (element.category) {
				nodeCoordinates[point] = element?.category
			}
		})

		// Add node category text
		const alluvialCategory = svg
			.append('g')
			.classed('header-arrows', true)
			.selectAll('g')
			.data(Object.keys(nodeCoordinates))
			.join('g')
			.attr('transform', (d: any) => {
				return `translate(${d}, 0)`
			})

		// Add the category text
		alluvialCategory
			.append('text')
			.attr('id', (_: any, i: number) =>
				this.services.domUtils.generateElementIDString(`alluvial-category-${i}`)
			)
			.style('font-size', '14px')
			.text((d: any) => {
				if (nodeCoordinates[d]) {
					return nodeCoordinates[d]
				}
				return ''
			})
			.attr('y', 20)
			.attr('x', (d: any, i: number) => {
				const elementID = this.services.domUtils.generateElementIDString(
					`alluvial-category-${i}`
				) as string

				const { width: textWidth } = DOMUtils.getSVGElementSize(select(`text#${elementID}`), {
					useBBox: true
				})

				// Make the text on the left on node group (except first column)
				let x = 0
				if (d + x >= textWidth) {
					x = -textWidth + 4
				}
				return x
			})

		// Draws the links (Waves)
		const links = svg.append('g').attr('fill', 'none').selectAll('g').data(this.graph.links)

		// Exit so we can have multiple appends in group
		links.exit().remove()

		// Add gradient if requsted
		if (isGradientAllowed) {
			const scale = getProperty(this.getOptions(), 'color', 'scale')

			if (scale) {
				links
					.enter()
					.append('linearGradient')
					.attr('id', (d: any) => `${this.gradient_id}-link-${d.index}`)
					.attr('gradientUnits', 'userSpaceOnUse')
					.call((gradient: any) =>
						gradient
							.append('stop')
							.attr('offset', '0%')
							.attr('stop-color', (d: any) => {
								return scale[d.source.name]
							})
					)
					.call((gradient: any) =>
						gradient
							.append('stop')
							.attr('offset', '100%')
							.attr('stop-color', (d: any) => {
								return scale[d.target.name]
							})
					)
			}
			// Exit so path can be appended to the group
			links.exit().remove()
		}

		links
			.enter()
			.append('path')
			.classed('link', true)
			.attr('d', sankeyLinkHorizontal())
			.attr('id', (d: any) =>
				this.services.domUtils.generateElementIDString(`alluvial-line-${d.index}`)
			)
			.attr('class', (d: any) => {
				// Use a single color for the lines
				if (options.alluvial.monochrome) {
					return this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.STROKE],
						dataGroupName: 0,
						originalClassName: 'link'
					})
				}

				return this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: d.source.index,
					originalClassName: 'link'
				})
			})
			.style('stroke', (d: any) => {
				if (isGradientAllowed) {
					return `url(#${this.gradient_id}-link-${d.index})`
				}
				return this.model.getFillColor(d.source.name, null, {
					...d,
					source: d.source.name,
					target: d.target.name
				})
			})
			.attr('stroke-width', (d: any) => Math.max(1, d.width))
			.style('stroke-opacity', alluvialConfigs.opacity.default)
			.attr(
				'aria-label',
				(d: any) =>
					`${d.source.name} → ${d.target.name} (${d.value}${
						options.alluvial.units ? ' ' + options.alluvial.units : ''
					})`
			)

		// Creating the groups
		const node = svg
			.append('g')
			.selectAll('g')
			.data(this.graph.nodes)
			.enter()
			.append('g')
			.attr('id', (d: any) =>
				this.services.domUtils.generateElementIDString(`alluvial-node-${d.index}`)
			)
			.classed('node-group', true)
			.attr('transform', (d: any) => `translate(${d.x0}, ${d.y0})`)

		// Creating the nodes
		node
			.append('rect')
			.classed('node', true)
			.attr('height', (d: any) => d.y1 - d.y0)
			.attr('width', (d: any) => d.x1 - d.x0)
			.attr('fill', 'black')

		// Group to hold the text & rectangle background
		const textNode = node
			.append('g')
			.attr('id', (d: any) =>
				this.services.domUtils.generateElementIDString(`alluvial-node-title-${d.index}`)
			)

		const { code: localeCode, number: numberFormatter } = getProperty(options, 'locale')
		// Node title - text
		textNode
			.append('text')
			.attr('id', (d: any) =>
				this.services.domUtils.generateElementIDString(`alluvial-node-text-${d.index}`)
			)
			.attr('class', 'node-text')
			.style('font-size', '12px')
			.attr('text-anchor', 'start')
			.attr('fill', 'white')
			// Padding to text
			.attr('x', 4)
			// shift 13 pixels down to fit background container
			.attr('dy', 13)
			.text((d: any) => {
				return `${d.name} (${numberFormatter(d.value, localeCode)})`
			})
			.attr('aria-label', (d: any) => {
				return `${d.name} (${d.value})`
			})

		// Text background
		textNode
			.append('rect')
			.classed('node-text-bg', true)
			.attr('width', (_: any, i: number) => {
				const elementID = this.services.domUtils.generateElementIDString(
					`alluvial-node-text-${i}`
				) as string

				// Determine rectangle width based on text width
				const { width: textWidth } = DOMUtils.getSVGElementSize(select(`text#${elementID}`), {
					useBBox: true
				})

				return textWidth + 8
			})
			.attr('height', 18)
			.attr('stroke-width', 2)
			.lower()

		// Position group based on text width
		textNode.attr('transform', (d: any, i: number) => {
			const elementID = this.services.domUtils.generateElementIDString(
				`alluvial-node-text-${i}`
			) as string

			const { width: textWidth } = DOMUtils.getSVGElementSize(select(`text#${elementID}`), {
				useBBox: true
			})

			// Subtracting 9 since text background is 18 to center
			const y = (d.y1 - d.y0) / 2 - 9
			// Node width
			let x = d.x1 - d.x0

			// Display bars on the right instead of left of the node
			if (d.x1 >= textWidth) {
				// 16 = node width (4) + text container padding (8) + distance between node and text container (4)
				x = x - (textWidth + 16)
			} else {
				// Add padding to text containers
				x += 4
			}

			return `translate(${x}, ${y})`
		})

		this.addLineEventListener()
		this.addNodeEventListener()
	}

	addLineEventListener() {
		const options = this.getOptions()
		const self = this
		const { number: numberFormatter, code: localeCode } = getProperty(this.getOptions(), 'locale')

		// Set delay to counter flashy behaviour
		const debouncedLineHighlight = debounce((link, event = 'mouseover') => {
			const allLinks = self.parent
				.selectAll('path.link')
				.transition()
				.call((t: any) =>
					self.services.transitions.setupTransition({
						transition: t,
						name: 'alluvial-links-mouse-highlight'
					})
				)

			if (event === 'mouseout') {
				select(link).lower()
				allLinks.style('stroke-opacity', alluvialConfigs.opacity.default)
			} else {
				allLinks.style('stroke-opacity', function () {
					// highlight and raise if link is this
					if (link === this) {
						select(this).raise()
						return alluvialConfigs.opacity.selected
					}

					return alluvialConfigs.opacity.unfocus
				})
			}
		}, 33)

		this.parent
			.selectAll('path.link')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				debouncedLineHighlight(this, 'mouseover')
				hoveredElement.classed('link-hovered', true)

				const strokeColor = getComputedStyle(this as Element).getPropertyValue('stroke')

				// Dispatch mouse over event
				self.services.events.dispatchEvent(Events.Alluvial.LINE_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})

				// Dispatch tooltip show event
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					event,
					hoveredElement,
					items: [
						{
							label: datum.target.name,
							value:
								(numberFormatter(datum.value, localeCode)
									? `${numberFormatter(datum.value, localeCode)}`
									: '-') + (options.alluvial.units ? ` ${options.alluvial.units}` : ''),
							color: strokeColor,
							labelIcon: self.getRightArrowIcon()
						}
					]
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(Events.Alluvial.LINE_MOUSEMOVE, {
					event,
					element: select(this),
					datum
				})
				// Dispatch tooltip move event
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse click event
				self.services.events.dispatchEvent(Events.Alluvial.LINE_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				debouncedLineHighlight(this, 'mouseout')
				hoveredElement.classed('link-hovered', false)

				// Dispatch mouse out event
				self.services.events.dispatchEvent(Events.Alluvial.LINE_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Dispatch hide tooltip event
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					event,
					hoveredElement
				})
			})
	}

	addNodeEventListener() {
		const self = this

		// Set delay to counter flashy behaviour
		const debouncedLineHighlight = debounce((links = [], event = 'mouseover') => {
			if (event === 'mouseout' || links.length === 0) {
				// set all links to default opacity & corret link order
				self.parent
					.selectAll('path.link')
					.classed('link-hovered', false)
					.data(this.graph.links, (d: any) => d.index)
					.order()
					.style('stroke-opacity', alluvialConfigs.opacity.default)

				return
			}

			// Highlight all nodes
			const allLinks = self.parent
				.selectAll('path.link')
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'alluvial-link-mouse-highlight'
					})
				)

			allLinks.style('stroke-opacity', function (d: any) {
				// Raise the links & increase stroke-opacity to selected
				if (links.some((element: any) => element === d.index)) {
					select(this).classed('link-hovered', true).raise()
					return alluvialConfigs.opacity.selected
				}

				return alluvialConfigs.opacity.unfocus
			})
		}, 66)

		self.parent
			.selectAll('.node-group')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Highlight all links that pass through node
				const paths: any[] = []

				// Outgoing links
				self.traverse({ link: 'sourceLinks', node: 'target' }, datum, paths)

				//Incoming links
				self.traverse({ link: 'targetLinks', node: 'source' }, datum, paths)

				// Highlight all linked lines in the graph data structure
				if (paths.length) {
					// Get transformation value of node
					const nodeMatrix = getTransformOffsets(hoveredElement.attr('transform'))

					// Move node to the left by 2 to grow node from the center
					hoveredElement.attr('transform', `translate(${nodeMatrix.x - 2}, ${nodeMatrix.y})`)

					hoveredElement.classed('node-hovered', true).selectAll('rect.node').attr('width', 8)

					// Translate first column text container to the
					// right so it doesn't clash with expanding node
					if (datum.x0 - 2 === 0) {
						const elementID = self.services.domUtils.generateElementIDString(
							`alluvial-node-title-${datum.index}`
						)

						const titleContainer = self.parent.select(`g#${elementID}`)
						const titleMatrix = getTransformOffsets(titleContainer.attr('transform'))

						titleContainer.attr('transform', `translate(${titleMatrix.x + 4},${titleMatrix.y})`)
					}

					const elementID = self.services.domUtils.generateElementIDString(
						`alluvial-node-text-${datum.index}`
					)

					self.parent.select(`text#${elementID}`).style('font-weight', 'bold')

					debouncedLineHighlight(paths, 'mouseover')

					// Dispatch mouse over event
					self.services.events.dispatchEvent(Events.Alluvial.NODE_MOUSEOVER, {
						event,
						element: hoveredElement,
						datum
					})
				}
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				// Dispatch mouse move event
				self.services.events.dispatchEvent(Events.Alluvial.NODE_MOUSEMOVE, {
					event,
					element: select(this),
					datum
				})

				// Dispatch tooltip move event
				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				// Dispatch mouse click event
				self.services.events.dispatchEvent(Events.Alluvial.NODE_CLICK, {
					event,
					element: select(this),
					datum
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Set the node position to initial state (unexpanded)
				const nodeMatrix = getTransformOffsets(hoveredElement.attr('transform'))

				hoveredElement
					.classed('node-hovered', false)
					.attr('transform', `translate(${nodeMatrix.x + 2}, ${nodeMatrix.y})`)
					.select('rect.node')
					.attr('width', alluvialConfigs.nodeWidth)

				// Translate text container back to initial state
				if (datum.x0 - 2 === 0) {
					const elementID = self.services.domUtils.generateElementIDString(
						`alluvial-node-title-${datum.index}`
					)

					const titleContainer = self.parent.select(`g#${elementID}`)
					const titleMatrix = getTransformOffsets(titleContainer.attr('transform'))

					titleContainer.attr('transform', `translate(${titleMatrix.x - 4},${titleMatrix.y})`)
				}

				const elementID = self.services.domUtils.generateElementIDString(
					`alluvial-node-text-${datum.index}`
				)

				self.parent.select(`text#${elementID}`).style('font-weight', 'normal')

				debouncedLineHighlight([], 'mouseout')

				// Dispatch mouse out event
				self.services.events.dispatchEvent(Events.Alluvial.NODE_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Dispatch hide tooltip event
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				})
			})
	}

	// Traverse graph and get all connected links to node
	private traverse(
		direction: { link: 'sourceLinks'; node: 'target' } | { link: 'targetLinks'; node: 'source' },
		node: any,
		visited: any[] = []
	) {
		const links = node[direction.link].map((element: any) => {
			visited.push(element.index)
			return element[direction.node]
		})

		// Retrieve the child nodes
		links.forEach((element: any) => this.traverse(direction, element, visited))
	}

	getRightArrowIcon() {
		return `
		<svg xmlns="http://www.w3.org/2000/svg" class="arrow-right" width="32" height="32" viewBox="0 0 32 32">
			<polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"/>
			<rect width="32" height="32"/>
		</svg>`
	}

	// Remove event listeners
	destroy() {
		this.parent
			.selectAll('path.line,.node-group')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('click', null)
			.on('mouseout', null)
	}
}
