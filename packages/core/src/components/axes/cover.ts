// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

export class Cover extends Component {
	type = "cover";

	coverClipPath: any;

	render(animate = true) {
		// Create the cover
		this.createCover();
	}

	createCover() {
		const svg = this.parent;
		const { cartesianScales } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height
		this.coverClipPath = DOMUtils.appendOrSelect(
			svg,
			`clipPath.${this.type}`
		);
		this.coverClipPath.attr("id", `${this.type}Clip`);
		const coverRect = DOMUtils.appendOrSelect(
			this.coverClipPath,
			"rect.cover"
		);
		coverRect
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);

		this.coverClipPath.merge(coverRect).lower();

		const coverG = DOMUtils.appendOrSelect(svg, `g.${this.type}`);
		coverG
			.attr("clip-path", `url(#${this.type}Clip)`)
			.attr("id", `g-${this.type}Clip`);
	}
}
