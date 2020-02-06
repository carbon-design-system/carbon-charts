// Internal Imports
import { Scatter } from "./scatter";
import { DOMUtils } from "../../services";

// D3 Imports
import { Selection } from "d3-selection";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

export class Bubble extends Scatter {
	type = "bubble";

	getRadiusScale(selection: Selection<any, any, any, any>) {
		const data = selection.data();
		// Filter out any null/undefined values
		const allRadii = data.map(d => d.radius).filter(d => d);

		const options = this.model.getOptions();
		const chartSize = DOMUtils.getSVGElementSize(this.services.domUtils.getMainSVG(), { useAttr: true });

		return scaleLinear().domain(extent(allRadii))
			.range(options.bubble.radiusRange(chartSize, data));
	}

	styleCircles(selection: Selection<any, any, any, any>, animate: boolean) {
		// Chart options mixed with the internal configurations
		const options = this.model.getOptions();
		const { filled } = options.points;

		const radiusScale = this.getRadiusScale(selection);

		selection.raise()
			.classed("dot", true)
			.classed("filled", filled)
			.classed("unfilled", !filled)
			.attr("cx", (d, i) => this.services.cartesianScales.getDomainValue(d, i))
			.transition(this.services.transitions.getTransition("bubble-update-enter", animate))
			.attr("cy", (d, i) => this.services.cartesianScales.getRangeValue(d, i))
			.attr("r", d => radiusScale(d.radius))
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
