// MISC Imports
import { dataExistsFn } from "../../services/scales-cartesian";
import { Skeleton } from "./skeleton";
import { DOMUtils } from "../../services";

// D3 Imports
import { axisBottom, scaleLinear } from "d3";

export class SkeletonGrid extends Skeleton {
	type = "skeleton-grid";
	backdrop: any;
	xScale: any;
	yScale: any;

	render() {
		console.log(`%c skeleton-grid - init`, "background: #8934eb; color: #FFFFFF");

		const data = this.model.getData();
		const areDataEmpty = !dataExistsFn(data);

		// if data are empty, draw the skeleton,
		// otherwise remove the skeleton
		if (areDataEmpty) {
			this.renderSkeleton();
		} else {
			this.removeSkeleton();
		}
	}

	renderSkeleton() {
		console.log(`%c skeleton-grid - render`, "background: #3493eb; color: #FFFFFF");

		const svg = this.parent;
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton");

		const xRange = this.services.cartesianScales.getMainXScale().range();
		const yRange = this.services.cartesianScales.getMainYScale().range();
		this.xScale = scaleLinear().domain([0, 1]).range(xRange);
		this.yScale = scaleLinear().domain([0, 1]).range(yRange);
		const [xScaleStart, xScaleEnd] = xRange;
		const [yScaleEnd, yScaleStart] = yRange;
		console.log(`  xScale: [${this.xScale.domain()}] -> [${this.xScale.range()}]`);
		console.log(`  yScale: [${this.yScale.domain()}] -> [${this.yScale.range()}]`);

		this.backdrop
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart);

		DOMUtils.appendOrSelect(this.backdrop, "g.x.grid-skeleton");
		DOMUtils.appendOrSelect(this.backdrop, "g.y.grid-skeleton");

		this.drawXGrid();
	}

	drawXGrid() {
		const svg = this.parent;
		const height = this.backdrop.attr("height");
		const x = this.backdrop.attr("x");
		const ticksNumber = 10;

		const xGridGenerator = axisBottom(this.xScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0)
			.ticks(ticksNumber);

		const xGrid = svg.select(".x.grid-skeleton")
			.attr("transform", `translate(${-x}, ${height})`)
			.call(xGridGenerator);

		xGrid.selectAll("text").remove();
		xGrid.selectAll("path").remove();
	}

	removeSkeleton() {
		const container = this.parent.select("svg.chart-skeleton");
		container.remove();
	}
}
