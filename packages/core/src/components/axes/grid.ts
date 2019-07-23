// Internal Imports
import { Component } from "../component";
import { ModelStateKeys } from "../../interfaces";
import * as Configuration from "../../configuration";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";

export class Grid extends Component {
	render() {
		const svg = this._parent;

		this._services.domUtils.appendOrSelect(svg, "g.x.grid");
		this._services.domUtils.appendOrSelect(svg, "g.y.grid");

		this.drawXGrid();
		this.drawYGrid();

		// Draw the backdrop
		this.drawBackdrop();
	}

	drawXGrid() {
		const svg = this._parent;

		const { height } = this._services.domUtils.getSVGElementSize(this._parent, true);
		const xGrid = axisBottom(this._model.get(ModelStateKeys.AXIS_SECONDARY))
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		const g = svg.select(".x.grid")
			.attr("transform", `translate(0, ${height})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		// const svg = this._parent;

		// const { scales } = this._model.getOptions();
		// // const { thresholds } = scales.y;
		// const { width } = this._services.domUtils.getSVGElementSize(this._parent, true);

		// const yGrid = axisLeft(this._model.get(ModelStateKeys.AXIS_SECONDARY))
		// 	.tickSizeInner(-width)
		// 	.tickSizeOuter(0);

		// yGrid.ticks(scales.y.numberOfTicks || Configuration.scales.y.numberOfTicks);

		// const g = svg.select(".y.grid")
		// 	.attr("transform", "translate(0, 0)")
		// 	.call(yGrid);

		// this.cleanGrid(g);

		// if (thresholds && thresholds.length > 0) {
		// 	this.addOrUpdateThresholds(g, false);
		// }
	}

	drawBackdrop() {
		const svg = this._parent;

		// Get height from the grid
		const backdrop = this._services.domUtils.appendOrSelect(svg, "rect.chart-grid-backdrop");

		backdrop
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#f3f3f3")
			.lower();
	}

	cleanGrid(g) {
		g.selectAll("line")
			.attr("stroke", "#333"); // Configuration.grid.strokeColor

		// Remove extra elements
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}
}
