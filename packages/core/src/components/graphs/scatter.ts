// Internal Imports
import { Component } from "../component";

// D3 Imports
import { select } from "d3-selection";
import { TooltipTypes } from "../../interfaces";

export class Scatter extends Component {
	type = "scatter";

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	render(animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();

		// Grab container SVG
		const svg = this.getContainerSVG();

		// Update data on dot groups
		const dotGroups = svg.selectAll("g.dots")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label);

		// Remove dot groups that need to be removed
		dotGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add the dot groups that need to be introduced
		const dotGroupsEnter = dotGroups.enter()
			.append("g")
				.classed("dots", true);

		// Update data on all circles
		const dots = dotGroupsEnter.merge(dotGroups)
			.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

		// Add the circles that need to be introduced
		const dotsEnter = dots.enter()
			.append("circle")
			.attr("opacity", 0);

		const { filled } = options.points;
		// Apply styling & position
		dotsEnter.merge(dots)
			.raise()
			.classed("dot", true)
			.classed("filled", d => this.model.getIsFilled(d.datasetLabel, d.label, d.value, d, filled))
			.classed("unfilled", d => !this.model.getIsFilled(d.datasetLabel, d.label, d.value, d, filled))
			.attr("cx", (d, i) => this.services.axes.getXValue(d, i))
			.transition(this.services.transitions.getTransition("scatter-update-enter", animate))
			.attr("cy", (d, i) => this.services.axes.getYValue(d, i))
			.attr("r", options.points.radius)
			.attr("fill", d => {
				if (this.model.getIsFilled(d.datasetLabel, d.label, d.value, d, filled)) {
					return this.model.getFillColor(d.datasetLabel, d.label, d.value, d);
				}
			})
			.attr("fill-opacity", filled ? 0.2 : 1)
			.attr("stroke", d => this.model.getStrokeColor(d.datasetLabel, d.label, d.value, d))
			.attr("opacity", 1);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("circle.dot")
			.transition(this.services.transitions.getTransition("legend-hover-scatter"))
			.attr("opacity", d => (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("circle.dot")
			.transition(this.services.transitions.getTransition("legend-mouseout-scatter"))
			.attr("opacity", 1);
	}

	// TODO - This method could be re-used in more graphs
	addLabelsToDataPoints(d, index) {
		const { labels } = this.model.getDisplayData();

		return d.data.map((datum, i) => ({
			date: datum.date,
			label: labels[i],
			datasetLabel: d.label,
			class: datum.class,
			value: isNaN(datum) ? datum.value : datum
		}));
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("circle")
			.on("mouseover mousemove", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);

				hoveredElement.style("fill", (d: any) => self.model.getFillColor(d.datasetLabel, d.label, d.value, d));

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				if (!self.configs.filled) {
					hoveredElement.style("fill", null);
				}

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", { hoveredElement });
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("circle")
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
