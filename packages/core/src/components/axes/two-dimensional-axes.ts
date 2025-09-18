import { getProperty } from '@/tools'
import { AXIS_TITLE_POSITIONING_OFFSET } from '@/configuration'
import { Axis } from './axis'
import { HoverAxis } from './hover-axis'
import { Component } from '@/components/component'
import type { Threshold } from '@/components/essentials/threshold'
import { AxisPositions, Events, RenderTypes, AxisFlavor } from '@/interfaces/enums'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModelCartesian } from '@/model/cartesian-charts'

export class TwoDimensionalAxes extends Component {
	type = '2D-axes'
	renderType = RenderTypes.SVG

	children: any = {}

	thresholds: Threshold[] = []

	margins = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}

	render(animate = false) {
		// Pre-calculate required margins BEFORE any rendering
		this.preCalculateMargins()

		const axes: any = {}
		const axisPositions = Object.keys(AxisPositions)
		const axesOptions = getProperty(this.getOptions(), 'axes')

		axisPositions.forEach((axisPosition: keyof typeof AxisPositions) => {
			const axisOptions = axesOptions[AxisPositions[axisPosition]]
			if (axisOptions) {
				axes[AxisPositions[axisPosition]] = true
			}
		})

		this.configs.axes = axes

		// Check the configs to know which axes need to be rendered
		axisPositions.forEach((axisPositionKey: keyof typeof AxisPositions) => {
			const axisPosition = AxisPositions[axisPositionKey]
			if (this.configs.axes[axisPosition] && !this.children[axisPosition]) {
				const configs = {
					position: axisPosition,
					axes: this.configs.axes,
					margins: this.margins
				}

				const axisComponent =
					(this.model as ChartModelCartesian).axisFlavor === AxisFlavor.DEFAULT
						? new Axis(this.model, this.services, configs)
						: new HoverAxis(this.model, this.services, configs)

				// Set model, services & parent for the new axis component
				axisComponent.setModel(this.model)
				axisComponent.setServices(this.services)
				axisComponent.setParent(this.parent)

				this.children[axisPosition] = axisComponent
			}
		})

		Object.keys(this.children).forEach((childKey: any) => {
			const child = this.children[childKey]
			child.render(animate)
		})

		const margins = {} as any

		Object.keys(this.children).forEach((childKey: any) => {
			const child = this.children[childKey]
			const axisPosition = child.configs.position

			// Grab the invisible axis dimensions for base measurements
			const invisibleAxisRef = child.getInvisibleAxisRef()
			const { width: axisWidth, height: axisHeight } = DOMUtils.getSVGElementSize(invisibleAxisRef, { useBBox: true })

			// Calculate title offset and account for positioning
			let titleOffset = 0
			if (!child.getTitleRef().empty()) {
				const titleHeight = DOMUtils.getSVGElementSize(child.getTitleRef(), {
					useBBox: true
				}).height

				if (axisPosition === AxisPositions.LEFT || axisPosition === AxisPositions.RIGHT) {
					titleOffset = titleHeight + 5
				} else if (axisPosition === AxisPositions.BOTTOM) {
					// For bottom axis, account for both title height and positioning offset
					titleOffset = titleHeight + AXIS_TITLE_POSITIONING_OFFSET
				} else {
					titleOffset = titleHeight
				}
			}

			const width = axisWidth
			const height = axisHeight
			switch (axisPosition) {
				case AxisPositions.TOP:
					margins.top = height + titleOffset
					break
				case AxisPositions.BOTTOM:
					margins.bottom = height + titleOffset
					break
				case AxisPositions.LEFT:
					margins.left = width + titleOffset
					break
				case AxisPositions.RIGHT:
					margins.right = width + titleOffset
					break
			}
		})

		this.services.events.dispatchEvent(Events.Axis.RENDER_COMPLETE)

		// If the new margins are different than the existing ones
		const isNotEqual = Object.keys(margins).some(
			(marginKey: 'top' | 'right' | 'bottom' | 'left') => {
				return this.margins[marginKey] !== margins[marginKey]
			}
		)

		if (isNotEqual) {
			this.margins = Object.assign(this.margins, margins)

			// also set new margins to model to allow external components to access
			this.model.set({ axesMargins: this.margins }, { skipUpdate: true })
			this.services.events.dispatchEvent(Events.ZoomBar.UPDATE)

			Object.keys(this.children).forEach((childKey: any) => {
				const child = this.children[childKey]
				child.margins = this.margins
			})

			// Ensure the SVG container accounts for bottom margin (axis title space)
			this.ensureContainerSpace()

			this.render(true)
		}
	}

	/**
	 * Pre-calculate margins based on axis options to reserve space before rendering
	 */
	preCalculateMargins() {
		const axesOptions = getProperty(this.getOptions(), 'axes')
		const estimatedMargins = { top: 0, right: 0, bottom: 0, left: 0 }

		// Estimate margins based on axis titles and typical axis sizes
		Object.keys(AxisPositions).forEach((axisPositionKey: keyof typeof AxisPositions) => {
			const axisPosition = AxisPositions[axisPositionKey]
			const axisOptions = axesOptions[axisPosition]

			if (axisOptions && axisOptions.title) {
				// Estimate space needed for title - roughly 20px for text + spacing
				const estimatedTitleSpace = 20

				switch (axisPosition) {
					case AxisPositions.BOTTOM:
						estimatedMargins.bottom = estimatedTitleSpace + AXIS_TITLE_POSITIONING_OFFSET
						break
					case AxisPositions.TOP:
						estimatedMargins.top = estimatedTitleSpace
						break
					case AxisPositions.LEFT:
						estimatedMargins.left = estimatedTitleSpace + 5
						break
					case AxisPositions.RIGHT:
						estimatedMargins.right = estimatedTitleSpace + 5
						break
				}
			}
		})

		// Set the SVG container dimensions to include estimated margins
		this.setContainerDimensions(estimatedMargins)
	}

	/**
	 * Set SVG container dimensions to include margin space
	 */
	setContainerDimensions(margins: any) {
		const svg = this.getComponentContainer()
		const parent = svg.node()?.parentNode as HTMLElement

		if (parent) {
			const { width: parentWidth, height: parentHeight } = DOMUtils.getHTMLElementSize(parent)

			// Set minimum height to include bottom margin space
			const requiredHeight = Math.max(parentHeight, 50 + margins.bottom)
			const requiredWidth = Math.max(parentWidth, 100 + margins.left + margins.right)

			svg
				.attr('height', requiredHeight)
				.attr('width', requiredWidth)
				.style('height', `${requiredHeight}px`)
				.style('width', `${requiredWidth}px`)
		}
	}

	/**
	 * Ensure the SVG container has enough space for positioned axis titles
	 */
	ensureContainerSpace() {
		const svg = this.getComponentContainer()

		// Add a bottom margin to the SVG to ensure positioned titles are within bounds
		if (this.margins.bottom > 0) {
			svg.style('margin-bottom', `${this.margins.bottom}px`)
		}
	}
}
