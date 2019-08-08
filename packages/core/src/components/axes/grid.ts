// Internal Imports
import { Component } from "../component";
import { AxisPositions } from "../../interfaces";
import * as Configuration from "../../configuration";

// D3 Imports
import { axisBottom, axisLeft } from "d3-axis";

export class Grid extends Component {
	type = "grid";

	backdrop: any;

	render() {
		const svg = this.getContainerSVG();

		this._services.domUtils.appendOrSelect(svg, "g.x.grid");
		this._services.domUtils.appendOrSelect(svg, "g.y.grid");

		// Draw the backdrop
		this.drawBackdrop();
		this.drawXGrid();
		this.drawYGrid();
	}

	drawXGrid() {
		const svg = this._parent;

		const height = this.backdrop.attr("height");

		const bottomScale = this._model.get(AxisPositions.BOTTOM).getScale();
		const xGrid = axisBottom(bottomScale)
			.tickSizeInner(-height)
			.tickSizeOuter(0);

		const g = svg.select(".x.grid")
			.attr("transform", `translate(0, ${+this.backdrop.attr("height") + 50})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const svg = this._parent;

		const { axes } = this._model.getOptions();
		// const { thresholds } = scales.y;
		const width = this.backdrop.attr("width");

		const bottomScale = this._model.get(AxisPositions.BOTTOM).getScale();
		const yGrid = axisLeft(bottomScale)
			.tickSizeInner(-width)
			.tickSizeOuter(0);

		yGrid.ticks(axes.y.numberOfTicks || Configuration.scales.y.numberOfTicks);

		const g = svg.select(".y.grid")
			.attr("transform", `translate(${this.backdrop.attr("x")}, 0)`)
			.call(yGrid);

		this.cleanGrid(g);

		// if (thresholds && thresholds.length > 0) {
		// 	this.addOrUpdateThresholds(g, false);
		// }
	}

	drawBackdrop() {
		const svg = this._parent;

		const leftScale = this._model.get(AxisPositions.LEFT).getScale();
		const bottomScale = this._model.get(AxisPositions.BOTTOM).getScale();

		const [primaryScaleEnd, primaryScaleStart] = leftScale.range();
		const [secondaryScaleStart, secondaryScaleEnd] = bottomScale.range();
		// Get height from the grid
		this.backdrop = this._services.domUtils.appendOrSelect(svg, "rect.chart-grid-backdrop");

		this.backdrop
			.attr("x", secondaryScaleStart)
			.attr("y", primaryScaleStart)
			.attr("width", secondaryScaleEnd - secondaryScaleStart)
			.attr("height", primaryScaleEnd - primaryScaleStart)
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
