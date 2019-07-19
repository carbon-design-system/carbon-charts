// Internal Imports
import { Component } from "../component";
import { ModelStateKeys } from "../../interfaces";
import * as Configuration from "../../configuration";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";

export class Grid extends Component {
	render() {
		const svg = this._parent;
		// svg.append("text")
		// 	.attr("x", 0)
		// 	.attr("y", 20)
		// 	.style("font-size", "18px")
		// 	.style("font-weight", 700)
		// 	.text("Grid goes here");

		svg.append("g")
			.attr("class", "x grid");
		svg.append("g")
			.attr("class", "y grid");

		this.drawXGrid();
		this.drawYGrid();
	}

	drawXGrid() {
		const svg = this._parent;

		const { height } = this._services.domUtils.getSVGElementSize(this._parent);
		const xGrid = axisBottom(this._model.get(ModelStateKeys.AXIS_SECONDARY))
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		const g = svg.select(".x.grid")
			.attr("transform", `translate(0, ${height})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const svg = this._parent;

		const { scales } = this._model.getOptions();
		// const { thresholds } = scales.y;
		const { width } = this._services.domUtils.getSVGElementSize(this._parent);

		const yGrid = axisLeft(this._model.get(ModelStateKeys.AXIS_SECONDARY))
			.tickSizeInner(-width)
			.tickSizeOuter(0);

		yGrid.ticks(scales.y.numberOfTicks || Configuration.scales.y.numberOfTicks);

		const g = svg.select(".y.grid")
			.attr("transform", "translate(0, 0)")
			.call(yGrid);

		this.cleanGrid(g);

		// if (thresholds && thresholds.length > 0) {
		// 	this.addOrUpdateThresholds(g, false);
		// }
	}

	cleanGrid(g) {
		g.selectAll("line")
			.attr("stroke", "#333"); // Configuration.grid.strokeColor
		g.selectAll("text").style("display", "none").remove();
		g.select(".domain").style("stroke", "none");
	}
}
