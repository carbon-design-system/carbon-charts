import { getProperty } from '@/tools'
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
		const axes = {}
		const axisPositions = Object.keys(AxisPositions)
		const axesOptions = getProperty(this.getOptions(), 'axes')

		axisPositions.forEach((axisPosition: string) => {
			const axisOptions = axesOptions[AxisPositions[axisPosition]]
			if (axisOptions) {
				axes[AxisPositions[axisPosition]] = true
			}
		})

		this.configs.axes = axes

		// Check the configs to know which axes need to be rendered
		axisPositions.forEach((axisPositionKey: string) => {
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

			// Grab the invisibly rendered axis' width & height, and set margins
			// Based off of that
			// We draw the invisible axis because of the async nature of d3 transitions
			// To be able to tell the final width & height of the axis when initiaing the transition
			// The invisible axis is updated instantly and without a transition
			const invisibleAxisRef = child.getInvisibleAxisRef()
			const { width, height } = DOMUtils.getSVGElementSize(invisibleAxisRef, { useBBox: true })

			let offset: any
			if (child.getTitleRef().empty()) {
				offset = 0
			} else {
				offset = DOMUtils.getSVGElementSize(child.getTitleRef(), {
					useBBox: true
				}).height

				if (axisPosition === AxisPositions.LEFT || axisPosition === AxisPositions.RIGHT) {
					offset += 5
				}
			}
			switch (axisPosition) {
				case AxisPositions.TOP:
					margins.top = height + offset
					break
				case AxisPositions.BOTTOM:
					margins.bottom = height + offset
					break
				case AxisPositions.LEFT:
					margins.left = width + offset
					break
				case AxisPositions.RIGHT:
					margins.right = width + offset
					break
			}
		})

		this.services.events.dispatchEvent(Events.Axis.RENDER_COMPLETE)

		// If the new margins are different than the existing ones
		const isNotEqual = Object.keys(margins).some((marginKey: any) => {
			return this.margins[marginKey] !== margins[marginKey]
		})

		if (isNotEqual) {
			this.margins = Object.assign(this.margins, margins)

			// also set new margins to model to allow external components to access
			this.model.set({ axesMargins: this.margins }, { skipUpdate: true })
			this.services.events.dispatchEvent(Events.ZoomBar.UPDATE)

			Object.keys(this.children).forEach((childKey: any) => {
				const child = this.children[childKey]
				child.margins = this.margins
			})

			this.render(true)
		}
	}
}
