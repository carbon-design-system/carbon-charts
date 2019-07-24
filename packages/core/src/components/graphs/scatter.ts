// Internal Imports
import { ModelStateKeys } from "../../interfaces";
import { Component } from "../component";

export class Scatter extends Component {
	type = "cc-scatter";

	render() {
		const svg = this.getContainerSVG();

		const dotGroups = svg.selectAll("g.dots")
			.data(this._model.getData().datasets);

		const dotGroupsEnter = dotGroups.enter()
			.append("g")
				.classed("dots", true);		

		const xScale = this._model.get(ModelStateKeys.AXIS_SECONDARY);
		const dots = dotGroupsEnter.merge(dotGroups)
			.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

		const dotsEnter = dots.enter()
			.append("circle")
			.attr("opacity", 0);

		dotsEnter.merge(dots)
			.attr("class", "dot")
			.attr("cx", d => xScale(d.label) + xScale.step() / 2)
			.attr("cy", d => this._model.get(ModelStateKeys.AXIS_PRIMARY)(d.value))
			.attr("r", 5)
			.attr("fill", d => this._model.getFillScale()[d.datasetLabel](d.label) as any)
			.attr("fill-opacity", d => 0.2)
			.attr("stroke", d => this._model.getStrokeColor(d.datasetLabel, d.label, d.value))
			.transition()
			.duration(750)
			.attr("opacity", 1);

		dotGroups.exit()
			.transition()
			.duration(750)
			.attr("opacity", 0)
			.remove();
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
