// D3 Imports
import { dataExistsFn } from "../../services/scales-cartesian";
import { Skeleton } from "./skeleton";

export class SkeletonGrid extends Skeleton {
	type = "skeleton-grid";

	init() {
	}

	render() {
		const data = this.model.getData();

		const areDataEmpty = !dataExistsFn(data);

		// Grab container SVG
		const svg = this.getContainerSVG();

		// Append the skeleton g container
		svg.append("g").attr("class", "skeleton");

		// if data are empty, draw the skeleton,
		// otherwise remove the skeleton
		if (areDataEmpty) {
			this.renderScatterSkeleton();
		} else {
			this.removeSkeleton();
		}
	}

	renderScatterSkeleton() {
		const container = this.getContainerSVG().select("g.skeleton");
		container.append("circle").attr("cx", 20).attr("cy", 20).attr("r", 50).attr("fill", "red");
	}

	removeSkeleton() {
		const container = this.getContainerSVG().select("g.skeleton");
		container.remove();
	}
}
