// MISC Imports
import { Skeleton } from "./skeleton";

export class SkeletonVertOrHoriz extends Skeleton {
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
		const orientation = this.services.cartesianScales.getOrientation();
		this.setScales();
		this.drawBackdrop();
		if (orientation === "vertical") {
			this.drawYGrid();
		}
		if (orientation === "horizontal") {
			this.drawXGrid();
		}
		this.setStyle("shimmer-lines");
	}
}
