// Internal Imports
import { Skeleton } from "../graphs/skeleton";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import {
	Skeletons,
	CartesianOrientations,
	Alignments
} from "../../interfaces/enums";
import * as Configuration from "../../configuration";

// D3 Imports
import { scaleLinear } from "d3-scale";
import { easeLinear } from "d3-ease";
import { arc } from "d3-shape";

export class SkeletonLines extends Skeleton {
	type = "skeleton-lines";
	xScale: any;
	yScale: any;
	backdrop: any;

	render() {
		const svg = this.parent;
		const parent = svg.node().parentNode;
		const { width, height } = DOMUtils.getSVGElementSize(parent, {
			useAttrs: true
		});
		svg.attr("width", width).attr("height", height);

		const isDataLoading = Tools.getProperty(
			this.model.getOptions(),
			"data",
			"loading"
		);

		const isSparkline =
			!Tools.getProperty(
				this.model.getOptions(),
				"grid",
				"x",
				"enabled"
			) &&
			!Tools.getProperty(
				this.model.getOptions(),
				"grid",
				"y",
				"enabled"
			) &&
			!Tools.getProperty(
				this.model.getOptions(),
				"axes",
				"bottom",
				"visible"
			) &&
			!Tools.getProperty(
				this.model.getOptions(),
				"axes",
				"left",
				"visible"
			);

		// display a skeleton if there is no chart data or the loading flag is set to true
		if (isDataLoading && !isSparkline) {
			super.renderGridSkeleton(isDataLoading);
		} else if (isDataLoading && isSparkline) {
			const tickValue = Tools.getProperty(
				this.model.getOptions(),
				"axes",
				"left",
				"ticks",
				"values"
			);
			this.renderSparklineSkeleton(isDataLoading, tickValue);
		} else {
			this.removeSkeleton();
		}
	}

	renderSparklineSkeleton(showShimmerEffect: boolean, tickValue: number[] = [100]) {
		this.setScales();
		this.drawBackdrop(showShimmerEffect);
		this.drawSparkline(showShimmerEffect, tickValue);
		this.updateBackdropStyle();
		if (showShimmerEffect) {
			this.setShimmerEffect("shimmer-lines");
		}
	}

	drawSparkline(showShimmerEffect: boolean, tickValue: number[] = [100]) {
		const width = this.backdrop.attr("width");
		const ticksValue = tickValue;
		const sparklineSkeleton = DOMUtils.appendOrSelect(
			this.backdrop,
			"g.y.skeleton"
		);
		const update = sparklineSkeleton.selectAll("line").data(ticksValue);
		update
			.enter()
			.append("line")
			.merge(update)
			.attr("x1", 0)
			.attr("x2", width)
			.attr("y1", (d) => d)
			.attr("y2", (d) => d);

		sparklineSkeleton
			.selectAll("line")
			.classed("shimmer-effect-lines", showShimmerEffect)
			.classed("empty-state-lines", !showShimmerEffect);
	}

	updateBackdropStyle() {
		const svg = this.parent;

		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-skeleton.DAII");
		const backdropRect = DOMUtils.appendOrSelect(
			this.backdrop,
			"rect.chart-skeleton-backdrop"
		);
		backdropRect.classed("shimmer-effect-lines", false);
		backdropRect.classed("shimmer-effect-sparkline", true);
	}
}
