// Internal Imports
import { Component } from "../component";

// D3 Imports
import { select } from "d3-selection";

export class Scatter extends Component {
	type = "scatter";

	init() {
		const eventsFragment = this.services.events.getDocumentFragment();

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
			.classed("filled", filled)
			.attr("cx", (d, i) => this.services.axes.getXValue(d, i))
			.transition(this.services.transitions.getTransition("scatter-update-enter", animate))
			.attr("cy", (d, i) => this.services.axes.getYValue(d, i))
			.attr("r", options.points.radius)
			.attr("fill", d => {
				if (filled) {
					return this.model.getFillScale()[d.datasetLabel](d.label) as any;
				} else {
					return;
				}
			})
			.attr("fill-opacity", filled ? 0.2 : 1)
			.attr("stroke", d => this.model.getStrokeColor(d.datasetLabel, d.label, d.value))
			.attr("opacity", 1);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleLegendOnHover = e => {
		const { hoveredElement } = e.detail;

		this.parent.selectAll("circle.dot")
			.transition(this.services.transitions.getTransition("legend-hover-scatter"))
			.attr("opacity", d => {
				if (d.datasetLabel !== hoveredElement.datum()["key"]) {
					return 0.3;
				}

				return 1;
			});
	}

	handleLegendMouseOut = e => {
		this.parent.selectAll("circle.dot")
			.transition(this.services.transitions.getTransition("legend-mouseout-scatter"))
			.attr("opacity", 1);
	}

	addLabelsToDataPoints(d, index) {
		const { labels } = this.model.getDisplayData();

		return d.data.map((datum, i) => ({
			date: datum.date,
			label: labels[i],
			datasetLabel: d.label,
			value: isNaN(datum) ? datum.value : datum
		}));
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("circle")
			.on("mousemove", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);

				hoveredElement.style("fill", (d: any) => self.model.getFillScale()[d.datasetLabel](d.label));

				const itemData = select(this).datum();
				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					itemData
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				if (!self.configs.filled) {
					hoveredElement.style("fill", null);
				}

				const itemData = select(this).datum();

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", {
					itemData
				});
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("circle")
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events.getDocumentFragment();
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
