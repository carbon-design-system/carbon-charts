// Internal Imports
import { Bar } from "./bar";
import { Tools } from "../../tools";
import {
	CartesianOrientations,
	Events,
	Roles,
	TooltipTypes
} from "../../interfaces";

// D3 Imports
import { map } from "d3-collection";
import { select } from "d3-selection";
import { color } from "d3-color";
import { ScaleBand, scaleBand } from "d3-scale";

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

	protected getAllDataLabels() {
		const displayData = this.model.getDisplayData();
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

		return map(displayData, datum => datum[domainIdentifier]).keys();
	}

	protected getDataCorrespondingToLabel(label: string) {
		const displayData = this.model.getDisplayData();
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

		return displayData.filter(datum => datum[domainIdentifier] === label);
	}

	getGroupWidth(allDataLabels: string[]) {
		const padding = 5;

		return allDataLabels.length * this.getBarWidth(allDataLabels) + (padding * (allDataLabels.length - 1));
	}

	setGroupScale(allDataLabels: string[]) {
		this.groupScale = scaleBand()
			.domain(this.model.getDataGroups().map(group => group.name))
			.rangeRound([0, this.getGroupWidth(allDataLabels)]);
	}

	// Gets the correct width for bars based on options & configurations
	getBarWidth(allDataLabels: string[]) {
		const domainScale = this.services.cartesianScales.getDomainScale();

		return Math.min(
			domainScale.step() / 2 / allDataLabels.length,
			super.getBarWidth(allDataLabels)
		);
	}

	render(animate: boolean) {
		// Chart options mixed with the internal configurations
		const displayData = this.model.getDisplayData();

		const options = this.model.getOptions();
		const { groupIdentifier } = options.data;
		const domainIdentifier = this.services.cartesianScales.getDomainIdentifier();

		// Get unique labels
		const allDataLabels = map(displayData, datum => datum[domainIdentifier]).keys();
		this.setGroupScale(allDataLabels);

		// Grab container SVG
		const svg = this.getContainerSVG();

		// Update data on bar groups
		const barGroups = svg.selectAll("g.bars")
			.data(allDataLabels, label => label);

		// Remove dot groups that need to be removed
		barGroups.exit()
			.attr("opacity", 0)
			.remove();

		// Add the bar groups that need to be introduced
		const barGroupsEnter = barGroups.enter()
			.append("g")
				.classed("bars", true)
				.attr("role", Roles.GROUP)
				.attr("aria-labelledby", d => d);

		// Update data on all bars
		const bars = barGroupsEnter.merge(barGroups)
			.attr("transform", (label, i) => {
				const scaleValue = this.services.cartesianScales.getDomainValue(label, i);
				const translateBy = scaleValue - this.getGroupWidth(allDataLabels) / 2 + this.getBarWidth(allDataLabels);

				if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
					return `translate(${translateBy}, 0)`;
				} else {
					// translate in the y direction for horizontal groups
					return `translate(0, ${translateBy})`;
				}
			})
			.selectAll("path.bar")
			.data(label => this.getDataCorrespondingToLabel(label));

		// Remove bars that are no longer needed
		bars.exit()
			.attr("opacity", 0)
			.remove();

		// Add the circles that need to be introduced
		const barsEnter = bars.enter()
			.append("path")
			.attr("opacity", 0);

		// code for vertical grouped bar charts
		barsEnter.merge(bars)
			.classed("bar", true)
			.transition(this.services.transitions.getTransition("bar-update-enter", animate))
			.attr("fill", d => this.model.getFillColor(d[groupIdentifier]))
			.attr("d", d => {
				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const centerX = this.groupScale(d[groupIdentifier]);
				const barWidth = this.getBarWidth(allDataLabels);

				const x0 = centerX - barWidth / 2;
				const x1 = centerX + barWidth / 2;
				const y0 = this.services.cartesianScales.getRangeValue(0);
				const y1 = this.services.cartesianScales.getRangeValue(d.value);

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

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent)  => {
		const { hoveredElement } = event.detail;

		const { groupIdentifier } = this.model.getOptions().data;

		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => (d[groupIdentifier] !== hoveredElement.datum()["name"]) ? 0.3 : 1);
	}

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent)  => {
		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-mouseout-bar"))
			.attr("opacity", 1);
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("path.bar")
			.on("mouseover", function(datum) {
				const hoveredElement = select(this);

				hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
					.attr("fill", color(hoveredElement.attr("fill")).darker(0.7).toString());

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOVER, {
					element: hoveredElement,
					datum
				});

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
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
					.attr("fill", (d: any) => self.model.getFillScale()[d.datasetLabel](d.label));

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Bar.BAR_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", { hoveredElement });
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
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
