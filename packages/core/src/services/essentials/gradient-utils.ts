// Internal Imports
import { Service } from '../service';
import { DOMUtils } from '../';

export class GradientUtils extends Service {
	static appendOrUpdateLinearGradient(configs) {
		let lg = configs.svg.select(`defs linearGradient#${configs.id}`);
		if (lg.empty()) {
			lg = configs.svg
				.append('defs')
				.append('linearGradient')
				.attr('id', configs.id)
				.attr('x1', configs.x1)
				.attr('x2', configs.x2)
				.attr('y1', configs.y1)
				.attr('y2', configs.y2);
		}

		lg.selectAll('stop').remove();
		lg.selectAll('stop')
			.data(configs.stops)
			.enter()
			.append('stop')
			.attr('offset', (d) => d.offset)
			.style('stop-color', (d) => d.color)
			.style('stop-opacity', (d) => d.opacity);
	}

	static getOffsetRatio(domain) {
		const offsetRatio =
			(
				(Math.abs(domain[1]) * 100) /
				Math.abs(domain[0] - domain[1])
			).toFixed(2) + '%';
		return offsetRatio;
	}

	static getStops(domain, color) {
		const need3Stops = domain[0] < 0 && domain[1] > 0;
		let stops: object[] = [
			{
				offset: '0%',
				color: color,
				opacity: '0.6',
			},
			{
				offset: '80%',
				color: color,
				opacity: '0',
			},
		];

		if (need3Stops) {
			stops = [
				{
					offset: '0%',
					color: color,
					opacity: '0.6',
				},
				{
					offset: GradientUtils.getOffsetRatio(domain),
					color: color,
					opacity: '0',
				},
				{
					offset: '100%',
					color: color,
					opacity: '0.6',
				},
			];
		}
		return stops;
	}
}
