// Internal Imports
import { Component } from "../component";
import { AxisPositions } from "../../interfaces";
import * as Configuration from "../../configuration";
import { Tools } from "../../tools";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";

export class Grid extends Component {
	type = "grid";

	backdrop: any;

	render() {
		// Draw the backdrop
		this.drawBackdrop();
		this._services.domUtils.appendOrSelect(this.backdrop, "g.x.grid");
		this._services.domUtils.appendOrSelect(this.backdrop, "g.y.grid");

		this.drawXGrid();
		this.drawYGrid();
	}

	drawXGrid() {
		const svg = this._parent;

		const height = this.backdrop.attr("height");

		const mainXScale = this._services.axes.getMainXAxis().getScale();
		const xGrid = axisBottom(mainXScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		const g = svg.select(".x.grid")
			.attr("transform", `translate(${-this.backdrop.attr("x")}, ${height})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const svg = this._parent;

		const { axes } = this._model.getOptions();
		// const { thresholds } = scales.y;
		const width = this.backdrop.attr("width");

		const mainXScale = this._services.axes.getMainXAxis().getScale();
		const yGrid = axisLeft(mainXScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0);

		yGrid.ticks(Tools.getProperty(axes, "y", "numberOfTicks") || Configuration.scales.y.numberOfTicks);

		const g = svg.select(".y.grid")
			.attr("transform", `translate(0, ${-this.backdrop.attr("y")})`)
			.call(yGrid);

		this.cleanGrid(g);

		// if (thresholds && thresholds.length > 0) {
		// 	this.addOrUpdateThresholds(g, false);
		// }
	}

	drawBackdrop() {
		const svg = this._parent;

		const mainXScale = this._services.axes.getMainXAxis().getScale();
		const mainYScale = this._services.axes.getMainYAxis().getScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height from the grid
		this.backdrop = this._services.domUtils.appendOrSelect(svg, "svg.chart-grid-backdrop");
		const backdropRect = this._services.domUtils.appendOrSelect(this.backdrop, "rect.chart-grid-backdrop");

		this.backdrop.merge(backdropRect)
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart)
			.lower();

		backdropRect.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "#f3f3f3");
	}

	cleanGrid(g) {
		g.selectAll("line")
			.attr("stroke", "#333"); // Configuration.grid.strokeColor

		// Remove extra elements
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}
}
