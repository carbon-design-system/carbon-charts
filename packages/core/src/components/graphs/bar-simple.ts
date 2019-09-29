// Internal Imports
import { Component } from "../component";

// D3 Imports
import { select } from "d3-selection";

export class SimpleBar extends Component {
	type = "simple-bar";

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

		// Gets the correct width for bars based on options & configurations
		const getBarWidth = () => {
			if (!this.services.axes.getMainXAxis().scale.step) {
				return options.bars.maxWidth;
			} else {
				return Math.min(
					options.bars.maxWidth,
					this.services.axes.getMainXAxis().scale.step() / 2
				);
			}
		};

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
			.data((d, i) => this.addLabelsToDataPoints(d, i));

		// Add the circles that need to be introduced
		const barsEnter = bars.enter()
			.append("rect")
			.attr("opacity", 0);

		barsEnter.merge(bars)
			.classed("bar", true)
			.attr("x", (d, i) => {
				const barWidth = getBarWidth();

				return this.services.axes.getXValue(d, i) - barWidth / 2;
			})
			.attr("width", getBarWidth)
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("y", (d, i) => this.services.axes.getYValue(Math.max(0, d.value)))
			.attr("fill", d => this.model.getFillScale()[d.datasetLabel](d.label))
			.attr("height", (d, i) => {
				return Math.abs(this.services.axes.getYValue(d, i) - this.services.axes.getYValue(0));
			})
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
