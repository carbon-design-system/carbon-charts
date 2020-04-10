// MISC Imports
import { Skeleton } from "./skeleton";

export class SkeletonGrid extends Skeleton {
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
		this.setScales();
		this.drawBackdrop(shimmerEffect);
		this.drawXGrid(shimmerEffect);
		this.drawYGrid(shimmerEffect);
		if (shimmerEffect) {
			this.setShimmerEffect("shimmer-lines");
		}
	}
}
