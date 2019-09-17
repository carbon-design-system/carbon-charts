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
		const svg = this.getContainerSVG();

		const dotGroups = svg.selectAll("g.dots")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label);

		const dotGroupsEnter = dotGroups.enter()
			.append("g")
				.classed("dots", true);

		const dots = dotGroupsEnter.merge(dotGroups)
			.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

		const dotsEnter = dots.enter()
			.append("circle")
			.attr("opacity", 0);

		dotsEnter.merge(dots)
			.raise()
			.classed("dot", true)
			.classed("filled", this.options.filled)
			.attr("cx", (d, i) => this.services.axes.getXValue(d, i))
			.transition(this.services.transitions.getTransition("scatter-update-enter", animate))
			.attr("cy", (d, i) => this.services.axes.getYValue(d, i))
			.attr("r", 4)
			.attr("fill", d => {
				if (this.options.filled) {
					return "#f3f3f3";
				} else {
					return this.model.getFillScale()[d.datasetLabel](d.label) as any;
				}
			})
			.attr("fill-opacity", this.options.filled ? 1 : 0.2)
			.attr("stroke", d => this.model.getStrokeColor(d.datasetLabel, d.label, d.value))
			.attr("opacity", 1);

		dotGroups.exit()
			.attr("opacity", 0)
			.remove();

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
			label: datum.key || labels[i],
			datasetLabel: d.label,
			value: isNaN(datum) ? datum.value : datum
		}));
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("circle")
			.on("mouseover", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);

				if (self.options.filled) {
					hoveredElement.style("fill", (d: any) => self.model.getFillScale()[d.datasetLabel](d.label));
				}

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				if (self.options.filled) {
					hoveredElement.style("fill", null);
				}

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", {
					hoveredElement
				});
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("circle")
			.on("mouseover", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events.getDocumentFragment();
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
