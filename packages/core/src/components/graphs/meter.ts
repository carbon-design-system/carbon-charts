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
		DOMUtils.appendOrSelect(svg, "rect.container")
			.attr("x", 0 )
			.attr("y", 0 )
			.attr("width", options.width)
			.attr("height", options.meter.barHeight);

		// rect with the value binded
		const value = svg.selectAll("rect.value")
			.data([dataset]);

		value.exit().remove();

		// draw the value bar
		value.enter()
			.append("rect")
			.classed("value", true)
			.merge(value)
			.attr("x", 0 )
			.attr("y", 0 )
			.transition(this.services.transitions.getTransition("meter-bar-update", animate))
			.attr("width", d =>  xScale(d.data.value))
			.attr("height", options.meter.barHeight)
			.attr("fill", d => d.fillColors[0])
			.attr("fill-opacity", 0.5)
			.style("border-color", d => d.fillColors[0]);


		// add the border indicating the value
		const border = svg.selectAll("line.border")
			.data([dataset]);

		border
			.enter()
			.append("line")
			.classed("border", true)
			.merge(border)
			.attr("y1", 0)
			.attr("y2", options.meter.barHeight)
			.transition(this.services.transitions.getTransition("meter-bar-update", animate))
			.attr("x1", d => xScale(d.data.value))
			.attr("x2", d => xScale(d.data.value))
			.attr("stroke-width", 2)
			.attr("stroke",  d => {
				return d.fillColors[0];
			});

		// if a peak is supplied within the domain, we want to render it
		const peak = DOMUtils.appendOrSelect(svg, "line.peak");
		if (dataset.data.peak && dataset.data.peak >= dataset.data.min &&  dataset.data.peak <= dataset.data.max ) {
			const peakVal = dataset.data.peak;

			// if there was previously no peak, transition it from the 0
			if (!peak.attr("x1")) {
				peak.attr("y1", 0)
					.attr("y2", options.meter.barHeight)
					.attr("x1", xScale(0))
					.attr("x2", xScale(0));
			}

			// transitions to its correct location
			peak
				.transition(this.services.transitions.getTransition("peak-line-update", animate))
				.attr("x1", xScale(peakVal))
				.attr("x2", xScale(peakVal));
		} else {
			// remove any stale peak indicators
			peak.remove();
		}
	}
}
