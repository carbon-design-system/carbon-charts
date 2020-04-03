// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";

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

	drawXGrid(animate: boolean) {
		DOMUtils.appendOrSelect(this.backdrop, "g.x.skeleton");

		const svg = this.parent;
		const height = this.backdrop.attr("height");
		const x = this.backdrop.attr("x");
		const ticksNumber = 5;

		const xGridGenerator = axisBottom(this.xScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

		const xGridG = svg
			.select(".x.skeleton")
			.attr("transform", `translate(${-x}, ${height})`);

		if (animate) {
			const transition = this.services.transitions.getTransition("skeleton-update");
			xGridG.transition(transition).call(xGridGenerator);
		} else {
			xGridG.call(xGridGenerator);
		}

		// clean
		xGridG.select("path").remove();
		xGridG.selectAll("text").remove();
	}

	drawYGrid(animate: boolean) {
		DOMUtils.appendOrSelect(this.backdrop, "g.y.skeleton");

		const svg = this.parent;
		const width = this.backdrop.attr("width");
		const y = this.backdrop.attr("y");
		const ticksNumber = 4;

		const yGridGenerator = axisLeft(this.yScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

		const yGridG = svg
			.select(".y.skeleton")
			.attr("transform", `translate(0, ${-y})`);

		if (animate) {
			const transition = this.services.transitions.getTransition("skeleton-update");
			yGridG.transition(transition)
				.call(yGridGenerator);
		} else {
			yGridG.call(yGridGenerator);
		}

		// clean
		yGridG.select("path").remove();
		yGridG.selectAll("text").remove();
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
