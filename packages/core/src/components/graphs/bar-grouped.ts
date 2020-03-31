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
import { select } from "d3-selection";
import { color } from "d3-color";
import { ScaleBand, scaleBand } from "d3-scale";

export class GroupedBar extends Bar {
	type = "grouped-bar";

	groupScale: ScaleBand<any>;

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener(Events.Legend.ITEM_HOVER, this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener(Events.Legend.ITEM_MOUSEOUT, this.handleLegendMouseOut);
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
		const domainScale = this.services.cartesianScales.getDomainScale();

		return Math.min(
			domainScale.step() / 2 / datasets.length,
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
				.classed("bars", true)
				.attr("role", Roles.GROUP)
				.attr("aria-labelledby", d => d);

		// Update data on all bars
		const bars = barGroupsEnter.merge(barGroups)
			.attr("transform", (d, i) => {
				const scaleValue = this.services.cartesianScales.getDomainValue(d, i);
				const translateBy = scaleValue - this.getGroupWidth() / 2 + this.getBarWidth();

				if (this.services.cartesianScales.getOrientation() === CartesianOrientations.VERTICAL) {
					return `translate(${translateBy}, 0)`;
				} else {
					// translate in the y direction for horizontal groups
					return `translate(0, ${translateBy})`;
				}
			})
			.selectAll("path.bar")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

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
			.attr("fill", d => this.model.getFillScale()[d.datasetLabel](d.label))
			.attr("d", d => {
				/*
				 * Orientation support for horizontal/vertical bar charts
				 * Determine coordinates needed for a vertical set of paths
				 * to draw the bars needed, and pass those coordinates down to
				 * generateSVGPathString() to decide whether it needs to flip them
				 */
				const centerX = this.groupScale(d.datasetLabel);
				const barWidth = this.getBarWidth();
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

	// TODO - This method could be re-used in more graphs
	addLabelsToDataPoints(d, index) {
		const { datasets } = this.model.getDisplayData();

		return datasets.map(dataset => ({
			label: d,
			datasetLabel: dataset.label,
			value: dataset.data[index].value ? dataset.data[index].value : dataset.data[index]
		}));
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent)  => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("path.bar")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1);
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
					.attr("fill", (d: any) => self.model.getFillScale()[d.datasetLabel](d.label));

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
