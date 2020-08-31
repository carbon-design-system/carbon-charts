// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { CartesianOrientations, Events } from "../../interfaces";
import { GradientUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { area } from "d3-shape";

export class Area extends Component {
	type = "area";
	sparkline_id = "sparkline-id-" + Math.floor(Math.random() * 99999999999);

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
		let offsetRatio = ["0%", "100%"];
		let domain = [0, 0];
		
		const { cartesianScales } = this.services;

		const orientation = cartesianScales.getOrientation();
		const areaGenerator = area().curve(this.services.curves.getD3Curve());

		if (orientation === CartesianOrientations.VERTICAL) {
			areaGenerator
				.x((d, i) => cartesianScales.getDomainValue(d, i))
				.y0(cartesianScales.getRangeValue(0))
				.y1((d, i) => cartesianScales.getRangeValue(d, i));
			domain = this.services.cartesianScales.getMainYScale().domain();
			offsetRatio = offsetRatio = GradientUtils.getOffsetRatio(this.services.cartesianScales.getMainYScale().domain());
			console.log("!!! mainYRatio = ", offsetRatio);
		} else {
			areaGenerator
				.x0(cartesianScales.getRangeValue(0))
				.x1((d, i) => cartesianScales.getRangeValue(d, i))
				.y((d, i) => cartesianScales.getDomainValue(d, i));
			domain = this.services.cartesianScales.getMainXScale().domain();
			offsetRatio = GradientUtils.getOffsetRatio(this.services.cartesianScales.getMainXScale().domain());
			console.log("!!! mainYRatio = ", offsetRatio);
		}

		// Update the bound data on area groups
		const groupedData = this.model.getGroupedData();
		const areas = svg
			.selectAll("path.area")
			.data(groupedData, (group) => group.name);
		if (!this.parent.selectAll("defs").empty()) {
			this.parent.selectAll("defs").remove();
		}
		if (groupedData) {
			groupedData.forEach((data) => {
				GradientUtils.appendLinearGradient(
					this.parent, 
					data.name.replace(" ", "") + "_" + this.sparkline_id, 
					"0%", 
					"0%", 
					"0%", 
					"100%",
					!GradientUtils.constainNegativeAndPositiveDomainValue(domain) ?
					[
						{
							offset: "0%",
							color: this.model.getFillColor(data.name),
							opacity: "1"
						},
						{
							offset: "100%",
							color: this.model.getFillColor(data.name),
							opacity: "0"
						}
					] :
					[
						{
							offset: "0%",
							color: this.model.getFillColor(data.name),
							opacity: "1"
						},
						{
							offset: GradientUtils.getOffsetRatio(data.data)[0],
							color: this.model.getFillColor(data.name),
							opacity: "0"
						},
						{
							offset: "100%",
							color: this.model.getFillColor(data.name),
							opacity: "1"
						}
					]
				);
			})
		}
		
		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areas.exit().attr("opacity", 0).remove();

		const self = this;

		// Enter paths that need to be introduced
		const enteringAreas = areas.enter().append("path");
		if (Tools.getProperty(this.model.getOptions(), "isSparkline")) {
			enteringAreas
				.merge(areas)
				.style("fill", (group) => {
					return `url(#${group.name.replace(" ", "")}_${this.sparkline_id})`})
				.transition(
					this.services.transitions.getTransition(
						"area-update-enter",
						animate
					)
				)
				.attr("class", "area")
				.attr("d", (group) => {
					const { data } = group;
					return areaGenerator(data);
				});	
		} else {
			enteringAreas
			.attr("opacity", 0)
			.merge(areas)
			.attr("fill", (group) => {
				return this.model.getFillColor(group.name);
			})
			.transition(
				this.services.transitions.getTransition(
					"area-update-enter",
					animate
				)
			)
			.attr("opacity", Configuration.area.opacity.selected)
			.attr("class", "area")
			.attr("d", (group) => {
				const { data } = group;
				return areaGenerator(data);
			});
		}

		// Apply shared styles and datum
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
