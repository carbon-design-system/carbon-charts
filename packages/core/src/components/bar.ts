// Internal Imports
import * as Configuration from "../configuration";

import { ChartComponent } from "./base-component";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { timeParse } from "d3-time-format";

export class Bar extends ChartComponent {
	render() {
		const svg = this._parent;

		const { line: margins } = Configuration.charts.margin;

		const gDots = svg.selectAll("g.dots")
			.data(this._model.getData().datasets)
			.enter()
				.append("g")
				.classed("dots", true);

		const xScale = this._model.get("x");
		gDots.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", d => xScale(d.label) + xScale.step() / 2)
				.attr("cy", d => this._model.get("y")(d.value))
				.attr("r", 5)
				.attr("fill", d => this._model.getFillScale()[d.datasetLabel](d.label) as any)
				// .attr("fill-opacity", d => this.getCircleFillOpacity())
				// .attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Hide the overlay
		// this.chartOverlay.hide();

		// // Dispatch the load event
		// this.dispatchEvent("load");
	}

	addLabelsToDataPoints(d, index) {
		const { labels } = this._model.getData();

		return d.data.map((datum, i) => ({
			label: labels[i],
			datasetLabel: d.label,
			value: datum
		}));
	}
}
