// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { ChartModel } from "src/model";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";

export class Skeleton extends Component {
	type = "skeleton";
	backdrop: any;
	xScale: any;
	yScale: any;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);
		this.init();
	}

	init() {
		if (!this.services.cartesianScales.getMainXScale() || !this.services.cartesianScales.getMainYScale()) {
			return;
		}
		const xRange = this.services.cartesianScales.getMainXScale().range();
		const yRange = this.services.cartesianScales.getMainYScale().range();
		this.xScale = scaleLinear().domain([0, 1]).range(xRange);
		this.yScale = scaleLinear().domain([0, 1]).range(yRange);

		this.drawBackdrop();
	}

	drawBackdrop() {
		const svg = this.getContainerSVG();
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton");
		const [xScaleStart, xScaleEnd] = this.xScale;
		const [yScaleEnd, yScaleStart] = this.yScale;
		console.log({ xScaleStart, xScaleEnd, yScaleEnd, yScaleStart, w: xScaleEnd - xScaleStart, h: yScaleEnd - yScaleStart});
		if ([xScaleStart, xScaleEnd, yScaleEnd, yScaleStart].some(d => !d)) {
			return;
		}
		console.log({ xScaleStart, xScaleEnd, yScaleEnd, yScaleStart, w: xScaleEnd - xScaleStart, h: yScaleEnd - yScaleStart});

		this.backdrop
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);
	}

	drawVerticalGrid(animate = true) {
		DOMUtils.appendOrSelect(this.backdrop, "g.x.skeleton");

		const svg = this.getContainerSVG();
		const height = this.backdrop.attr("height");
		const x = this.backdrop.attr("x");
		const ticksNumber = 5;

		if ([height, x].some(d => !d)) {
			return;
		}
		console.log({ x, height });

		const xGridGenerator = axisBottom(this.xScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

		const xGridG = svg
			.select(".x.skeleton")
			.attr("transform", `translate(${-x}, ${height})`);

		if (animate) {
			const transition = this.services.transitions.getTransition("skeleton-update");
			xGridG.transition(transition)
				.call(xGridGenerator);
		} else {
			xGridG.call(xGridGenerator);
		}

		this.setStyle(xGridG, "red");
		// this.clean(xGridG, 0);
	}

	drawHorizontalGrid(animate = true) {
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

		this.setStyle(yGridG, "cyan");
		// this.clean(yGridG, 10);
	}

	setStyle(holder: any, color: string) {
		const options = this.model.getOptions();
		// TODO: get the right option that, for now, it doesn't exist
		const strokeColor = options.grid.strokeColor ? options.grid.strokeColor : color;
		holder
			.selectAll("line")
			.attr("stroke", strokeColor);
	}

	// remove unnecessary elements like:
	// 	- ticks labels
	//  - axis path
	// 	- line of index idxToRemove because it stays over the axis
	clean(holder: any, idxToRemove: number) {
		holder.select("path")
			.remove();
		holder.selectAll("text")
			.remove();
		// holder.selectAll(".tick")
		// 	.filter((d, i) => i === idxToRemove)
		// 	.remove();
	}

	removeSkeleton() {
		const container = this.parent.select("svg.chart-skeleton");
		container.remove();
	}

	render() {
	}
}
