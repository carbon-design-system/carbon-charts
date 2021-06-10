// Internal Imports
import { ChartClip } from './../axes/chart-clip';
import { DOMUtils } from './../../services';

// This class is used to create the clipPath to clip the chart components
// It's necessary for zoom in/out behavior
export class CanvasChartClip extends ChartClip {
	type = 'canvas-chart-clip';

	// Give every chart-clip a distinct ID
	// so they don't interfere each other in a page with multiple charts
	chartClipId =
		'canvas-chart-clip-id-' + Math.floor(Math.random() * 99999999999);

	createClipPath() {
		const svg = this.parent;
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true,
		});

		this.chartClipPath = DOMUtils.appendOrSelect(
			svg,
			`clipPath.${this.type}`
		).attr('id', this.chartClipId);
		const clipRect = DOMUtils.appendOrSelect(
			this.chartClipPath,
			`rect.${this.type}`
		);

		clipRect
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height);

		this.chartClipPath.merge(clipRect).lower();
	}
}
