// Internal Imports
import { Component } from '../component';
import { DOMUtils } from '../../services';
import { ChartModel } from '../../model/model';
import { RenderTypes } from '../../interfaces';

// This class is used to create the clipPath to clip the chart components
// It's necessary for zoom in/out behavior
export class ChartClip extends Component {
	type = 'chart-clip';
	renderType = RenderTypes.SVG;

	// Give every chart-clip a distinct ID
	// so they don't interfere each other in a page with multiple charts
	chartClipId = 'chart-clip-id-' + Math.floor(Math.random() * 99999999999);

	chartClipPath: any;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);
		this.init();
	}

	init() {
		// set unique chartClipId in this chart to model
		this.model.set({ chartClipId: this.chartClipId }, { skipUpdate: true });
	}

	render(animate = true) {
		// Create the clipPath
		this.createClipPath();
	}

	createClipPath() {
		const svg = this.parent;
		const { cartesianScales } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height
		this.chartClipPath = DOMUtils.appendOrSelect(
			svg,
			`clipPath.${this.type}`
		).attr('id', this.chartClipId);
		const clipRect = DOMUtils.appendOrSelect(
			this.chartClipPath,
			`rect.${this.type}`
		);
		clipRect
			.attr('x', xScaleStart)
			.attr('y', yScaleStart)
			.attr('width', xScaleEnd - xScaleStart)
			.attr('height', yScaleEnd - yScaleStart);

		this.chartClipPath.merge(clipRect).lower();
	}
}
