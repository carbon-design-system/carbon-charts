import type { ScaleLinear, Selection } from 'd3'
import { getProperty } from '@/tools'
import { Skeleton } from './skeleton'
import { DOMUtils } from '@/services/essentials/dom-utils'

export class SkeletonLines extends Skeleton {
	type = 'skeleton-lines'
	xScale: ScaleLinear<number, number>
	yScale: ScaleLinear<number, number>
	backdrop: Selection<SVGElement | HTMLDivElement, unknown, Element, any>

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(animate = true) {
		const isDataLoading = getProperty(this.getOptions(), 'data', 'loading')

		const isSparkline =
			!getProperty(this.getOptions(), 'grid', 'x', 'enabled') &&
			!getProperty(this.getOptions(), 'grid', 'y', 'enabled') &&
			!getProperty(this.getOptions(), 'axes', 'bottom', 'visible') &&
			!getProperty(this.getOptions(), 'axes', 'left', 'visible')

		// display a skeleton if there is no chart data or the loading flag is set to true
		if (isDataLoading && !isSparkline) {
			super.renderGridSkeleton(isDataLoading)
		} else if (isDataLoading && isSparkline) {
			this.renderSparklineSkeleton(isDataLoading)
		} else {
			this.removeSkeleton()
		}
	}

	renderSparklineSkeleton(showShimmerEffect: boolean) {
		this.setScales()
		this.drawBackdrop(showShimmerEffect)
		this.drawSparkline(showShimmerEffect)
		this.updateBackdropStyle()
		if (showShimmerEffect) {
			this.setShimmerEffect('shimmer-lines')
		}
	}

	drawSparkline(showShimmerEffect: boolean) {
		const width = this.backdrop.attr('width')
		const ticksValues = [100]
		const sparklineSkeleton = DOMUtils.appendOrSelect(this.backdrop, 'g.y.skeleton')
		const update = sparklineSkeleton.selectAll('line').data(ticksValues)
		update
			.enter()
			.append('line')
			.merge(update as any)
			.attr('x1', 0)
			.attr('x2', width)
			.attr('y1', (d: any) => d)
			.attr('y2', (d: any) => d)

		sparklineSkeleton
			.selectAll('line')
			.classed('shimmer-effect-lines', showShimmerEffect)
			.classed('empty-state-lines', !showShimmerEffect)
			.style(
				'stroke',
				showShimmerEffect
					? `url(#${this.services.domUtils.generateElementIDString(`shimmer-lines`)})`
					: null
			)
	}

	updateBackdropStyle() {
		const svg = this.parent

		this.backdrop = DOMUtils.appendOrSelect(svg, 'svg.chart-skeleton.DAII').attr(
			'role',
			'presentation'
		)
		const backdropRect = DOMUtils.appendOrSelect(this.backdrop, 'rect.chart-skeleton-backdrop')

		backdropRect
			.classed('shimmer-effect-lines', false)
			.classed('shimmer-effect-sparkline', true)
			.style('stroke', null)
	}
}
