// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { CartesianOrientations } from "../../interfaces";

// D3 Imports
import { area } from "d3-shape";

export class Area extends Component {
	type = "area";

	init() {
		// Highlight associated area on legend item hovers
		this.services.events.addEventListener("legend-item-onhover", e => {
			const { hoveredElement } = e.detail;

			this.parent.selectAll("g.areas")
				.transition(this.services.transitions.getTransition("legend-hover-area"))
				.attr("opacity", d => {
					if (d.label !== hoveredElement.datum()["key"]) {
						return 0.2;
					}

					return Configuration.lines.opacity.selected;
				});
		});

		// Un-highlight lines on legend item mouseouts
		this.services.events.addEventListener("legend-item-onmouseout", e => {
			this.parent.selectAll("g.areas")
				.transition(this.services.transitions.getTransition("legend-mouseout-area"))
				.attr("opacity", Configuration.lines.opacity.selected);
		});
	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const { cartesianScales } = this.services;

		const orientation = cartesianScales.getOrientation();
		const areaGenerator = area()
			.curve(this.services.curves.getD3Curve());

		if (orientation === CartesianOrientations.VERTICAL) {
			areaGenerator.x((d, i) => cartesianScales.getDomainValue(d, i))
				.y0(cartesianScales.getRangeValue(0))
				.y1((d, i) => cartesianScales.getRangeValue(d, i));
		} else {
			areaGenerator.x0(cartesianScales.getRangeValue(0))
				.x1((d, i) => cartesianScales.getRangeValue(d, i))
				.y((d, i) => cartesianScales.getDomainValue(d, i));
		}

		// Update the bound data on area groups
		const groupedData = this.model.getGroupedData();
		const areas = svg.selectAll("path.area")
			.data(groupedData, group => group.name);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areas.exit()
			.attr("opacity", 0)
			.remove();

		const self = this;

		// Enter paths that need to be introduced
		const enteringAreas = areas.enter()
			.append("path")
			.attr("opacity", 0);

		// Apply styles and datum
		enteringAreas.merge(svg.selectAll("path.area"))
			.attr("fill", group => {
				return this.model.getFillColor(group.name)
			})
			.transition(this.services.transitions.getTransition("area-update-enter", animate))
			.attr("opacity", 0.3)
			.attr("class", "area")
			.attr("d", group => {
				const { data } = group;
				return areaGenerator(data);
			});
	}
}
