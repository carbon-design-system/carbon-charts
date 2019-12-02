// Internal Imports
import { Bar } from "./bar";

// D3 Imports
import { select } from "d3-selection";
import { color } from "d3-color";
import { TooltipTypes } from "../../interfaces";

export class SimpleBar extends Bar {
	type = "simple-bar";

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	render(animate: boolean) {
		// Grab container SVG
		const svg = this.getContainerSVG();

		// Update data on bar groups
		const barGroups = svg.selectAll("g.bars")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label);

		// Remove dot groups that need to be removed
		barGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add the bar groups that need to be introduced
		const barGroupsEnter = barGroups.enter()
			.append("g")
				.classed("bars", true);

		// Update data on all bars
		const bars = barGroupsEnter.merge(barGroups)
			.selectAll("rect.bar")
			.data((d, i) => this.addLabelsToDataPoints(d, i), d => d.label);

		// Remove bars that are no longer needed
		bars.exit()
			.attr("opacity", 0)
			.remove();

		// Add the circles that need to be introduced
		const barsEnter = bars.enter()
			.append("rect")
			.attr("opacity", 0);

		barsEnter.merge(bars)
			.classed("bar", true)
			.attr("x", (d, i) => {
				const barWidth = this.getBarWidth();

				return this.services.axes.getXValue(d, i) - barWidth / 2;
			})
			.attr("width", this.getBarWidth.bind(this))
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("y", (d, i) => this.services.axes.getYValue(Math.max(0, d.value)))
			.attr("fill", d => this.model.getFillScale()(d.label))
			.attr("height", (d, i) => {
				return Math.abs(this.services.axes.getYValue(d, i) - this.services.axes.getYValue(0));
			})
			.attr("opacity", 1);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-hover-simple-bar"))
			.attr("opacity", d => (d.label !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-mouseout-simple-bar"))
			.attr("opacity", 1);
	}

	// TODO - This method could be re-used in more graphs
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
		this.parent.selectAll("rect.bar")
			.on("mouseover", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);
				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
					.attr("fill", color(hoveredElement.attr("fill")).darker(0.7).toString());

				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
					.attr("fill", (d: any) => self.model.getFillScale()(d.label));

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", { hoveredElement });
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("rect.bar")
			.on("mouseover", null)
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
