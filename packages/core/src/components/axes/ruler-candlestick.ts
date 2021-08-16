// Internal Imports
import { Ruler } from './ruler';
import { Events } from '../../interfaces';
import { Tools } from '../../tools';

export class CandlestickRuler extends Ruler {
	type = 'ruler-candlestick';

	showTooltip(rulerLine, dataPointsMatchingRulerLine, x, y) {
		const datum = Tools.getProperty(dataPointsMatchingRulerLine, 0);

		const domainScale = this.services.cartesianScales.getDomainScale();
		if (datum) {
			this.services.events.dispatchEvent(Events.Tooltip.SHOW, {
				mousePosition: [x, y],
				hoveredElement: rulerLine,
				items: [
					{
						label: 'Date',
						value: domainScale.invert(
							Tools.getProperty(datum, 'domainValue')
						),
					},
					{
						label: 'Open',
						value: Tools.getProperty(datum, 'originalData', 'open'),
					},
					{
						label: 'High',
						value: Tools.getProperty(datum, 'originalData', 'high'),
					},
					{
						label: 'Low',
						value: Tools.getProperty(datum, 'originalData', 'low'),
					},
					{
						label: 'Close',
						value: Tools.getProperty(
							datum,
							'originalData',
							'close'
						),
					},
				],
			});
		}
	}
}
