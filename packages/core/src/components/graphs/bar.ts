// Internal Imports
import { Component } from '@/components/component'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { getProperty } from '@/tools'

export class Bar extends Component {
	// Gets the correct width for bars based on options & configurations
	protected getBarWidth() {
		const options = this.getOptions()
		if (options.bars.width) {
			return options.bars.width
		}

		const numberOfDatapoints = this.model.getDisplayData().length
		const mainXScale = this.services.cartesianScales.getMainXScale()
		const chartWidth = DOMUtils.getSVGElementSize((this as any).parent, {
			useAttrs: true
		}).width

		if (!(mainXScale as any).step) {
			const spacingFactor = getProperty(options, 'bars', 'spacingFactor')

			return Math.min(options.bars.maxWidth, (chartWidth * spacingFactor) / numberOfDatapoints)
		}

		return Math.min(options.bars.maxWidth, (mainXScale as any).step() / 2)
	}

	protected isOutsideZoomedDomain(x0: number, x1: number) {
		const dataCount = this.model.getDisplayData().length
		// if only one data point, never out of zoom domain
		// or it becomes a blank chart
		if (dataCount <= 1) {
			return false
		}

		const zoomDomain = this.model.get('zoomDomain')
		if (zoomDomain !== undefined) {
			const domainScale = this.services.cartesianScales.getDomainScale()
			return x0 < domainScale(zoomDomain[0]) || x1 > domainScale(zoomDomain[1])
		}
		return false
	}
}
