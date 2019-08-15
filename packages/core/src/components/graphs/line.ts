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

		const lineGroups = svg.selectAll("g.lines")
			.data(this._model.getDisplayData().datasets, dataset => dataset.label);

		const enteringLineGroups = lineGroups.enter()
			.append("g")
				.classed("lines", true);

		const self = this;

		const enteringPaths = enteringLineGroups.append("path");
		enteringPaths.attr("opacity", 0);
		enteringPaths.merge(svg.selectAll("g.lines path"))
			.attr("stroke", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self._model.getStrokeColor(parentDatum.label)
			})
			.datum(function(d) {
				const parentDatum = select(this.parentNode).datum() as any;
				this._datasetLabel = parentDatum.label;

				return parentDatum.data;
			})
			.transition(this._services.transitions.getDefaultTransition())
			.attr("opacity", 1)
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		lineGroups.exit()
			.transition(this._services.transitions.getDefaultTransition())
			.attr("opacity", 0)
			.remove();
	}
}
