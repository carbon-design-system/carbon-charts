// Internal Imports
import { Component } from "../component";
import * as Configuration from "../../configuration";
import { Roles, Events } from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { line } from "d3-shape";

export class Line extends Component {
	type = "line";

	init() {
		const { events } = this.services;
		// Highlight correct line legend item hovers
		events.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
		// Un-highlight lines on legend item mouseouts
		events.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
	}

	render(animate = true) {
		const svg = this.getContainerSVG();

		// D3 line generator function
		const lineGenerator = line()
			.x((d, i) => this.services.cartesianScales.getDomainValue(d, i))
			.y((d, i) => this.services.cartesianScales.getRangeValue(d, i))
			.curve(this.services.curves.getD3Curve())
			.defined((datum: any, i) => {
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
				const value = datum[rangeIdentifier];
				if (value === null || value === undefined) {
					return false;
				}

				return true;
			});

		const groupedData = this.model.getGroupedData();
		// Update the bound data on line groups
		const lineGroups = svg.selectAll("g.lines")
			.data(groupedData, group => group.name);

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

		// Enter paths that need to be introduced
		const enteringPaths = enteringLineGroups.append("path")
			.attr("opacity", 0);

		// Apply styles and datum
		enteringPaths.merge(svg.selectAll("g.lines path"))
			.attr("stroke", (group, i) => {
				return this.model.getStrokeColor(group.name)
			})
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "line")
			.attr("aria-label", group => {
				const { data } = group;
				const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
				return data.map(datum => datum[rangeIdentifier]).join(",");
			})
			// Transition
			.transition(this.services.transitions.getTransition("line-update-enter", animate))
			.attr("opacity", 1)
			.attr("class", "line")
			.attr("d", group => {
				const { data } = group;
				return lineGenerator(data);
			});
	}


	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("g.lines")
			.transition(this.services.transitions.getTransition("legend-hover-line"))
			.attr("opacity", group => {
				if (group.name !== hoveredElement.datum()["key"]) {
					return Configuration.lines.opacity.unselected;
				}

				return Configuration.lines.opacity.selected;
			});
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("g.lines")
			.transition(this.services.transitions.getTransition("legend-mouseout-line"))
			.attr("opacity", Configuration.lines.opacity.selected);
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("path")
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
	}
}
