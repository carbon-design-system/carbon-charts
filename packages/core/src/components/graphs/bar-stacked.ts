// Internal Imports
import { Tools } from "../../tools";
import { Bar } from "./bar";
import {
	Roles,
	TooltipTypes,
	Events,
	CartesianOrientations
} from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { color } from "d3-color";
import { map } from "d3-collection";

export class StackedBar extends Bar {
	type = "stacked-bar";

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

		// Chart options mixed with the internal configurations
		const displayData = this.model.getDisplayData();
		const options = this.model.getOptions();
		const { groupIdentifier } = options.data;

		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

		// Create the data and keys that'll be used by the stack layout
		const stackKeys = map(displayData, datum => datum[domainIdentifier]).keys();
		const stackData = this.model.getStackedData();

		// Update data on all bar groups
		const barGroups = svg.selectAll("g.bars")
			.data(stackData, d => d.key);

		// Remove elements that need to be exited
		// We need exit at the top here to make sure that
		// Data filters are processed before entering new elements
		// Or updating existing ones
		barGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add bar groups that need to be introduced
		barGroups.enter()
			.append("g")
			.classed("bars", true)
			.attr("role", Roles.GROUP);

		// Update data on all bars
		const bars = svg.selectAll("g.bars").selectAll("path.bar")
			// Remove bars with a start and end value of 0
			.data(data => data.filter(d => !(d[0] === 0 && d[1] === 0)));

		// Remove bars that need to be removed
		bars.exit()
			.remove();

		bars.enter()
			.append("path")
			.merge(bars)
			.classed("bar", true)
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("fill", d => this.model.getFillColor(d[groupIdentifier]))
			.attr("d", (d, i) => {
				const key = stackKeys[i];

				/*
				* Orientation support for horizontal/vertical bar charts
				* Determine coordinates needed for a vertical set of paths
				* to draw the bars needed, and pass those coordinates down to
				* generateSVGPathString() to decide whether it needs to flip them
				*/
				const barWidth = this.getBarWidth();
				const x0 = this.services.cartesianScales.getDomainValue(key, i) - barWidth / 2;
				const x1 = x0 + barWidth;
				const y0 = this.services.cartesianScales.getRangeValue(d[0], i);
				let y1 = this.services.cartesianScales.getRangeValue(d[1], i);

				// Add the divider gap
				if (Math.abs(y1 - y0) > 0 && Math.abs(y1 - y0) > options.bars.dividerSize) {
					if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
						y1 += 1;
					} else {
						y1 -= 1;
					}
				}

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

		// Add event listeners for the above elements
		this.addEventListeners();
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-mouseout-bar"))
			.attr("opacity", 1);
	}

	addEventListeners() {
		const options = this.model.getOptions();
		const { groupIdentifier } = options.data;

		const self = this;
		this.parent.selectAll("path.bar")
			.on("mouseover", function (datum) {
				const hoveredElement = select(this);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
					.attr("fill", color(hoveredElement.attr("fill")).darker(0.7).toString());

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOVER, {
					element: hoveredElement,
					datum
				});
			})
			.on("mousemove", function(datum) {
				const hoveredElement = select(this);
				const itemData = datum.data[datum.group];

				const rangeIdentifier = self.services.cartesianScales.getRangeIdentifier();
				const { groupIdentifier } = self.model.getOptions().data;
		
				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					data: {
						[rangeIdentifier]: itemData,
						[groupIdentifier]: datum.group
					},
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("click", function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
					.attr("fill", (d: any) => self.model.getFillColor(d[groupIdentifier]));

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
