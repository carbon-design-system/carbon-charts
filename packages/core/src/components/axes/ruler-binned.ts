// Internal Imports
import { GenericSvgSelection, Ruler } from './ruler';
import { DOMUtils } from '../../services';
import {
	CartesianOrientations,
	ColorClassNameTypes,
	Events,
	RenderTypes,
} from '../../interfaces';
import { Tools } from '../../tools';

// D3 Imports
import { select } from 'd3-selection';

import { get } from 'lodash-es';

export class BinnedRuler extends Ruler {
	type = 'ruler-binned';
	renderType = RenderTypes.SVG;

	showRuler(event, [x, y]: [number, number]) {
		const svg = this.parent;

		const options = this.model.getOptions();

		const orientation: CartesianOrientations = this.services.cartesianScales.getOrientation();

		const rangeScale = this.services.cartesianScales.getRangeScale();
		const [yScaleEnd, yScaleStart] = rangeScale.range();

		const domainScale = this.services.cartesianScales.getDomainScale();
		const correspondingDomainValue = domainScale.invert(
			orientation === CartesianOrientations.VERTICAL ? x : y
		);

		const ruler = DOMUtils.appendOrSelect(svg, 'g.ruler').attr(
			'aria-label',
			'ruler'
		);
		const rulerLine = DOMUtils.appendOrSelect(ruler, 'line.ruler-line');

		const dataPointElements: GenericSvgSelection = svg.selectAll(
			'[role=graphics-symbol]'
		);

		const elementsToHighlight = dataPointElements.filter((d) => {
			if (
				parseFloat(get(d, 'data.x0')) <= correspondingDomainValue &&
				parseFloat(get(d, 'data.x1')) >= correspondingDomainValue
			) {
				return true;
			}
		});

		// some data point match
		if (elementsToHighlight.size() > 0) {
			/** if we pass from a trigger area to another one
			 * mouseout on previous elements won't get dispatched
			 * so we need to do it manually
			 */
			if (
				this.elementsToHighlight &&
				this.elementsToHighlight.size() > 0 &&
				!Tools.isEqual(this.elementsToHighlight, elementsToHighlight)
			) {
				this.hideRuler();
			}

			elementsToHighlight.dispatch('mouseover');

			// set current hovered elements
			this.elementsToHighlight = elementsToHighlight;

			const sampleMatchData = select(
				elementsToHighlight.nodes()[0]
			).datum();

			const x0 = parseFloat(get(sampleMatchData, 'data.x0'));
			const x1 = parseFloat(get(sampleMatchData, 'data.x1'));

			const activeDataGroupNames = this.model.getActiveDataGroupNames();

			const tooltipDataGroups = activeDataGroupNames
				.reverse()
				.map((dataGroupName) => ({
					label: 'Group',
					value: get(sampleMatchData, `data.${dataGroupName}`),
					class: this.model.getColorClassName({
						classNameTypes: [ColorClassNameTypes.TOOLTIP],
						dataGroupName,
					}),
				}))
				.filter((d) => d.value !== 0);
			const thereIsMatchingData = tooltipDataGroups.length > 0;

			if (thereIsMatchingData) {
				this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					mousePosition: [x, y],
					hoveredElement: rulerLine,
					items: [
						{
							label: get(options, 'bins.rangeLabel') || 'Range',
							value: `${x0} – ${x1}`,
						},
						...tooltipDataGroups,
						...(Tools.getProperty(
							options,
							'tooltip',
							'showTotal'
						) === true
							? [
									{
										label:
											get(
												options,
												'tooltip.totalLabel'
											) || 'Total',
										value: activeDataGroupNames.reduce(
											(accum, currentValue) =>
												accum +
												parseFloat(
													get(
														sampleMatchData,
														`data.${currentValue}`
													)
												),
											0
										),
									},
							  ]
							: []),
					],
				});

				ruler.attr('opacity', 1);

				const rulerPosition = domainScale((x0 + x1) / 2);

				// line snaps to matching point
				if (orientation === 'horizontal') {
					rulerLine
						.attr('x1', yScaleStart)
						.attr('x2', yScaleEnd)
						.attr('y1', rulerPosition)
						.attr('y2', rulerPosition);
				} else {
					rulerLine
						.attr('y1', yScaleStart)
						.attr('y2', yScaleEnd)
						.attr('x1', rulerPosition)
						.attr('x2', rulerPosition);
				}
			} else {
				this.hideRuler();
			}
		} else {
			this.hideRuler();
		}
	}
}
