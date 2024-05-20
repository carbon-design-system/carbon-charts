import { cluster as d3Cluster, tree as d3Tree, hierarchy, linkHorizontal, select } from 'd3'
import { getProperty } from '@/tools'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { Events, RenderTypes, TreeTypes } from '@/interfaces/enums'
import type { Coordinates } from '@/interfaces/layout'

const NODE_OFFSET = 6

export class Tree extends Component {
	type = 'tree'
	renderType = RenderTypes.SVG

	getLongestLabel(data: any) {
		let longestLabel = ''
		data.forEach((d: any) => {
			const longestLabelInChildren = d.children ? this.getLongestLabel(d.children) : ''
			if (
				longestLabelInChildren.length > longestLabel.length ||
				d.name.length > longestLabel.length
			) {
				longestLabel =
					longestLabelInChildren.length > d.name.length ? longestLabelInChildren : d.name
			}
		})

		return longestLabel
	}

	getMockLabelWidth(svg: any, label: string) {
		// Add mock label to get dimensions
		const mockLabel = svg
			.append('text')
			.attr('dy', '0.31em')
			.attr('x', 0)
			.attr('text-anchor', 'end')
			.text(label)

		// Get the mock label width
		const { width: mockLabelWidth } = DOMUtils.getSVGElementSize(mockLabel.node(), {
			useBBox: true
		})

		// Remove the mock title label
		mockLabel.remove()

		return mockLabelWidth
	}

	render(animate = true) {
		const svg = this.getComponentContainer()

		// Empty out the svg before rendering the tree
		svg.html('')

		const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
			useAttrs: true
		})

		if (width < 1 || height < 1) {
			return
		}

		const options = this.model.getOptions()
		const displayData = this.model.getDisplayData()

		const rootTitle = getProperty(options, 'tree', 'rootTitle') || 'Tree'

		const mockRootTitleWidth = this.getMockLabelWidth(svg, rootTitle)

		const longestLabel = this.getLongestLabel(displayData)
		const mockLongestLabelWidth = this.getMockLabelWidth(svg, longestLabel)

		const margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: mockRootTitleWidth > 0 ? mockRootTitleWidth + NODE_OFFSET : 30 - NODE_OFFSET
		}
		const root = hierarchy({
			name: rootTitle,
			children: displayData
		}) as any

		const dx = 10
		const dy = width / 6

		const update = (source: Coordinates) => {
			const nodes = root.descendants().reverse()
			const links = root.links()

			let left = root
			let right = root
			root.eachBefore((node: Coordinates) => {
				if (node.x < left.x) left = node
				if (node.x > right.x) right = node
			})

			const updateHeight = right.x - left.x

			const transition = svg
				.transition()
				.call((t: any) =>
					this.services.transitions.setupTransition({
						transition: t,
						name: 'tree-update-viewbox',
						animate: true
					})
				)
				.attr('viewBox', [-margin.left, left.x, width, updateHeight].join(' ')) // viewBox expects a delimited string

			// Update data on nodes
			const nodeGroups = nodeGroup.selectAll('g').data(nodes, (d: any) => d.id)

			const self = this
			// Add any entering nodes
			const nodeGroupsEnter = nodeGroups
				.enter()
				.append('g')
				.attr('transform', () => `translate(${source.y0},${source.x0})`)
				.attr('class', (d: any) =>
					d.depth !== 0 && d.children && d.children.length > 0 ? 'clickable' : null
				)
				.on('mouseover', function (event: MouseEvent, d: any) {
					// Dispatch mouse event
					self.services.events.dispatchEvent(Events.Tree.NODE_MOUSEOVER, {
						event,
						element: select(this),
						datum: d
					})
				})
				.on('click', function (event: MouseEvent, d: any) {
					if (d.depth !== 0) {
						d.children = d.children ? null : d._children

						update(d)
					}

					// Dispatch mouse event
					self.services.events.dispatchEvent(Events.Tree.NODE_CLICK, {
						event,
						element: select(this),
						datum: d
					})
				})
				.on('mouseout', function (event: MouseEvent, d: any) {
					// Dispatch mouse event
					self.services.events.dispatchEvent(Events.Tree.NODE_MOUSEOUT, {
						event,
						element: select(this),
						datum: d
					})
				})

			// Add node circles to entering nodes
			nodeGroupsEnter
				.append('circle')
				.attr('r', 2.5)
				.attr('class', (d: any) => (d._children ? 'parent' : 'child'))
				.attr('stroke-width', 10)

			// Add node labels
			nodeGroupsEnter
				.append('text')
				.attr('dy', '0.31em')
				.attr('x', (d: any) => (d._children ? -NODE_OFFSET : NODE_OFFSET))
				.attr('text-anchor', (d: any) => (d._children ? 'end' : 'start'))
				.text((d: any) => d.data.name)
				.clone(true)
				.attr('class', 'text-stroke')
				.lower()

			// Reposition nodes
			nodeGroups
				.merge(nodeGroupsEnter)
				.transition(transition)
				.attr('transform', (d: Coordinates) => `translate(${d.y},${d.x})`)
				.attr('fill-opacity', 1)
				.attr('stroke-opacity', 1)

			// Remove exiting nodes
			nodeGroups
				.exit()
				.transition(transition)
				.remove()
				.attr('transform', () => `translate(${source.y},${source.x})`)
				.attr('fill-opacity', 0)
				.attr('stroke-opacity', 0)

			// Update data on links
			const linkPaths = linkGroup.selectAll('path').data(links, (d: any) => d.target.id)

			// Add any entering link paths
			const linkPathsEnter = linkPaths
				.enter()
				.append('path')
				.attr('d', () => {
					const o = { x: source.x0, y: source.y0 }
					return diagonal({ source: o, target: o })
				})

			// Reposition updating link paths
			linkPaths.merge(linkPathsEnter).transition(transition).attr('d', diagonal)

			// Remove any exiting link paths
			linkPaths
				.exit()
				.transition(transition)
				.remove()
				.attr('d', () => {
					const o = { x: source.x, y: source.y }
					return diagonal({ source: o, target: o })
				})

			// Update position data for nodes
			root.eachBefore((d: Coordinates) => {
				d.x0 = d.x
				d.y0 = d.y
			})
		}

		const descendants = root.descendants()
		const maxDepth = descendants[descendants.length - 1].depth

		const tree =
			getProperty(options, 'tree', 'type') === TreeTypes.DENDROGRAM
				? d3Cluster().size([
						height,
						width - mockLongestLabelWidth - maxDepth * NODE_OFFSET - mockRootTitleWidth
					])
				: d3Tree()
						.nodeSize([dx, dy])
						.size([
							height,
							width - mockLongestLabelWidth - maxDepth * NODE_OFFSET - mockRootTitleWidth
						])

		const diagonal = linkHorizontal()
			.x((d: any) => d.y)
			.y((d: any) => d.x) as any

		root.x0 = dy / 2
		root.y0 = 0
		root.descendants().forEach((d: any, i: number) => {
			d.id = i
			d._children = d.children
		})

		tree(root)

		svg.attr('viewBox', [-margin.left, -margin.top, width, dx]).style('user-select', 'none')

		const linkGroup = svg.append('g').attr('class', 'links')
		const nodeGroup = svg.append('g').attr('class', 'nodes')

		update(root)
	}
}
