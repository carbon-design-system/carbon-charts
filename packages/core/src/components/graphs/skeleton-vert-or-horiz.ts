// MISC Imports
import { Skeleton } from "./skeleton";
import { DOMUtils } from "../../services";

// D3 Imports
import { axisLeft, axisBottom } from "d3-axis";

export class SkeletonVertOrHoriz extends Skeleton {
	type = "skeleton";
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
		this.setScales();
		this.drawBackdrop();
		if (orientation === "vertical") {
			this.drawYGrid(animate);
		}
		if (orientation === "horizontal") {
			this.drawXGrid(animate);
		}
		this.setStyle();
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
}
