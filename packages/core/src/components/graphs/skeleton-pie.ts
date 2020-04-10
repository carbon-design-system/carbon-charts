// MISC Imports
import { Skeleton } from "./skeleton";

export class SkeletonPie extends Skeleton {
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
		const outerRadius = this.computeOuterRadius();
		const innerRadius = 0;
		this.drawRing(outerRadius, innerRadius, shimmerEffect);
		if (shimmerEffect) {
			this.setShimmerEffect("shimmer-areas");
		}
	}
}
