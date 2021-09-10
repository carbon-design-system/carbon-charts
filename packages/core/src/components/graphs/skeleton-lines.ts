// Internal Imports
import { Skeleton } from '../graphs/skeleton';
import { DOMUtils } from '../../services';
import { Tools } from '../../tools';

export class SkeletonLines extends Skeleton {
	type = 'skeleton-lines';
	xScale: any;
	yScale: any;
	backdrop: any;

	render() {
		const isDataLoading = Tools.getProperty(
			this.getOptions(),
			'data',
			'loading'
		);

		const isSparkline =
			!Tools.getProperty(this.getOptions(), 'grid', 'x', 'enabled') &&
			!Tools.getProperty(this.getOptions(), 'grid', 'y', 'enabled') &&
			!Tools.getProperty(
				this.getOptions(),
				'axes',
				'bottom',
				'visible'
			) &&
			!Tools.getProperty(this.getOptions(), 'axes', 'left', 'visible');

		// display a skeleton if there is no chart data or the loading flag is set to true
		if (isDataLoading && !isSparkline) {
			super.renderGridSkeleton(isDataLoading);
		} else if (isDataLoading && isSparkline) {
			this.renderSparklineSkeleton(isDataLoading);
		} else {
			this.removeSkeleton();
		}
	}

	renderSparklineSkeleton(showShimmerEffect: boolean) {
		this.setScales();
		this.drawBackdrop(showShimmerEffect);
		this.drawSparkline(showShimmerEffect);
		this.updateBackdropStyle();
		if (showShimmerEffect) {
			this.setShimmerEffect('shimmer-lines');
		}
	}

	drawSparkline(showShimmerEffect: boolean) {
		const width = this.backdrop.attr('width');
		const ticksValues = [100];
		const sparklineSkeleton = DOMUtils.appendOrSelect(
			this.backdrop,
			'g.y.skeleton'
		);
		const update = sparklineSkeleton.selectAll('line').data(ticksValues);
		update
			.enter()
			.append('line')
			.merge(update)
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', (d) => d)
			.attr('y2', (d) => d);

		sparklineSkeleton
			.selectAll('line')
			.classed('shimmer-effect-lines', showShimmerEffect)
			.classed('empty-state-lines', !showShimmerEffect);
	}

	updateBackdropStyle() {
		const svg = this.parent;

		this.backdrop = DOMUtils.appendOrSelect(svg, 'svg.chart-skeleton.DAII');
		const backdropRect = DOMUtils.appendOrSelect(
			this.backdrop,
			'rect.chart-skeleton-backdrop'
		);
		backdropRect.classed('shimmer-effect-lines', false);
		backdropRect.classed('shimmer-effect-sparkline', true);
	}
}
