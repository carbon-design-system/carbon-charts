// MISC Imports
import { Skeleton } from "./skeleton";

export class SkeletonVertOrHoriz extends Skeleton {
	render() {
		const areDataEmpty = this.model.isDataEmpty();
		const isDataLoading = this.model.getOptions().data.loading;

		if (areDataEmpty) {
			this.renderSkeleton(isDataLoading);
		} else if (!areDataEmpty && isDataLoading) {
			throw new Error(`There's something wrong. You can't have not empty data and data loading togheter.`);
		} else {
			this.removeSkeleton();
		}
	}

	renderSkeleton(shimmerEffect: boolean) {
		const orientation = this.services.cartesianScales.getOrientation();
		this.setScales();
		this.drawBackdrop(shimmerEffect);
		if (orientation === "vertical") {
			this.drawYGrid(shimmerEffect);
		}
		if (orientation === "horizontal") {
			this.drawXGrid(shimmerEffect);
		}
		this.setShimmerEffect("shimmer-lines");
	}
}
