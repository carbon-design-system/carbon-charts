// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";

// D3 Imports
import { area } from "d3-shape";
import { select } from "d3-selection";

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

		const mainYAxis = this.services.axes.getMainYAxis();
		const [ height ] = mainYAxis.scale.range();
		const areaGenerator = area()
			.x((d, i) => this.services.axes.getXValue(d, i))
			.y0(height)
			.y1((d, i) => this.services.axes.getYValue(d, i))
			.curve(this.services.curves.getD3Curve());

		// Update the bound data on area groups
		const areaGroups = svg.selectAll("g.areas")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		areaGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add area groups that need to be introduced
		const enteringAreaGroups = areaGroups.enter()
			.append("g")
			.classed("areas", true);

		const self = this;

		// Enter paths that need to be introduced
		const enteringPaths = enteringAreaGroups.append("path")
			.attr("opacity", 0);

		// Apply styles and datum
		enteringPaths.merge(svg.selectAll("g.areas path"))
			.datum(function (d) {
				const parentDatum = select(this.parentNode).datum() as any;
				this._datasetLabel = parentDatum.label;

				return parentDatum.data;
			})
			.attr("fill", function (d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self.model.getFillScale()[parentDatum.label](d.label) as any;
			})
			.transition(this.services.transitions.getTransition("area-update-enter", animate))
			.attr("opacity", 0.3)
			.attr("class", "area")
			.attr("d", areaGenerator);
	}
}
