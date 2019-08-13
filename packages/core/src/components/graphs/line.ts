// Internal Imports
import { AxisPositions, AxisTypes } from "../../interfaces";
import { Component } from "../component";

// D3 Imports
import { select } from "d3-selection";
import { line } from "d3-shape";

export class Line extends Component {
	type = "line";

	lineGenerator: any;

	render() {
		const svg = this.getContainerSVG();

		// D3 line generator function
		this.lineGenerator = line()
			.x((d, i) => this._services.axes.getXValue(d, i))
			.y((d, i) => this._services.axes.getYValue(d, i))
			.curve(this._services.curves.getD3Curve());

		const gLines = svg.selectAll("g.lines")
			.data(this._model.getDisplayData().datasets)
			.enter()
				.append("g")
				.classed("lines", true);

		gLines.append("path")
			.attr("stroke", d => this._model.getStrokeColor(d.label))
			.datum(d => d.data)
			.attr("class", "line")
			.attr("d", this.lineGenerator);
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
