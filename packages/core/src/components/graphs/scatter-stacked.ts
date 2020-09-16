// Internal Imports
import { Scatter } from "./scatter";
import { Roles } from "../../interfaces";
import { Tools } from "../../tools";

export class StackedScatter extends Scatter {
	type = "scatter-stacked";

	render(animate: boolean) {
		const isScatterEnabled = Tools.getProperty(this.model.getOptions(), "scatterDotEnabled");
		if (!this.configs.alwaysEnableScatterDot) {
			if (!isScatterEnabled) {
				return;
			}
		}
		// Grab container SVG
		const svg = this.getContainerSVG({ withinChartClip: true });

		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();

		const percentage = Object.keys(options.axes).some(
			(axis) => options.axes[axis].percentage
		);
		const stackedData = this.model.getStackedData({ percentage });

		// Update data on dot groups
		const circleGroups = svg
			.selectAll("g.dots")
			.data(stackedData, (d) => d[0][groupMapsTo]);

		// Remove dot groups that need to be removed
		circleGroups.exit().attr("opacity", 0).remove();

		// Add the dot groups that need to be introduced
		const circleGroupsEnter = circleGroups
			.enter()
			.append("g")
			.classed("dots", true)
			.attr("role", Roles.GROUP);

		// Update data on all circles
		const circles = circleGroupsEnter
			.merge(circleGroups)
			.selectAll("circle.dot")
			.data((d) => d);

		// Remove circles that need to be removed
		circles.exit().attr("opacity", 0).remove();

		// Add the dot groups that need to be introduced
		const enteringCircles = circles
			.enter()
			.append("circle")
			.classed("dot", true)
			.attr("opacity", 0);

		// Apply styling & position
		const circlesToStyle = enteringCircles.merge(circles).datum((d) => {
			const group = d[groupMapsTo];

			return {
				[groupMapsTo]: group,
				[domainIdentifier]: d["data"]["sharedStackKey"],
				[rangeIdentifier]: d[1]
			};
		});
		this.styleCircles(circlesToStyle, animate);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	getTooltipData(hoveredX, hoveredY) {
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();
		const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
		const options = this.model.getOptions();
		const { groupMapsTo } = options.data;
		const percentage = Object.keys(options.axes).some(
			(axis) => options.axes[axis].percentage
		);
		const stackedData = this.model.getStackedData({ percentage });
		const tooltipData = [];
		stackedData.forEach((groupData, groupDataIndex) => {
			groupData.forEach((datum, dataIndex) => {
				const group = datum[groupMapsTo];
				const domainValue = datum["data"]["sharedStackKey"];
				let rangeValue = datum["data"][group];
				const stackedRangeValue = datum[1];
				if (
					rangeValue &&
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
						rangeValue = this.model.getStackedData()[
							groupDataIndex
						][dataIndex]["data"][group];
					}

					tooltipData.push({
						[groupMapsTo]: group,
						[domainIdentifier]: domainValue,
						[rangeIdentifier]: rangeValue
					});
				}
			});
		});
		return tooltipData;
	}
}
