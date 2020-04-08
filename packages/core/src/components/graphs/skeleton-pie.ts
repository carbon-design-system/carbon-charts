// MISC Imports
import { Skeleton } from "./skeleton";
import { DOMUtils } from "../../services";

// D3 Imports
import { arc } from "d3-shape";

export class SkeletonPie extends Skeleton {
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

	renderSkeleton() {
		const outerRadius = this.computeRadius();
		this.drawRing(outerRadius, 0);
		this.setStyle("shimmer-areas");
	}

	drawRing(outerRadius: number, innerRadius: number) {
		const svg = this.parent;
		const { width, height } = DOMUtils.getSVGElementSize(svg, { useAttrs: true });
		const container = DOMUtils.appendOrSelect(svg, "g.chart-skeleton");
		const options = this.model.getOptions().pie;

		const skeletonAreaContainer = DOMUtils.appendOrSelect(container, "rect.chart-skeleton-area-container")
			.attr("width", width)
			.attr("height", height)
			.attr("fill", "none");

		const arcPathGenerator = arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(0)
			.endAngle(Math.PI * 2);

		// centering circle inside the container
		const tcx = outerRadius + Math.abs(options.radiusOffset);
		const tcy = outerRadius + (Math.min(width, height) - outerRadius * 2) / 2;

		container.append("path")
			.attr("class", "skeleton-area-shape")
			.attr("transform", `translate(${tcx}, ${tcy})`)
			.attr("d", arcPathGenerator);
	}

	computeRadius() {
		const options = this.model.getOptions();
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const radius = Math.min(width, height) / 2;
		return radius + options.pie.radiusOffset;
	}
}
