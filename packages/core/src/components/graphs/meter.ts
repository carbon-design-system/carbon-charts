// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";


export class Meter extends Component {
	type = "meter";

	render(animate = true) {
		const self = this;
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();
		const displayData = this.model.getDisplayData();

		// meter only deals with 1 dataset (like pie/donut)
		const dataset = displayData.datasets[0];

		// each meter has a scale for the value but no visual axis
		const xScale = scaleLinear()
			.domain([dataset.data.min, dataset.data.max])
			.range([0, options.width]);

		// draw the container to hold the value
		const container = DOMUtils.appendOrSelect(svg, "rect.container")
			.attr("x", xScale.range()[0] )
			.attr("y", 0 )
			.attr("width", options.width)
			.attr("height", options.meter.barHeight);

		// draw the rect with the value binded
		svg.selectAll("rect.value")
			.data([dataset])
			.enter()
			.append("rect")
			.classed("value", true)
			.attr("x", xScale.range()[0] )
			.attr("y", 0 )
			.attr("width", function(d) {
				return xScale(d.data.value);
			})
			.attr("height", options.meter.barHeight)
			.attr("fill", d => {
				return d.fillColors[0];
		});
	}
}
