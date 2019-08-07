// Internal Imports
import { AxisPositions } from "../../interfaces";
import { Component } from "../component";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";

export class Scatter extends Component {
	type = "cc-scatter";

	render() {
		const svg = this.getContainerSVG();

		const dotGroups = svg.selectAll("g.dots")
			.data(this._model.getDisplayData().datasets);

		const dotGroupsEnter = dotGroups.enter()
			.append("g")
				.classed("dots", true);

		const xScale = this._model.get(AxisPositions.BOTTOM);
		const dots = dotGroupsEnter.merge(dotGroups)
			.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i));

		const dotsEnter = dots.enter()
			.append("circle")
			.attr("opacity", 0);
console.log("LA", this._model.get(AxisPositions.LEFT).getValueFromScale({ value: 0 }))
		dotsEnter.merge(dots)
			.classed("dot", true)
			.attr("cx", d => {
				if (Tools.getProperty(this._model.getOptions(), "scales", "bottom", "type") === "time") {
					return xScale.getValueFromScale(d);
				}

				return xScale.getValueFromScale(d);
			})
			.transition(this._services.transitions.getDefaultTransition())
			.attr("cy", d => this._model.get(AxisPositions.LEFT).getValueFromScale(d))
			.attr("r", 4)
			.attr("fill", d => this._model.getFillScale()[d.datasetLabel](d.label) as any)
			.attr("fill-opacity", d => 0.2)
			.attr("stroke", d => this._model.getStrokeColor(d.datasetLabel, d.label, d.value))
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

		this.addEventListeners();
	}

	addLabelsToDataPoints(d, index) {
		const { labels } = this._model.getDisplayData();

		return d.data.map((datum, i) => ({
			label: datum.key || labels[i],
			datasetLabel: d.label,
			value: isNaN(datum) ? datum.value : datum
		}));
	}

	addEventListeners() {
		const self = this;
		this._parent.selectAll("circle")
			.on("mouseover", function() {
				select(this).classed("hovered", true);

				self._model.set({
					tooltip: true
				});
			})
			.on("mouseout", function() {
				select(this).classed("hovered", false);

				self._model.set({
					tooltip: false
				});
			});
	}
}
