// Internal Imports
import { Scatter } from "./scatter";

// D3 Imports
import { Selection } from "d3-selection";

export class Bubble extends Scatter {
	type = "bubble";

	styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();
		const { filled } = options.points;

		selection.raise()
			.classed("dot", true)
			.classed("filled", filled)
			.classed("unfilled", !filled)
			.attr("cx", (d, i) => this.services.axes.getXValue(d, i))
			.transition(this.services.transitions.getTransition("bubble-update-enter", animate))
			.attr("cy", (d, i) => this.services.axes.getYValue(d, i))
			.attr("r", d => d.radius)
			.attr("fill", d => {
				if (filled) {
					return this.model.getFillScale()[d.datasetLabel](d.label) as any;
				}
			})
			.attr("fill-opacity", filled ? 0.2 : 1)
			.attr("stroke", d => this.model.getStrokeColor(d.datasetLabel, d.label, d.value))
			.attr("opacity", 1);
	}

	// TODO - This method could be re-used in more graphs
	addLabelsToDataPoints(d, index) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();

		const { labels } = this.model.getDisplayData();

		return d.data.map((datum, i) => ({
			date: datum.date,
			label: labels[i],
			datasetLabel: d.label,
			value: isNaN(datum) ? datum.value : datum,
			radius: datum.radius || options.points.radius
		}));
	}
}
