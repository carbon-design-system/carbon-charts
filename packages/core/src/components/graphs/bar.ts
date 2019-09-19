// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { stack } from "d3-shape";


// Add datasetLabel to each piece of data
// To be used to get the fill color
const addLabelsAndValueToData = (d) => {
	Object.keys(d).map(key => {
		if (typeof d[key] === "object") {
			d[key]["datasetLabel"] = d.key;
			d[key]["label"] = d[key].data["label"];
			d[key]["value"] = d[key].data[d.key];
		}
	});

	return d;
};

export class Bar extends Component {
	type = "bar";

	init() {
		const eventsFragment = this.services.events.getDocumentFragment();

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	getStackData() {
		const displayData = this.model.getDisplayData();

		// Create the stack datalist
		const stackDataArray = displayData.labels.map((label, i) => {
			const correspondingData = {};

			displayData.datasets.forEach(dataset => {
				correspondingData[dataset.label] = dataset.data[i];
			});

			correspondingData["label"] = label;

			return correspondingData;
		});

		return stackDataArray;
	}

	render(animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();

		// Grab container SVG
		const svg = this.getContainerSVG();

		// Create the data and keys that'll be used by the stack layout
		const displayData = this.model.getDisplayData();
		const stackDataArray = this.getStackData();
		const stackKeys = displayData.datasets.map(dataset => dataset.label);

		// Update data on all bar groups
		const barGroups = svg.selectAll("g.bars")
			.data(stack().keys(stackKeys)(stackDataArray), d => d.key);

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
			.classed("bars", true);

		// Update data on all bars
		const bars = svg.selectAll("g.bars").selectAll("rect.bar")
			.data(d => addLabelsAndValueToData(d), d => d.label);

		// Remove bars that need to be removed
		bars.exit()
			.remove();

		const getBarWidth = () => {
			return Math.min(
				options.bars.maxWidth,
				this.services.axes.getMainXAxis().scale.step() / 2
			);
		}
		// Update styling and position on existing bars
		// As well as bars that were just added
		bars.enter()
			.append("rect")
			.merge(bars)
				.classed("bar", true)
				.attr("x", (d, i) => {
					const barWidth = getBarWidth();
					return this.services.axes.getXValue(d, i) - (barWidth / 2);
				})
				.attr("width", getBarWidth)
				.transition(this.services.transitions.getTransition("bar-update-enter", animate))
				.attr("y", (d, i) => this.services.axes.getYValue(d[1], i))
				.attr("fill", d => this.model.getFillScale()[d.datasetLabel](d.label))
				.attr("height", (d, i) => {
					return this.services.axes.getYValue(d[0]) - this.services.axes.getYValue(d[1]);
				})
				.attr("opacity", 1);

		// Add event listeners for the above elements
		this.addEventListeners();
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = e => {
		const { hoveredElement } = e.detail;

		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => {
				if (d.datasetLabel !== hoveredElement.datum()["key"]) {
					return 0.3;
				}

				return 1;
			});
	}

	// Un-highlight all elements
	handleLegendMouseOut = e => {
		this.parent.selectAll("rect.bar")
			.transition(this.services.transitions.getTransition("legend-mouseout-bar"))
			.attr("opacity", 1);
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("rect.bar")
			.on("mouseover", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", true);

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement
				});
			})
			.on("mouseout", function() {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false);

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", {
					hoveredElement
				});
			});
	}

	destroy() {
		// Remove event listeners
		this.parent.selectAll("rect.bar")
			.on("mouseover", null)
			.on("mouseout", null);

		// Remove legend listeners
		const eventsFragment = this.services.events.getDocumentFragment();
		eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
		eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}
}
