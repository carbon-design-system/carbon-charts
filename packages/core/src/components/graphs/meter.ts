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
		const dataset = this.model.getDisplayData();
		const width = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true }).width;

		// each meter has a scale for the value but no visual axis
		const xScale = scaleLinear()
			.domain([0, 100])
			.range([0, width]);

		// draw the container to hold the value
		DOMUtils.appendOrSelect(svg, "rect.container")
			.attr("x", 0 )
			.attr("y", 0 )
			.attr("width", width)
			.attr("height", options.meter.height);

		// rect with the value binded
		const value = svg.selectAll("rect.value")
			.data([dataset]);

		// draw the value bar
		value.enter()
			.append("rect")
			.classed("value", true)
			.merge(value)
			.attr("x", 0 )
			.attr("y", 0 )
			.attr("height", options.meter.height)
			.transition(this.services.transitions.getTransition("meter-bar-update", animate))
			.attr("width", d => xScale(d.data))
			.attr("fill", d => self.model.getFillColor(d.label))
			.attr("fill-opacity", 0.5)
			.style("border-color", d => self.model.getFillColor(d.label));


		// add the border indicating the value
		const border = svg.selectAll("line.border")
			.data([dataset]);

		border.enter()
			.append("line")
			.classed("border", true)
			.merge(border)
			.attr("y1", 0)
			.attr("y2", options.meter.height)
			.transition(this.services.transitions.getTransition("meter-bar-update", animate))
			.attr("x1", d => xScale(d.data))
			.attr("x2", d => xScale(d.data))
			.attr("stroke-width", 2)
			.attr("stroke", d => self.model.getFillColor(d.label));

		// draw the peak
		const peakValue = Tools.getProperty(options, "meter", "peak");

		// update the peak if it is less than the value, it should be equal to the value
		const updatedPeak = peakValue && peakValue < dataset.data ? dataset.data : peakValue;

		// we only want to use peak value as a data source if it is under 100 (part to whole comparison)
		const data = updatedPeak && updatedPeak <= 100 ? [updatedPeak] : [];

		// if a peak is supplied within the domain, we want to render it
		const peak = svg.selectAll("line.peak")
			.data(data);

		peak.enter()
			.append("line")
			.classed("peak", true)
			.merge(peak)
			.attr("y1", 0)
			.attr("y2", options.meter.height)
			.transition(this.services.transitions.getTransition("peak-line-update", animate))
			.attr("x1", d => xScale(d))
			.attr("x2", d => xScale(d));

		peak.exit().remove();
	}
}
