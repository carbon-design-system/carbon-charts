import { interpolateNumber, interpolateRound, select } from 'd3'
import { getProperty } from '@/tools'
import { Pie } from './pie'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { RenderTypes } from '@/interfaces/enums'

export class Donut extends Pie {
	type = 'donut'
	renderType = RenderTypes.SVG

	render(animate = true) {
		// Call render() from Pie
		super.render(animate)

		const self = this

		// if there are no data, remove the center content
		// that is the old one and do nothing
		if (this.model.isDataEmpty()) {
			this.getComponentContainer().select('g.center').remove()
			return
		}

		const svg = DOMUtils.appendOrSelect(this.getComponentContainer(), 'g.center')
		const options = this.getOptions()

		// Compute the outer radius needed
		const radius = this.computeRadius()
		const donutTitle = getProperty(options, 'donut', 'center', 'label')

		// Add the number shown in the center of the donut
		DOMUtils.appendOrSelect(svg, 'text.donut-figure')
			.attr('text-anchor', 'middle')
			.style('dominant-baseline', () => {
				// Center figure if title is empty
				if (donutTitle === null || donutTitle === '') {
					return 'central'
				}

				return 'initial'
			})
			.style('font-size', () => options.donut.center.numberFontSize(radius))
			.transition()
			.call((t: any) =>
				this.services.transitions.setupTransition({
					transition: t,
					name: 'donut-figure-enter-update',
					animate
				})
			)
			.tween('text', function () {
				return self.centerNumberTween(select(this))
			})

		// Title will be rendered only if it isn't empty
		if (donutTitle !== null && donutTitle !== '') {
			// Add the label below the number in the center of the donut
			DOMUtils.appendOrSelect(svg, 'text.donut-title')
				.attr('text-anchor', 'middle')
				.style('font-size', () => options.donut.center.titleFontSize(radius))
				.attr('y', options.donut.center.titleYPosition(radius))
				.text(donutTitle)
		}
	}

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius()

		return radius * (3 / 4)
	}

	centerNumberTween(d3Ref: any) {
		const options = this.getOptions()

		let donutCenterFigure = getProperty(options, 'donut', 'center', 'number')
		if (donutCenterFigure === null) {
			donutCenterFigure = this.model.getDisplayData().reduce((accumulator: number, d: any) => {
				return accumulator + d[options.pie.valueMapsTo]
			}, 0)
		}

		// Remove commas from the current value string, and convert to an int
		const currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ''), 10) || 0

		let interpolateFunction
		if (currentValue % 1 === 0 && donutCenterFigure % 1 === 0) {
			interpolateFunction = interpolateRound
		} else {
			interpolateFunction = interpolateNumber
		}

		const i = interpolateFunction(currentValue, donutCenterFigure)

		return (t: any) => {
			const { numberFormatter } = options.donut.center
			if (numberFormatter) {
				d3Ref.text(numberFormatter(i(t)))
			} else {
				const { code: localeCode, number: localeNumberFormatter } = getProperty(options, 'locale')
				d3Ref.text(localeNumberFormatter(Math.floor(i(t)), localeCode))
			}
		}
	}
}
