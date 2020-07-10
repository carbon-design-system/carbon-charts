// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

// This class is used to create the clipPath to clip the chart graphs
// It's necessary for zoom in/out behavior
export class ChartClip extends Component {
	type = "chart-clip";

	chartClipPath: any;

	clipPathId = "id-" + this.type;

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
		).attr("id", this.clipPathId);
		const clipRect = DOMUtils.appendOrSelect(
			this.chartClipPath,
			`rect.${this.type}`
		);
		clipRect
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);

		this.chartClipPath.merge(clipRect).lower();

		const clipG = DOMUtils.appendOrSelect(svg, `g.${this.type}`);
		clipG
			.attr("clip-path", `url(#${this.clipPathId})`)
			.attr("id", `g-${this.type}`);
	}
}
