// MISC Imports
import { Skeleton } from "./skeleton";

export class SkeletonGrid extends Skeleton {
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
		this.setScales();
		this.drawBackdrop();
		this.drawXGrid();
		this.drawYGrid();
		this.setStyle("shimmer-lines");
	}
}
