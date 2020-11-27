// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import {
	CartesianOrientations,
	Events,
	ColorClassNameTypes
} from "../../interfaces";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";
import settings from "carbon-components/es/globals/js/settings";

// D3 Imports
import { area } from "d3-shape";
import { select } from "d3-selection";

export class ConfidenceInterval extends Component {
	type = "area";

	render(animate = true) {
		const svg = this.getContainerSVG({ withinChartClip: true });
		let domain = [0, 0];

		const { cartesianScales } = this.services;

		const orientation = cartesianScales.getOrientation();
		const areaGenerator = area().curve(this.services.curves.getD3Curve());

		// Update the bound data on area groups
		const groupedData = this.model.getGroupedData();

		const confidence = groupedData && groupedData.length === 1;

		if (!confidence) {
			console.warn(
				`Confidence Intervals can only be shown when having 1 single datagroup, you've supplied ${groupedData.length}`
			); // eslint-disable-line no-console
		}

		const upperConfidenceBound = (d, i) => confidence ? cartesianScales.getConfidenceScaledValues(d, i)[0] : cartesianScales.getRangeValue;
		const lowerConfidenceBound = (d, i) => confidence ? cartesianScales.getConfidenceScaledValues(d, i)[1] : cartesianScales.getRangeValue;

		if (orientation === CartesianOrientations.VERTICAL) {
			areaGenerator
				.x((d, i) => cartesianScales.getDomainValue(d, i))
				.y0((d, i) => upperConfidenceBound(d, i))
				.y1((d, i) => lowerConfidenceBound(d, i));
			domain = cartesianScales.getMainYScale().domain();
		} else {
			areaGenerator
				.x0((d, i) => upperConfidenceBound(d, i))
				.x1((d, i) => lowerConfidenceBound(d, i))
				.y((d, i) => cartesianScales.getDomainValue(d, i));
			domain = cartesianScales.getMainXScale().domain();
		}

		const areas = svg
			.selectAll("path.area")
			.data(groupedData, (group) => group.name);

		const chartprefix = Tools.getProperty(
			this.model.getOptions(),
			"style",
			"prefix"
		);
		const chartSVG = DOMUtils.appendOrSelect(
			select(this.services.domUtils.getHolder()),
			`svg.${settings.prefix}--${chartprefix}--chart-svg`
		);

		// The fill value of area has been overwritten, get color value from stroke color class instead
		const strokePathElement = chartSVG
			.select(
				`path.${this.model.getColorClassName({
					classNameTypes: [ColorClassNameTypes.STROKE],
					dataGroupName: groupedData[0].name
				})}`
			)
			.node();
		const colorValue = strokePathElement
			? getComputedStyle(strokePathElement, null).getPropertyValue(
					"stroke"
			  )
			: null;

		// make sure there is no linearGradient if no gradient is allowed
		if (!this.parent.selectAll("defs linearGradient").empty()) {
			this.parent.selectAll("defs linearGradient").each(function () {
				this.parentNode.remove();
			});
		}

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areas.exit().attr("opacity", 0).remove();

		const self = this;

		// Enter paths that need to be introduced
		const enteringAreas = areas.enter().append("path");
		enteringAreas
			.attr("opacity", 0)
			.merge(areas)
			.attr("class", "area")
			.attr("class", (group) =>
				this.model.getColorClassName({
					classNameTypes: [
						ColorClassNameTypes.FILL,
						ColorClassNameTypes.STROKE
					],
					dataGroupName: group.name,
					originalClassName: "area"
				})
			)
			.attr("fill", (group) => self.model.getFillColor(group.name))
			.transition(
				this.services.transitions.getTransition(
					"area-update-enter",
					animate
				)
			)
			.attr("opacity", 1)
			.attr("fill-opacity", Configuration.area.opacity.selected)
			.attr("d", (group) => {
				const { data } = group;
				return areaGenerator(data);
			})
			.attr("stroke", (group) => this.model.getStrokeColor(group.name))
			.style("stroke-dasharray", "2, 2")
			.attr("stroke-width", 0.7 + "px");
	}
}
