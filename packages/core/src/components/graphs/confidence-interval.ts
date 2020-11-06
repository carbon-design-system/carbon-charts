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

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct area on legend item hovers
		eventsFragment.addEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);

		// Un-highlight area on legend item mouseouts
		eventsFragment.addEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}

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
				"Confidence Intervals can only be shown when having 1 single dataset"
			); // eslint-disable-line no-console
		}

		if (orientation === CartesianOrientations.VERTICAL) {
			areaGenerator
				.x((d, i) => cartesianScales.getDomainValue(d, i))
				.y0((d, i) =>
					confidence
						? cartesianScales.getRangeValue(d, i, confidence)[2]
						: cartesianScales.getRangeValue(d, i, confidence)
				)
				.y1((d, i) =>
					confidence
						? cartesianScales.getRangeValue(d, i, confidence)[1]
						: cartesianScales.getRangeValue(d, i, confidence)
				);
			domain = this.services.cartesianScales.getMainYScale().domain();
		} else {
			areaGenerator
				.x0((d, i) =>
					confidence
						? cartesianScales.getRangeValue(d, i, confidence)[2]
						: cartesianScales.getRangeValue(d, i, confidence)
				)
				.x1((d, i) =>
					confidence
						? cartesianScales.getRangeValue(d, i, confidence)[1]
						: cartesianScales.getRangeValue(d, i, confidence)
				)
				.y((d, i) => cartesianScales.getDomainValue(d, i));
			domain = this.services.cartesianScales.getMainXScale().domain();
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
						ColorClassNameTypes.STROKE],
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
			.style("stroke-dasharray", ("2, 2"))
			.attr("stroke-width", 0.7 + "px");
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent
			.selectAll("path.area")
			.transition(
				this.services.transitions.getTransition("legend-hover-area")
			)
			.attr("opacity", (group) => {
				if (group.name !== hoveredElement.datum()["name"]) {
					return Configuration.area.opacity.unselected;
				}

				return Configuration.area.opacity.selected;
			});
	};

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent
			.selectAll("path.area")
			.transition(
				this.services.transitions.getTransition("legend-mouseout-area")
			)
			.attr("opacity", Configuration.area.opacity.selected);
	};

	destroy() {
		// Remove event listeners
		this.parent
			.selectAll("path.area")
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_HOVER,
			this.handleLegendOnHover
		);
		eventsFragment.removeEventListener(
			Events.Legend.ITEM_MOUSEOUT,
			this.handleLegendMouseOut
		);
	}
}
