// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";
import { mouse, select } from "d3-selection";
import { TooltipTypes, Events } from "../../interfaces";

export class Cover extends Component {
	type = "cover";

	coverClipPath: any;

	render(animate = true) {
		// Create the cover
		this.createCover();
	}


	createCover() {
		const svg = this.parent;
		console.log("!!! cover svg: ", svg);
		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height
		this.coverClipPath = DOMUtils.appendOrSelect(svg, `clipPath.${this.type}`);
		this.coverClipPath
			.attr("id", `${this.type}Clip`);
		const coverRect = DOMUtils.appendOrSelect(
			this.coverClipPath,
			"rect.cover"
		);
		coverRect
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);

		this.coverClipPath
			.merge(coverRect)
			.lower();

		const coverG = DOMUtils.appendOrSelect(svg, `g.${this.type}`);
		coverG
			.attr("clip-path", `url(#${this.type}Clip)`)
			.attr("id", `g-${this.type}Clip`);

	}

	cleanCover(g) {
		const options = this.model.getOptions();
		g.selectAll("line").attr("stroke", options.grid.strokeColor);

		// Remove extra elements
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}
}
