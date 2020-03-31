// Internal Imports
import { Bar } from "./bar";
import {
	Events,
	Roles,
	TooltipTypes
} from "../../interfaces";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { color } from "d3-color";

export class SimpleBar extends Bar {
	type = "simple-bar";

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
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
				.classed("bars", true)
				.attr("role", Roles.GROUP);

		// Update data on all bars
		const bars = barGroupsEnter.merge(barGroups)
			.selectAll("path.bar")
			.data((d, i) => this.addLabelsToDataPoints(d, i), d => d.label);

		// Remove bars that are no longer needed
		bars.exit()
			.attr("opacity", 0)
			.remove();

		// Add the paths that need to be introduced
		const barsEnter = bars.enter()
			.append("path")
			.attr("opacity", 0);

		barsEnter.merge(bars)
			.classed("bar", true)
			.attr("width", this.getBarWidth.bind(this))
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("fill", d => this.model.getFillScale()(d.label))
			.attr("d", (d, i) => {
				/*
				* Orientation support for horizontal/vertical bar charts
				* Determine coordinates needed for a vertical set of paths
				* to draw the bars needed, and pass those coordinates down to
				* generateSVGPathString() to decide whether it needs to flip them
				*/
				const barWidth = this.getBarWidth();
				const x0 = this.services.cartesianScales.getDomainValue(d, i) - barWidth / 2;
				const x1 = x0 + barWidth;
				const y0 = this.services.cartesianScales.getRangeValue(0);
				const y1 = this.services.cartesianScales.getRangeValue(d, i);

				return Tools.generateSVGPathString(
					{ x0, x1, y0, y1 },
					this.services.cartesianScales.getOrientation()
				);
			})
			.attr("opacity", 1)
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "bar")
			.attr("aria-label", d => d.value);

		// Add event listeners to elements drawn
		this.addEventListeners();
	}

	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-hover-simple-bar"))
			.attr("opacity", d => (d.label !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("path.bar")
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
		this.parent.selectAll("path.bar")
			.on("mouseover", function(datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);
				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
					.attr("fill", color(hoveredElement.attr("fill")).darker(0.7).toString());

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOVER, {
					element: hoveredElement,
					datum
				});

				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("mousemove", function(datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEMOVE, {
					element: select(this),
					datum
				});
			})
			.on("click", function(datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function(datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
					.attr("fill", (d: any) => self.model.getFillScale()(d.label));

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, { hoveredElement });
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("path.bar")
			.on("mouseover", null)
			.on("mousemove", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events;
		eventsFragment.removeEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);
		eventsFragment.removeEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
	}
}
