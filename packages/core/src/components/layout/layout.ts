import { select } from 'd3'
import { getProperty } from '@/tools'
import { carbonPrefix } from '@/configuration-non-customizable' // CSS prefix
import { Component } from '@/components/component'
import { LayoutDirection, LayoutGrowth, RenderTypes, LayoutAlignItems } from '@/interfaces/enums'
import { LayoutConfigs } from '@/interfaces/layout'
import { LayoutComponentChild } from '@/interfaces/components'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'

export class LayoutComponent extends Component {
	// Give every layout component a distinct ID
	// so they don't interfere when querying elements
	static instanceID = Math.floor(Math.random() * 99999999999)

	type = 'layout'

	children: LayoutComponentChild[]

	private _instanceID: number

	constructor(
		model: ChartModel,
		services: any,
		children: LayoutComponentChild[],
		configs?: LayoutConfigs
	) {
		super(model, services, configs)

		this.configs = configs
		this.children = children

		this._instanceID = LayoutComponent.instanceID++

		this.init()
	}

	init() {
		this.children.forEach((child: any) => {
			child.components.forEach((component: Component) => {
				component.init()
			})
		})
	}

	getPreferedAndFixedSizeSum(): number {
		const svg = this.parent
		let sum = 0

		svg
			.selectAll(`div.layout-child-${this._instanceID}`)
			.filter((d: any) => {
				const growth = getProperty(d, 'growth')

				return growth === LayoutGrowth.PREFERRED || growth === LayoutGrowth.FIXED
			})
			.each(function (d: any) {
				sum += d.size
			})

		return sum
	}

	getNumOfStretchChildren(): number {
		const svg = this.parent

		return svg
			.selectAll(`div.layout-child-${this._instanceID}`)
			.filter((d: any) => getProperty(d, 'growth') === LayoutGrowth.STRETCH)
			.size()
	}

	render(animate = true) {
		const options = this.model.getOptions()

		// Get parent element to render inside of
		const parent = this.parent

		const { width, height } = DOMUtils.getHTMLElementSize(parent.node() as any)

		const horizontal =
			this.configs.direction === LayoutDirection.ROW ||
			this.configs.direction === LayoutDirection.ROW_REVERSE

		const chartprefix = getProperty(this.model.getOptions(), 'style', 'prefix')

		// Add new boxes to the DOM for each layout child
		const updatedBoxes = parent
			.classed(
				`${carbonPrefix}--${chartprefix}--layout-row`,
				this.configs.direction === LayoutDirection.ROW
			)
			.classed(
				`${carbonPrefix}--${chartprefix}--layout-row-reverse`,
				this.configs.direction === LayoutDirection.ROW_REVERSE
			)
			.classed(
				`${carbonPrefix}--${chartprefix}--layout-column`,
				this.configs.direction === LayoutDirection.COLUMN
			)
			.classed(
				`${carbonPrefix}--${chartprefix}--layout-column-reverse`,
				this.configs.direction === LayoutDirection.COLUMN_REVERSE
			)
			.classed(
				`${carbonPrefix}--${chartprefix}--layout-alignitems-center`,
				this.configs.alignItems === LayoutAlignItems.CENTER
			)
			.selectAll(`div.layout-child-${this._instanceID}`)
			.data(this.children, (d: any) => d.id)

		const enteringBoxes = updatedBoxes.enter().append('div')

		enteringBoxes
			.merge(parent.selectAll(`div.layout-child-${this._instanceID}`))
			.attr('class', (d: any) => `layout-child layout-child-${this._instanceID} ${d.id}`)
			.each(function (d: any) {
				// Set parent component for each child
				d.components.forEach((itemComponent: any) => {
					const selection = select(this)

					const renderType = getProperty(d, 'renderType')
					const isRenderingSVG = renderType === RenderTypes.SVG
					itemComponent.setParent(
						isRenderingSVG
							? DOMUtils.appendOrSelect(selection, 'svg.layout-svg-wrapper')
									.attr('width', '100%')
									.attr('height', '100%')
							: selection
					)

					// if parent is missing aria-label, set it to the title of the parent
					if (isRenderingSVG && !selection.select('svg.layout-svg-wrapper').attr('aria-label')) {
						selection.select('svg.layout-svg-wrapper').attr('aria-label', options?.accessibility?.svgAriaLabel || options?.title)
					}

					// Render preffered & fixed items
					const growth = getProperty(d, 'growth')
					if (growth === LayoutGrowth.PREFERRED || growth === LayoutGrowth.FIXED) {
						itemComponent.render(animate)
					}
				})
			})

		parent
			.selectAll(`div.layout-child-${this._instanceID}`)
			.style('height', null)
			.style('width', null)
			.each(function (d: any) {
				// Calculate preffered children sizes after internal rendering
				const growth = getProperty(d, 'growth')

				const renderType = getProperty(d, 'renderType')
				const matchingElementDimensions =
					renderType === RenderTypes.SVG
						? DOMUtils.getSVGElementSize(select(this).select('svg.layout-svg-wrapper'), {
								useBoundingRect: true
							})
						: DOMUtils.getHTMLElementSize(this as any)

				if (growth === LayoutGrowth.PREFERRED) {
					const matchingElementWidth = horizontal
						? matchingElementDimensions.width
						: matchingElementDimensions.height
					const elementWidth = horizontal ? width : height

					d.size = (matchingElementWidth / elementWidth) * 100
				}
			})

		updatedBoxes.exit().remove()

		// Run through stretch x-items
		this.children
			.filter(child => {
				const growth = getProperty(child, 'growth')
				return growth === LayoutGrowth.STRETCH
			})
			.forEach((child: any) => {
				child.size = (100 - +this.getPreferedAndFixedSizeSum()) / +this.getNumOfStretchChildren()
			})

		// Update all boxes with new sizing
		const allUpdatedBoxes = parent
			.selectAll(`div.layout-child-${this._instanceID}`)
			.data(this.children, (d: any) => d.id)

		if (horizontal) {
			allUpdatedBoxes
				.style('width', (d: any) => `${(d.size / 100) * width}px`)
				.style('height', '100%')
		} else {
			allUpdatedBoxes
				.style('height', (d: any) => `${(d.size / 100) * height}px`)
				.style('width', '100%')
		}

		allUpdatedBoxes.each(function (d: any) {
			d.components.forEach((itemComponent: any) => {
				const growth = getProperty(d, 'growth')
				if (growth === LayoutGrowth.STRETCH) {
					itemComponent.render(animate)
				}
			})
		})
	}

	// Pass on model to children as well
	setModel(newObj: ChartModel) {
		super.setModel(newObj)

		this.children.forEach((child: any) => {
			child.components.forEach((component: Component) => component.setModel(newObj))
		})
	}

	// Pass on essentials to children as well
	setServices(newObj: any) {
		super.setServices(newObj)

		this.children.forEach((child: any) => {
			child.components.forEach((component: Component) => component.setServices(newObj))
		})
	}

	destroy() {
		this.children.forEach((child: any) => {
			child.components.forEach((component: Component) => component.destroy())
		})
	}
}
