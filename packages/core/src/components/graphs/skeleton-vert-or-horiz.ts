// MISC Imports
import { Skeleton } from "./skeleton";
import { DOMUtils } from "../../services";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";

export class SkeletonVertOrHoriz extends Skeleton {
	type = "skeleton-horiz";
	backdrop: any;
	xScale: any;
	yScale: any;

	render() {
		const areDataEmpty = this.model.isDataEmpty();

		// if data are empty, draw the skeleton,
		// otherwise remove the skeleton
		if (areDataEmpty) {
			this.renderSkeleton();
		} else {
			this.removeSkeleton();
		}
	}

	renderSkeleton(animate = true) {
		const orientation = this.services.cartesianScales.getOrientation();

		const svg = this.parent;
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton");

		const xRange = this.services.cartesianScales.getMainXScale().range();
		const yRange = this.services.cartesianScales.getMainYScale().range();
		this.xScale = scaleLinear().domain([0, 1]).range(xRange);
		this.yScale = scaleLinear().domain([0, 1]).range(yRange);
		const [xScaleStart, xScaleEnd] = xRange;
		const [yScaleEnd, yScaleStart] = yRange;

		this.backdrop
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);

		if (orientation === "vertical") {
			this.drawYGrid(animate);
		}
		if (orientation === "horizontal") {
			this.drawXGrid(animate);
		}
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
			xGridG.transition(transition)
				.call(xGridGenerator);
		} else {
			xGridG.call(xGridGenerator);
		}

		this.setStyle(xGridG);
		this.clean(xGridG, 0);
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

		this.setStyle(yGridG);
		this.clean(yGridG, 10);
	}

	setStyle(holder: any) {
		const options = this.model.getOptions();
		// TODO: get the right option that, for now, it doesn't exist
		const strokeColor = options.grid.strokeColor ? options.grid.strokeColor : "cyan";
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
}
