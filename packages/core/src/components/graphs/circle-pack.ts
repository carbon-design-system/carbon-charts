import { hierarchy as d3Hierarchy, pack as D3Pack, select } from 'd3'
import { get } from 'lodash-es'
import { getProperty } from '@/tools'
import { canvasZoomSettings, circlePack as circlePackConfigs } from '@/configuration'
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { ColorClassNameTypes, Events, RenderTypes } from '@/interfaces/enums'
import { CirclePackChartModel } from '@/model/circle-pack'

export class CirclePack extends Component {
	type = 'circle-pack'
	renderType = RenderTypes.SVG

	focal: any

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		// svg and container widths
		const svg = this.getComponentContainer({ withinChartClip: true })
		const { width, height } = DOMUtils.getSVGElementSize(this.parent as any, {
			useAttrs: true
		})

		// Because of a Firefox bug with regards to sizing & d3 packs,
		// rather than checking if height or width aren't 0,
		// we have to make sure they're not smaller than 1
		if (width < 1 || height < 1) {
			// on first render the svg is width and height 0
			// the circle packing layout functionality will not run
			return
		}

		// data and options (zoom/not zoom)
		let displayData = this.model.getDisplayData()
		// check if there is just one parent for the data
		const parentNode = (this.model as CirclePackChartModel).hasParentNode()
		const hierarchyLevel = (this.model as CirclePackChartModel).getHierarchyLevel()
		const options = this.getOptions()
		const canvasZoomEnabled = getProperty(options, 'canvasZoom', 'enabled')

		// check if there is one root for the data
		// that root will be the only datagroup (colorscale will be monochrome)
		if (parentNode && getProperty(displayData, 0, 'children')) {
			// remove want to remove the parent from being rendered
			displayData = getProperty(displayData, 0, 'children')
		}

		const root = d3Hierarchy({ children: displayData })
			.sum((d: any) => d.value)
			.sort((a, b) => b.value - a.value)

		const packLayout = D3Pack()
			.size([width, height])
			.padding((d: any) => {
				// add 3 px to account for the stroke width 1.5px
				return d.depth >= 1
					? circlePackConfigs.padding.children + 3
					: circlePackConfigs.padding.mainGroup + 3
			})

		const nodeData = packLayout(root)
			.descendants()
			.splice(1)
			.filter(node => {
				// filter based on hierarchy level
				return node.depth <= hierarchyLevel
			})

		// enter the circles
		const circles = svg.selectAll('circle.node').data(nodeData)

		circles.exit().attr('width', 0).attr('height', 0).remove()

		const enteringCircles = circles.enter().append('circle').classed('node', true)

		enteringCircles
			.merge(circles as any)
			.attr('class', (d: any) => {
				const originalClass = canvasZoomEnabled && hierarchyLevel === 3 ? this.getZoomClass(d) : ''
				return this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.FILL, ColorClassNameTypes.STROKE],
					dataGroupName: d.data.dataGroupName,
					originalClassName: d.children
						? `node ${originalClass}`
						: `node node-leaf ${originalClass}`
				})
			})
			.style('fill', (d: any) => this.model.getFillColor(d.data.dataGroupName, null, d.data))
			.style('stroke', (d: any) => this.model.getFillColor(d.data.dataGroupName, null, d.data))
			.attr('cx', (d: any) => d.x)
			.attr('cy', (d: any) => d.y)
			.transition('circlepack-leaf-update-enter')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'circlepack-leaf-update-enter'
				})
			)
			.attr('r', (d: any) => d.r)
			.attr('opacity', 1)
			.attr('fill-opacity', circlePackConfigs.circles.fillOpacity)

		if (canvasZoomEnabled === true && this.focal) {
			this.services.canvasZoom.zoomIn(this.focal, enteringCircles, canvasZoomSettings)
			this.setBackgroundListeners()
		}

		if (!parentNode) {
			// add legend filtering if it isnt a monochrome chart
			this.addLegendListeners()
		}

		// Add event listeners to elements drawn
		this.addEventListeners()
	}

	// turn off the highlight class on children circles
	unhighlightChildren(childData: any) {
		const data = childData.map((d: any) => d.data)

		this.parent
			.selectAll('circle.node')
			.filter((d: any) => data.some((datum: any) => datum === d.data) && d.depth > 1)
			.style('stroke', (d: any) => this.model.getFillColor(d.data.dataGroupName, null, d.data))
	}

	// highlight the children circles with a stroke
	highlightChildren(childData: any) {
		const data = childData.map((d: any) => d.data)

		this.parent
			.selectAll('circle.node')
			.filter((d: any) => data.some((datum: any) => datum === d.data) && d.depth > 1)
			.style('stroke', circlePackConfigs.circles.hover.stroke)
	}

	getZoomClass(node: any) {
		if ((this.model as CirclePackChartModel).getHierarchyLevel() === 3 && this.focal) {
			if (
				node.data === this.focal.data ||
				this.focal.children.some((d: any) => d.data === node.data)
			) {
				return 'focal'
			}
		}
		return 'non-focal'
	}

	addLegendListeners() {
		const { events } = this.services
		// Highlight correct circle on legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		// Un-highlight circles on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)
	}

	removeBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getMainContainer())
		chartSvg.on('click', () => null)
	}

	setBackgroundListeners() {
		const chartSvg = select(this.services.domUtils.getMainContainer())
		const self = this
		const canvasSelection = this.parent.selectAll('circle.node')

		chartSvg.on('click', () => {
			self.focal = null as any
			;(self.model as CirclePackChartModel).updateHierarchyLevel(2)
			chartSvg.classed('zoomed-in', false)
			self.services.canvasZoom.zoomOut(canvasSelection, canvasZoomSettings)
		})
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail

		this.parent
			.selectAll('circle.node')
			.transition('legend-hover-circlepack')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-hover-circlepack'
				})
			)
			.attr('opacity', (d: any) => {
				return d.data.dataGroupName === hoveredElement.datum()['name']
					? 1
					: circlePackConfigs.circles.fillOpacity
			})
	}

	handleLegendMouseOut = () => {
		this.parent
			.selectAll('circle.node')
			.transition('legend-mouseout-circlepack')
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'legend-mouseout-circlepack'
				})
			)
			.attr('opacity', 1)
	}

	// Zoom icon to be appended to the label in the tooltip
	getZoomIcon() {
		return `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
			<polygon points="5.93 3.71 4.45 3.71 4.45 2.23 3.71 2.23 3.71 3.71 2.23 3.71 2.23 4.45 3.71 4.45 3.71 5.93 4.45 5.93 4.45 4.45 5.93 4.45 5.93 3.71"/>
			<path d="M7.2,6.67a4,4,0,0,0,1-2.59A4.08,4.08,0,1,0,4.07,8.15h0a4,4,0,0,0,2.59-1L9.48,10,10,9.48Zm-3.12.77A3.34,3.34,0,1,1,7.41,4.08,3.34,3.34,0,0,1,4.08,7.44Z"/>
		</svg>`
	}

	// add event listeners for tooltip on the circles
	addEventListeners() {
		const self = this
		this.parent
			.selectAll('circle.node')
			.on('mouseover', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', true)

				const hierarchyLevel = (self.model as CirclePackChartModel).getHierarchyLevel()
				const disabled = hierarchyLevel > 2 && !hoveredElement.classed('focal')
				const canvasZoomEnabled = getProperty(self.model.getOptions(), 'canvasZoom', 'enabled')

				let zoomable = false
				if (!disabled) {
					// get the children data for the tooltip
					let childrenData = []
					let totalValue: any[] = []
					let parentValue = null
					if (datum.children) {
						if (datum.depth > 1 && canvasZoomEnabled) {
							zoomable = true
							hoveredElement.classed('clickable', true)
						}
						childrenData = datum.children.map((child: any) => {
							if (child !== null) {
								// retrieve the children values if there are any 3rd level
								if (typeof child.data.value === 'number') {
									return {
										label: child.data.name,
										value: child.data.value
									}
								} else {
									return {
										label: child.data.name,
										labelIcon: canvasZoomEnabled && hierarchyLevel <= 2 ? self.getZoomIcon() : null,
										value: child.value
									}
								}
							}
						})

						const options = self.model.getOptions()
						totalValue = [
							{
								label:
									get(options, 'locale.translations.total') ||
									get(options, 'tooltip.totalLabel') ||
									'Total',
								value: datum.value,
								bold: true
							}
						]
						// children get a highlight stroke
						self.highlightChildren(datum.children)
					} else {
						// if there is no children we want to display the value for the data
						parentValue = datum.value
					}

					const fillColor = getComputedStyle(this as Element, null).getPropertyValue('fill')

					// Show tooltip
					self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
						event,
						hoveredElement,
						items: [
							{
								color: fillColor,
								label: datum.data.name,
								labelIcon:
									zoomable && canvasZoomEnabled && hierarchyLevel <= 2 ? self.getZoomIcon() : null,
								value: parentValue
							},
							...childrenData,
							...totalValue
						]
					})
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.CirclePack.CIRCLE_MOUSEOVER, {
					event,
					element: hoveredElement,
					datum
				})
			})
			.on('mousemove', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.CirclePack.CIRCLE_MOUSEMOVE, {
					event,
					element: hoveredElement,
					datum
				})

				self.services.events.dispatchEvent(Events.Tooltip.MOVE, {
					event
				})
			})
			.on('mouseout', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				hoveredElement.classed('hovered', false)

				if (datum.children) {
					self.unhighlightChildren(datum.children)
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.CirclePack.CIRCLE_MOUSEOUT, {
					event,
					element: hoveredElement,
					datum
				})

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				})
			})
			.on('click', function (event: MouseEvent, datum: any) {
				const hoveredElement = select(this)
				const disabled = hoveredElement.classed('non-focal')

				const canvasZoomEnabled = getProperty(self.model.getOptions(), 'canvasZoom', 'enabled')

				if (canvasZoomEnabled && (self.model as CirclePackChartModel).getHierarchyLevel() > 2) {
					const canvasSelection = self.parent.selectAll('circle.node')
					const chartSvg = select(self.services.domUtils.getMainContainer())
					chartSvg.classed('zoomed-in', false)
					self.focal = null as any
					;(self.model as CirclePackChartModel).updateHierarchyLevel(2)
					self.services.canvasZoom.zoomOut(canvasSelection, canvasZoomSettings)
				}
				// zoom if chart has zoom enabled and if its a depth 2 circle that has children
				else if (datum.depth === 2 && datum.children && !disabled && canvasZoomEnabled) {
					const canvasSelection = self.parent.selectAll('circle.node')
					const chartSvg = select(self.services.domUtils.getMainContainer())
					chartSvg.classed('zoomed-in', true)
					self.focal = datum as any
					;(self.model as CirclePackChartModel).updateHierarchyLevel(3)
					self.services.canvasZoom.zoomIn(datum, canvasSelection, canvasZoomSettings)
					// don't want the click event to propagate to the background zoom out
					// does not clash with the tooltip/other events because it does need to close the
					// tooltip on the click event in order to zoom in/out
					event.stopPropagation()
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.CirclePack.CIRCLE_CLICK, {
					event,
					element: hoveredElement,
					datum
				})
			})
	}

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll('circle.node')
			.on('mouseover', null)
			.on('mousemove', null)
			.on('mouseout', null)
			.on('click', null)

		// remove the listeners on the legend
		const eventsFragment = this.services.events
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover)
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut)

		this.removeBackgroundListeners()
	}
}
