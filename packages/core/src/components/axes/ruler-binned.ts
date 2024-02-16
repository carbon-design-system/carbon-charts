import { select, type Selection } from 'd3'
import { get, isEqual } from 'lodash-es'
import { getProperty } from '@/tools'
import { Ruler } from './ruler'
import { DOMUtils } from '@/services/essentials/dom-utils'
import { CartesianOrientations, ColorClassNameTypes, Events, RenderTypes } from '@/interfaces/enums'

export class BinnedRuler extends Ruler {
	type = 'ruler-binned'
	renderType = RenderTypes.SVG

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	showRuler(event: CustomEvent, [x, y]: [number, number]) {
		const svg = this.parent

		const options = this.model.getOptions()
		const { cartesianScales } = this.services

		const orientation: CartesianOrientations = cartesianScales.getOrientation()

		const rangeScale = cartesianScales.getRangeScale()
		const [yScaleEnd, yScaleStart] = rangeScale.range()

		const domainScale = cartesianScales.getDomainScale()

		const correspondingDomainValue = domainScale.invert(
			orientation === CartesianOrientations.VERTICAL ? x : y
		)

		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler').attr('aria-label', 'ruler')
		const rulerLine = DOMUtils.appendOrSelect(ruler, 'line.ruler-line')

		const dataPointElements = svg.selectAll('[role=graphics-symbol]') as Selection<
			SVGGraphicsElement,
			any,
			Element,
			any
		>

		const elementsToHighlight = dataPointElements.filter((d: any) => {
			if (
				parseFloat(get(d, 'data.x0')) <= correspondingDomainValue &&
				parseFloat(get(d, 'data.x1')) >= correspondingDomainValue
			) {
				return true
			}
		})

		// some data point match
		if (elementsToHighlight.size() > 0) {
			/** if we pass from a trigger area to another one
			 * mouseout on previous elements won't get dispatched
			 * so we need to do it manually
			 */
			if (
				this.elementsToHighlight &&
				this.elementsToHighlight.size() > 0 &&
				!isEqual(this.elementsToHighlight, elementsToHighlight)
			) {
				this.hideRuler()
			}

			elementsToHighlight.dispatch('mouseover')

			// set current hovered elements
			this.elementsToHighlight = elementsToHighlight

			const sampleMatchData = select(elementsToHighlight.nodes()[0]).datum()

			const x0 = parseFloat(get(sampleMatchData, 'data.x0'))
			const x1 = parseFloat(get(sampleMatchData, 'data.x1'))

			const activeDataGroupNames = this.model.getActiveDataGroupNames()

			const tooltipDataGroups = activeDataGroupNames
				.reverse()
				.map((dataGroupName: string) => ({
					label: dataGroupName,
					value: get(sampleMatchData, `data.${dataGroupName}`),
					class: this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.TOOLTIP],
						dataGroupName
					})
				}))
				.filter((d: any) => d.value !== 0)
			const thereIsMatchingData = tooltipDataGroups.length > 0

			if (thereIsMatchingData) {
				this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					mousePosition: [x, y],
					hoveredElement: rulerLine,
					items: [
						{
							label: get(options, 'bins.rangeLabel') || 'Range',
							value: `${x0} – ${x1}`
						},
						...tooltipDataGroups,
						...(getProperty(options, 'tooltip', 'showTotal') === true
							? [
									{
										label:
											get(options, 'locale.translations.total') ||
											get(options, 'tooltip.totalLabel') ||
											'Total',
										value: activeDataGroupNames.reduce(
											(accum: number, currentValue: any) =>
												accum + parseFloat(get(sampleMatchData, `data.${currentValue}`)),
											0
										)
									}
								]
							: [])
					]
				})

				ruler.attr('opacity', 1)

				const rulerPosition = domainScale((x0 + x1) / 2)

				// line snaps to matching point
				if (orientation === 'horizontal') {
					rulerLine
						.attr('x1', yScaleStart)
						.attr('x2', yScaleEnd)
						.attr('y1', rulerPosition)
						.attr('y2', rulerPosition)
				} else {
					rulerLine
						.attr('y1', yScaleStart)
						.attr('y2', yScaleEnd)
						.attr('x1', rulerPosition)
						.attr('x2', rulerPosition)
				}
			} else {
				this.hideRuler()
			}
		} else {
			this.hideRuler()
		}
	}
}
