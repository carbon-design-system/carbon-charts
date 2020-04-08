// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { easeLinear } from "d3-ease";

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

		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton");
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
		const height = this.backdrop.attr("height");
		const x = this.backdrop.attr("x");
		const ticksNumber = 5;

		const xGridG = DOMUtils
			.appendOrSelect(this.backdrop, "g.x.skeleton")
			.attr("transform", `translate(${-x}, ${height})`);

		const xGridGenerator = axisBottom(this.xScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

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
		const width = this.backdrop.attr("width");
		const y = this.backdrop.attr("y");
		const ticksNumber = 4;

		const yGridG = DOMUtils
			.appendOrSelect(this.backdrop, "g.y.skeleton")
			.attr("transform", `translate(0, ${-y})`);

		const yGridGenerator = axisLeft(this.yScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

		if (animate) {
			const transition = this.services.transitions.getTransition("skeleton-update");
			yGridG.transition(transition).call(yGridGenerator);
		} else {
			yGridG.call(yGridGenerator);
		}

		// clean
		yGridG.select("path").remove();
		yGridG.selectAll("text").remove();
	}

	setStyleLines() {
		const animationDuration = 3000; // ms
		const delay = 1000; // ms
		const shimmerWidth = 0.2;
		const stopBgShimmerClass = "stop-bg-shimmer";
		const stopShimmerClass = "stop-shimmer";
		const container = this.parent.select(".chart-skeleton");
		const [startPoint, endPoint] = this.xScale.range();
		const width = Math.abs(endPoint - startPoint);

		// append the defs as first child of container
		const defs = DOMUtils.appendOrSelect(container, "defs").lower();

		const linearGradient = DOMUtils.appendOrSelect(defs, "linearGradient")
			.attr("id", "shimmer-lines")
			.attr("x1", startPoint - 3 * shimmerWidth * width)
			.attr("x2", endPoint)
			.attr("y1", 0)
			.attr("y2", 0)
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("gradientTransform", `translate(0, 0)`);

		const stops = `
			<stop class="${stopBgShimmerClass}" offset="${startPoint}"></stop>
			<stop class="${stopShimmerClass}" offset="${startPoint + shimmerWidth}"></stop>
			<stop class="${stopBgShimmerClass}" offset="${startPoint + 2 * shimmerWidth}"></stop>
		`;
		linearGradient.html(stops);

		repeat();
		function repeat() {
			linearGradient
				.attr("gradientTransform", `translate(${startPoint - 3 * shimmerWidth * width}, 0)`)
				.transition()
				.duration(animationDuration)
				.delay(delay)
				.ease(easeLinear)
				.attr("gradientTransform", `translate(${endPoint + 3 * shimmerWidth * width}, 0)`)
				.on("end", repeat);
		}
	}

	setStyleAreas() {
		const container = this.parent.select(".chart-skeleton");
		const animationDuration = 1;
		const shimmerWidth = 0.2;
		const delay = 0.5;
		const defsContent = `
			<linearGradient id="shimmer-areas" x1="0%" x2="100%" y1="0%" y2="0%">
				<stop class="background-shimmer-color">
					<animate
						id="starting"
						attributeName="offset"
						values="${0 - shimmerWidth}; ${1 - shimmerWidth}"
						dur="${animationDuration}s"
						begin="0s; starting.end + ${delay}s"
					/>
				</stop>
				<stop class="shimmer-color">
					<animate
						id="top"
						attributeName="offset"
						values="0; 1"
						dur="${animationDuration}s"
						begin="0s; top.end + ${delay}s"
					/>
				</stop>
				<stop class="background-shimmer-color">
					<animate
						id="ending"
						attributeName="offset"
						values="${0 + shimmerWidth}; ${1 + shimmerWidth}"
						dur="${animationDuration}s"
						begin="0s; ending.end + ${delay}s"
					/>
				</stop>
			</linearGradient>
		`;
		const defs = DOMUtils.appendOrSelect(container, "defs").lower();
		defs.html(defsContent);
	}

	removeSkeleton() {
		const container = this.parent.select(".chart-skeleton");
		container.remove();
	}

}
