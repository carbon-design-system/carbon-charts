// Internal Imports
import { Scatter } from './scatter';
import { RenderTypes, Roles } from '../../interfaces';
import { Tools } from '../../tools';

export class StackedScatter extends Scatter {
	type = 'scatter-stacked';
	renderType = RenderTypes.SVG;

	render(animate: boolean) {
		const isScatterEnabled = Tools.getProperty(
			this.getOptions(),
			'points',
			'enabled'
		);
		if (!isScatterEnabled) {
			return;
		}
		// Grab container SVG
		const svg = this.getComponentContainer({ withinChartClip: true });

		const options = this.getOptions();
		const { groupMapsTo } = options.data;

		const percentage = Object.keys(options.axes).some(
			(axis) => options.axes[axis].percentage
		);
		const stackedData = this.model.getStackedData({
			groups: this.configs.groups,
			percentage,
		});

		// Update data on dot groups
		const circleGroups = svg
			.selectAll('g.dots')
			.data(stackedData, (d) => Tools.getProperty(d, 0, groupMapsTo));

		// Remove dot groups that need to be removed
		circleGroups.exit().attr('opacity', 0).remove();

		// Add the dot groups that need to be introduced
		const circleGroupsEnter = circleGroups
			.enter()
			.append('g')
			.classed('dots', true)
			.attr('role', Roles.GROUP);

		// Update data on all circles
		const circles = circleGroupsEnter
			.merge(circleGroups)
			.selectAll('circle.dot')
			.data((d) => d);

		// Remove circles that need to be removed
		circles.exit().attr('opacity', 0).remove();

		// Add the dot groups that need to be introduced
		const enteringCircles = circles
			.enter()
			.append('circle')
			.classed('dot', true)
			.attr('opacity', 0);

		// Apply styling & position
		const circlesToStyle = enteringCircles.merge(circles).datum((d) => {
			const group = d[groupMapsTo];
			const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(
				d
			);
			const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
				d
			);

			return {
				[groupMapsTo]: group,
				[domainIdentifier]: d['data']['sharedStackKey'],
				[rangeIdentifier]: d[1],
			};
		});
		this.styleCircles(circlesToStyle, animate);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	getTooltipData(hoveredX, hoveredY) {
		const options = this.getOptions();
		const { groupMapsTo } = options.data;
		const percentage = Object.keys(options.axes).some(
			(axis) => options.axes[axis].percentage
		);
		const stackedData = this.model.getStackedData({
			groups: this.configs.groups,
			percentage,
		});
		const tooltipData = [];
		stackedData.forEach((groupData, groupDataIndex) => {
			groupData.forEach((datum, dataIndex) => {
				const group = datum[groupMapsTo];
				const domainValue = datum['data']['sharedStackKey'];
				let rangeValue = datum['data'][group];
				const stackedRangeValue = datum[1];
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(
					datum
				);
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
					datum
				);

				if (
					rangeValue !== null &&
					rangeValue !== undefined &&
					hoveredX ===
						this.services.cartesianScales.getDomainValue(
							domainValue
						) &&
					hoveredY ===
						this.services.cartesianScales.getRangeValue(
							stackedRangeValue
						)
				) {
					if (percentage) {
						rangeValue = this.model.getStackedData({
							groups: this.configs.groups,
						})[groupDataIndex][dataIndex]['data'][group];
					}

					if (rangeValue !== null) {
						tooltipData.push({
							[groupMapsTo]: group,
							[domainIdentifier]: domainValue,
							[rangeIdentifier]: rangeValue,
						});
					}
				}
			});
		});

		return this.model
			.getDisplayData(this.configs.groups)
			.filter((datapoint) => {
				const domainIdentifier = this.services.cartesianScales.getDomainIdentifier(
					datapoint
				);
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier(
					datapoint
				);
				return (
					tooltipData.find((tooltipDatapoint) => {
						return (
							tooltipDatapoint[groupMapsTo] ==
								datapoint[groupMapsTo] &&
							tooltipDatapoint[domainIdentifier] ==
								datapoint[domainIdentifier] &&
							tooltipDatapoint[rangeIdentifier] ==
								datapoint[rangeIdentifier]
						);
					}) !== undefined
				);
			});
	}
}
