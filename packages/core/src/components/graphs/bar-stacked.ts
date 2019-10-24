// Internal Imports
import { ScaleTypes, TooltipTypes } from "../../interfaces/enums";
import { Tools } from "../../tools";
import { Bar } from "./bar";

// D3 Imports
import { select } from "d3-selection";
import { stack } from "d3-shape";
import { color } from "d3-color";

// Add datasetLabel to each piece of data
// To be used to get the fill color
const addLabelsAndValueToData = d => {
	Object.keys(d).map(key => {
		if (typeof d[key] === "object") {
			d[key]["datasetLabel"] = d.key;
			d[key]["label"] = d[key].data["label"];
			d[key]["value"] = d[key].data[d.key];
		}
	});

	return d;
};

export class StackedBar extends Bar {
	type = "stacked-bar";

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	getStackData() {
		let stackDataArray;
		const displayData = this.model.getDisplayData();

		const timeSeries = this.services.axes.getMainXAxis().scaleType === ScaleTypes.TIME;

		if (timeSeries) {
			// Get all date values provided in data
			// TODO - Could be re-used through the model
			let allDates = [];
			displayData.datasets.forEach(dataset => {
				allDates = allDates.concat(dataset.data.map(datum => Number(datum.date)));
			});
			allDates = Tools.removeArrayDuplicates(allDates).sort();

			// Go through all date values
			// And get corresponding data from each dataset
			stackDataArray = allDates.map((date, i) => {
				const correspondingData = {};

				displayData.datasets.forEach(dataset => {
					const correspondingDatum = dataset.data.find(datum => Number(datum.date) === Number(date));
					if (correspondingDatum) {
						correspondingData[dataset.label] = correspondingDatum.value;
					} else {
						correspondingData[dataset.label] = 0;
					}
				});
				correspondingData["label"] = date;

				return correspondingData;
			});
		} else {
			// Create the stack datalist
			stackDataArray = displayData.labels.map((label, i) => {
				const correspondingData = {};

				displayData.datasets.forEach(dataset => {
					correspondingData[dataset.label] = !isNaN(dataset.data[i]) ? dataset.data[i] : dataset.data[i].value;
				});
				correspondingData["label"] = label;

				return correspondingData;
			});
		}

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

		// Update styling and position on existing bars
		// As well as bars that were just added
		bars.enter()
			.append("rect")
			.merge(bars)
				.classed("bar", true)
				.attr("x", (d, i) => {
					const barWidth = this.getBarWidth();
					return this.services.axes.getXValue(d, i) - (barWidth / 2);
				})
				.attr("width", this.getBarWidth.bind(this))
				.transition(this.services.transitions.getTransition("bar-update-enter", animate))
				.attr("y", (d, i) => this.services.axes.getYValue(d[1], i))
				.attr("fill", d => this.model.getFillScale()[d.datasetLabel](d.label))
				.attr("height", (d, i) => {
					const { datasetLabel } = d;
					const datasetLabelIndex = stackKeys.indexOf(datasetLabel);
					const height = this.services.axes.getYValue(d[0]) - this.services.axes.getYValue(d[1]);

					if (datasetLabelIndex > 0 && height >= options.bars.dividerSize) {
						return height - options.bars.dividerSize;
					}

					return height;
				})
				.attr("opacity", 1);

		// Add event listeners for the above elements
		this.addEventListeners();
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
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
			})
			.on("mousemove", function() {
				const hoveredElement = select(this);
				const itemData = select(this).datum();
				hoveredElement.classed("hovered", true);

				const stackedData = itemData["data"];
				const sharedLabel = stackedData["label"];

				// Remove the label field
				delete stackedData["label"];

				// filter out the label from the datasets' and associated values
				const activePoints =  Object.keys(stackedData)
					.map(key => ({
						datasetLabel: key,
						value: stackedData[key],
						label: sharedLabel
					}));

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					multidata: activePoints,
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
