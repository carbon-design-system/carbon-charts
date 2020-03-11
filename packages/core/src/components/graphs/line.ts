// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { Roles } from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { line } from "d3-shape";

export class Line extends Component {
	type = "line";

	// TODORF - Remove these listeners in destroy()
	init() {
		// Highlight correct scatter on legend item hovers
		this.services.events.addEventListener("legend-item-onhover", e => {
			const { hoveredElement } = e.detail;

			this.parent.selectAll("g.lines")
				.transition(this.services.transitions.getTransition("legend-hover-line"))
				.attr("opacity", d => {
					if (d.label !== hoveredElement.datum()["key"]) {
						return Configuration.lines.opacity.unselected;
					}

					return Configuration.lines.opacity.selected;
				});
		});

		// Un-highlight lines on legend item mouseouts
		this.services.events.addEventListener("legend-item-onmouseout", e => {
			this.parent.selectAll("g.lines")
				.transition(this.services.transitions.getTransition("legend-mouseout-line"))
				.attr("opacity", Configuration.lines.opacity.selected);
		});
	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const displayData = this.model.getDisplayData();

		// D3 line generator function
		const lineGenerator = line()
			.x((d, i) => this.services.cartesianScales.getDomainValue(d, i))
			.y((d, i) => this.services.cartesianScales.getRangeValue(d, i))
			.curve(this.services.curves.getD3Curve());

		const datasets = {};
		this.model.getDisplayData().map(datum => {
			if (datasets[datum.group] !== null && datasets[datum.group] !== undefined) {
				datasets[datum.group].push(datum.value);
			} else {
				datasets[datum.group] = [datum.value];
			}
		});

		// Update the bound data on line groups
		const lineGroups = svg.selectAll("g.lines")
			.data(Object.keys(datasets));

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		lineGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add line groups that need to be introduced
		const enteringLineGroups = lineGroups.enter()
			.append("g")
			.classed("lines", true);

		const self = this;

		// Enter paths that need to be introduced
		const enteringPaths = enteringLineGroups.append("path")
			.attr("opacity", 0);

		// Apply styles and datum
		enteringPaths.merge(svg.selectAll("g.lines path"))
			.attr("stroke", function (d) {
				// return self.model.getStrokeColor(d.key);

				return "red";
			})
			.datum(d => displayData.filter(datum => datum.group === d))
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "line")
			.attr("aria-label", d => d.map(datum => datum.value || datum).join(","))
			// Transition
			.transition(this.services.transitions.getTransition("line-update-enter", animate))
			.attr("opacity", 1)
			.attr("class", "line")
			.attr("d", lineGenerator);
	}
}
