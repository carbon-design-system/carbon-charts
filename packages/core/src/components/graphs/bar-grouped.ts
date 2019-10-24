// Internal Imports
import { Bar } from "./bar";

// D3 Imports
import { select } from "d3-selection";
import { color } from "d3-color";
import { ScaleBand, scaleBand } from "d3-scale";
import { TooltipTypes } from "../../interfaces";

export class GroupedBar extends Bar {
	type = "grouped-bar";

	groupScale: ScaleBand<any>;

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	getGroupWidth() {
		const { datasets } = this.model.getDisplayData();
		const padding = 5;

		return datasets.length * this.getBarWidth() + (padding * (datasets.length - 1));
	}

	setGroupScale() {
		const { datasets } = this.model.getDisplayData();

		this.groupScale = scaleBand()
			.domain(datasets.map(dataset => dataset.label))
			.rangeRound([0, this.getGroupWidth()]);
	}

	// Gets the correct width for bars based on options & configurations
	getBarWidth() {
		const { datasets } = this.model.getDisplayData();
		return Math.min(
			this.services.axes.getMainXAxis().scale.step() / 2 / datasets.length,
			super.getBarWidth()
		);
	}

	render(animate: boolean) {
		// Chart options mixed with the internal configurations
		const displayData = this.model.getDisplayData();

		this.setGroupScale();

		// Grab container SVG
		const svg = this.getContainerSVG();

		// Update data on bar groups
		const barGroups = svg.selectAll("g.bars")
			.data(displayData.labels);

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
			.attr("transform", (d, i) => {
				const xValue = this.services.axes.getXValue(d, i);
				return `translate(${xValue - this.getGroupWidth() / 2}, 0)`;
			})
			.selectAll("rect.bar")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

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
			.attr("x", d => this.groupScale(d.datasetLabel))
			.attr("width", this.getBarWidth.bind(this))
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("y", (d, i) => this.services.axes.getYValue(Math.max(0, d.value)))
			.attr("height", (d, i) => {
				return Math.abs(this.services.axes.getYValue(d, i) - this.services.axes.getYValue(0));
			})
			.attr("fill", d => this.model.getFillScale()[d.datasetLabel](d.label))
			.attr("opacity", 1);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	// TODO - This method could be re-used in more graphs
	addLabelsToDataPoints(d, index) {
		const { datasets } = this.model.getDisplayData();

		return datasets.map(dataset => ({
			label: d,
			datasetLabel: dataset.label,
			value: dataset.data[index]
		}));
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent)  => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent)  => {
		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-mouseout-bar"))
			.attr("opacity", 1);
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("rect.bar")
			.on("mouseover", function() {
				const hoveredElement = select(this);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
					.attr("fill", color(hoveredElement.attr("fill")).darker(0.7).toString());

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
					.attr("fill", (d: any) => self.model.getFillScale()[d.datasetLabel](d.label));

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
