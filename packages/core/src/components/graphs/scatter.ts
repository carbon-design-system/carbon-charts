// Internal Imports
import { Component } from "../component";
import { TooltipTypes, Roles, Events } from "../../interfaces";

// D3 Imports
import { select, event as d3Event } from "d3-selection";

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
				.classed("dots", true)
				.attr("role", Roles.GROUP);

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
			.classed("filled", d => this.model.getIsFilled(d.datasetLabel, d.label, d, filled))
			.classed("unfilled", d => !this.model.getIsFilled(d.datasetLabel, d.label, d, filled))
			.attr("cx", (d, i) => this.services.cartesianScales.getDomainValue(d, i))
			.transition(this.services.transitions.getTransition("scatter-update-enter", animate))
			.attr("cy", (d, i) => this.services.cartesianScales.getRangeValue(d, i))
			.attr("r", options.points.radius)
			.attr("fill", d => {
				if (this.model.getIsFilled(d.datasetLabel, d.label, d, filled)) {
					return this.model.getFillColor(d.datasetLabel, d.label, d);
				}
			})
			.attr("fill-opacity", filled ? 0.2 : 1)
			.attr("stroke", d => this.model.getStrokeColor(d.datasetLabel, d.label, d))
			.attr("opacity", 1)
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "point")
			.attr("aria-label", d => d.value);

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
			.on("mouseover mousemove", function(datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);

				hoveredElement.style("fill", (d: any) => self.model.getFillColor(d.datasetLabel, d.label, d));

				const eventNameToDispatch = d3Event.type === "mouseover" ? Events.Scatter.SCATTER_MOUSEOVER : Events.Scatter.SCATTER_MOUSEMOVE;
				// Dispatch mouse event
				self.services.events.dispatchEvent(eventNameToDispatch, {
					element: hoveredElement,
					datum
				});

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("click", function(datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Scatter.SCATTER_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function(datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				if (!self.configs.filled) {
					hoveredElement.style("fill", null);
				}

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Scatter.SCATTER_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

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
