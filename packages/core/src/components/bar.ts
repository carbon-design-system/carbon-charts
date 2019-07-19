// Internal Imports
import * as Configuration from "../configuration";
import { ModelStateKeys } from "../interfaces";
import { ChartComponent } from "./base-component";

export class Bar extends ChartComponent {
	render() {
		const svg = this._parent;

		const { line: margins } = Configuration.charts.margin;

		const gDots = svg.selectAll("g.dots")
			.data(this._model.getData().datasets)
			.enter()
				.append("g")
				.classed("dots", true);

		const xScale = this._model.get(ModelStateKeys.AXIS_SECONDARY);
		gDots.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", d => xScale(d.label) + xScale.step() / 2)
				.attr("cy", d => this._model.get(ModelStateKeys.AXIS_PRIMARY)(d.value))
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
