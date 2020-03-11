// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { Roles } from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { area } from "d3-shape";

export class Area extends Component {
	type = "area";

	areaGenerator: any;

	// TODORF - Remove these listeners in destroy()
	init() {
		// Highlight correct scatter on legend item hovers
		this.services.events.addEventListener("legend-item-onhover", e => {
			const { hoveredElement } = e.detail;

			this.parent
				.selectAll("g.areas")
				.transition(
					this.services.transitions.getTransition("legend-hover-area")
				)
				.attr("opacity", d => {
					if (d.label !== hoveredElement.datum()["key"]) {
						return Configuration.areas.opacity.unselected;
					}

					return Configuration.areas.opacity.selected;
				});
		});

		// Un-highlight areas on legend item mouseouts
		this.services.events.addEventListener("legend-item-onmouseout", e => {
			this.parent
				.selectAll("g.areas")
				.transition(
					this.services.transitions.getTransition(
						"legend-mouseout-area"
					)
				)
				.attr("opacity", Configuration.areas.opacity.selected);
		});
	}

	render(animate = true) {
		const svg = this.getContainerSVG();

		const mainYScale = this.services.cartesianScales.getMainYScale();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// D3 area generator function
		this.areaGenerator = area()
			.x((d, i) => this.services.cartesianScales.getDomainValue(d, i))
			.y1((d, i) => yScaleEnd)
			.y0((d, i) => this.services.cartesianScales.getRangeValue(d, i))
			.curve(this.services.curves.getD3Curve());

		// Update the bound data on area groups
		const areaGroups = svg
			.selectAll("g.areas")
			.data(
				this.model.getDisplayData().datasets,
				dataset => dataset.label
			);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areaGroups
			.exit()
			.attr("opacity", 0)
			.remove();

		// Add area groups that need to be introduced
		const enteringAreaGroups = areaGroups
			.enter()
			.append("g")
			.classed("areas", true);

		const self = this;

		// Enter paths that need to be introduced
		const enteringPaths = enteringAreaGroups
			.append("path")
			.attr("opacity", 0);

		// Apply styles and datum
		enteringPaths
			.merge(svg.selectAll("g.areas path"))
			.attr("stroke", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self.model.getStrokeColor(parentDatum.label);
			})
			.attr("fill", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self.model.getFillColor(parentDatum.label);
			})
			.datum(function(d) {
				const parentDatum = select(this.parentNode).datum() as any;
				this._datasetLabel = parentDatum.label;

				return parentDatum.data;
			})
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "area")
			.attr("aria-label", d =>
				d.map(datum => datum.value || datum).join(",")
			)
			// Transition
			.transition(
				this.services.transitions.getTransition(
					"area-update-enter",
					animate
				)
			)
			.attr("opacity", 1)
			.attr("class", "area")
			.attr("d", this.areaGenerator);
	}
}
