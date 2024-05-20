import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import type { ChartModel } from '@/model/model'
import { RenderTypes } from '@/interfaces/enums'
import type { Selection } from 'd3'

// This class is used to create the clipPath to clip the chart components
// It's necessary for zoom in/out behavior
export class ChartClip extends Component {
	type = 'chart-clip'
	renderType = RenderTypes.SVG

	// Give every chart-clip a distinct ID
	// so they don't interfere each other in a page with multiple charts
	chartClipId = 'chart-clip-id-' + Math.floor(Math.random() * 99999999999)

	chartClipPath: any

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs)
		this.init()
	}

	init() {
		// set unique chartClipId in this chart to model
		this.model.set({ chartClipId: this.chartClipId }, { skipUpdate: true })
	}

	render(animate = true) {
		// Create the clipPath
		this.createClipPath()
	}

	createClipPath() {
		const svg = this.parent
		const { cartesianScales } = this.services
		if (!cartesianScales) throw new Error('Service cartesianScales was undefined')
		const mainXScale = cartesianScales.getMainXScale()
		const mainYScale = cartesianScales.getMainYScale()

		const [xScaleStart, xScaleEnd]: number[] = mainXScale.range()
		const [yScaleEnd, yScaleStart]: number[] = mainYScale.range()

		// Get height
		if (!svg) {
			throw new Error('svg is undefined')
		}

		this.chartClipPath = DOMUtils.appendOrSelect(
			svg as Selection<SVGGraphicsElement, any, HTMLElement, any>,
			`clipPath.${this.type}`
		).attr('id', this.chartClipId)
		const clipRect = DOMUtils.appendOrSelect(this.chartClipPath, `rect.${this.type}`) as Selection<
			any,
			any,
			HTMLElement,
			any
		>

		if (xScaleEnd - xScaleStart > 0) {
			clipRect
				.attr('x', xScaleStart)
				.attr('y', yScaleStart)
				.attr('width', xScaleEnd - xScaleStart)
				.attr('height', yScaleEnd - yScaleStart)
		}

		this.chartClipPath.merge(clipRect).lower()
	}
}
