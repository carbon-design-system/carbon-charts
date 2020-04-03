// Internal Imports
import { Component } from "../component";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { DOMUtils } from "../../services";

export class Skeleton extends Component {
	type = "skeleton";
	xScale: any;
	yScale: any;
	backdrop: any;

	setScales() {
		const xRange = this.services.cartesianScales.getMainXScale().range();
		const yRange = this.services.cartesianScales.getMainYScale().range();
		this.xScale = scaleLinear().domain([0, 1]).range(xRange);
		this.yScale = scaleLinear().domain([0, 1]).range(yRange);
	}

	drawBackdrop() {
		const svg = this.parent;

		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton-backdrop");
		const backdropRect = DOMUtils.appendOrSelect(this.backdrop, "rect.chart-skeleton-backdrop");
		backdropRect
			.attr("width", "100%")
			.attr("height", "100%");

		const [xScaleStart, xScaleEnd] = this.xScale.range();
		const [yScaleEnd, yScaleStart] = this.yScale.range();

		this.backdrop
			.merge(backdropRect)
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);
	}

	setStyle() {
		const svg = this.parent;
		const container = svg.select(".chart-skeleton-backdrop");
		const options = this.model.getOptions();
		// TODO: get the right option that, for now, it doesn't exist
		const strokeColor = options.grid.strokeColor;
		container.selectAll("line").attr("stroke", strokeColor);
		container.selectAll("rect").attr("stroke", strokeColor);
	}

	removeSkeleton() {
		const container = this.parent.select("svg.chart-skeleton-backdrop");
		container.remove();
	}

}
